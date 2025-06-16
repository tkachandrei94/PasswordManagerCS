using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PasswordManagerFull.Models;
using PasswordManagerFull.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

namespace PasswordManagerFull.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly MongoDbService _dbService;
    private readonly JwtSettings _jwtSettings;

    public AuthController(MongoDbService dbService, IOptions<JwtSettings> jwtSettings)
    {
        _dbService = dbService;
        _jwtSettings = jwtSettings.Value;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User userInput)
    {
        var existingUser = await _dbService.GetUserByUsernameAsync(userInput.Username);
        if (existingUser != null)
            return BadRequest(new { message = "User already exists" });

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userInput.PasswordHash);
        var user = new User
        {
            Username = userInput.Username,
            PasswordHash = hashedPassword
        };

        await _dbService.CreateUserAsync(user);
        return Ok(new { message = "User created successfully" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User userInput)
    {
        var user = await _dbService.GetUserByUsernameAsync(userInput.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(userInput.PasswordHash, user.PasswordHash))
            return Unauthorized(new { message = "Invalid username or password" });

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.Username)
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            Issuer = _jwtSettings.Issuer,
            Audience = _jwtSettings.Audience,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return Ok(new { token = tokenString });
    }


    [HttpGet("verify")]
    [Authorize]
    public IActionResult Verify()
    {
        return Ok(new { message = "Token is valid" });
    }
}
