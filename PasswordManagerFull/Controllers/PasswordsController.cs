using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PasswordManagerFull.Models;
using PasswordManagerFull.Services;
using System.Security.Claims;

namespace PasswordManagerFull.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PasswordsController : ControllerBase
{
    private readonly MongoDbService _dbService;

    public PasswordsController(MongoDbService dbService)
    {
        _dbService = dbService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null)
            return Unauthorized();

        var passwords = await _dbService.GetPasswordsByUserIdAsync(userId);
        return Ok(passwords);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] PasswordEntry input)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null)
            return Unauthorized();

        var password = new PasswordEntry
        {
            Title = input.Title,
            Password = input.Password,
            UserId = userId
        };

        await _dbService.AddPasswordAsync(password);
        return StatusCode(201, new { message = "Password saved" });
    }
}
