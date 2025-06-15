namespace PasswordManagerFull.Models
{
    public class JwtSettings
    {
        public string SecretKey { get; set; } = string.Empty;
        public int ExpiryInMinutes { get; set; }
    }
} 