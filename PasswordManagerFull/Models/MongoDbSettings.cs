namespace PasswordManagerFull.Models
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string UsersCollectionName { get; set; } = "Users";
        public string PasswordsCollectionName { get; set; } = "Passwords";
    }
}