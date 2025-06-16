using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PasswordManagerFull.Models;

namespace PasswordManagerFull.Services;

public class MongoDbService
{
    private readonly IMongoCollection<User> _users;
    private readonly IMongoCollection<PasswordEntry> _passwords;

    public MongoDbService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);
        _users = database.GetCollection<User>(settings.Value.UsersCollectionName);
        _passwords = database.GetCollection<PasswordEntry>(settings.Value.PasswordsCollectionName);
    }

    public async Task<User?> GetUserByUsernameAsync(string username)
    {
        return await _users.Find(u => u.Username == username).FirstOrDefaultAsync();
    }

    public async Task CreateUserAsync(User user)
    {
        await _users.InsertOneAsync(user);
    }

    public async Task<List<PasswordEntry>> GetPasswordsByUserIdAsync(string userId)
    {
        return await _passwords.Find(p => p.UserId == userId).ToListAsync();
    }

    public async Task AddPasswordAsync(PasswordEntry password)
    {
        await _passwords.InsertOneAsync(password);
    }
}
