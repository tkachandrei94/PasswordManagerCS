using Xunit;
using Moq;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using PasswordManagerFull.Models;
using PasswordManagerFull.Services;
using System.Threading.Tasks;

namespace PasswordManagerFull.Tests;

public class MongoDbServiceTests
{
    private readonly Mock<IMongoCollection<User>> _mockUsersCollection;
    private readonly Mock<IMongoCollection<PasswordEntry>> _mockPasswordsCollection;
    private readonly Mock<IMongoDatabase> _mockDatabase;
    private readonly Mock<IMongoClient> _mockClient;
    private readonly MongoDbService _service;

    public MongoDbServiceTests()
    {
        _mockUsersCollection = new Mock<IMongoCollection<User>>();
        _mockPasswordsCollection = new Mock<IMongoCollection<PasswordEntry>>();
        _mockDatabase = new Mock<IMongoDatabase>();
        _mockClient = new Mock<IMongoClient>();

        var settings = new MongoDbSettings
        {
            ConnectionString = "mongodb://localhost:27017",
            DatabaseName = "testdb",
            UsersCollectionName = "users",
            PasswordsCollectionName = "passwords"
        };

        var options = Options.Create(settings);

        _mockDatabase.Setup(db => db.GetCollection<User>(settings.UsersCollectionName, null))
            .Returns(_mockUsersCollection.Object);
        _mockDatabase.Setup(db => db.GetCollection<PasswordEntry>(settings.PasswordsCollectionName, null))
            .Returns(_mockPasswordsCollection.Object);
        _mockClient.Setup(c => c.GetDatabase(settings.DatabaseName, null))
            .Returns(_mockDatabase.Object);

        _service = new MongoDbService(options);
    }

    [Fact]
    public async Task GetUserByUsernameAsync_ShouldReturnUser_WhenUserExists()
    {
        // Arrange
        var username = "testuser";
        var expectedUser = new User { Username = username };
        var mockAsyncCursor = new Mock<IAsyncCursor<User>>();
        
        mockAsyncCursor.Setup(x => x.Current).Returns(new[] { expectedUser });
        mockAsyncCursor.SetupSequence(x => x.MoveNext(It.IsAny<CancellationToken>()))
            .Returns(true)
            .Returns(false);
        mockAsyncCursor.SetupSequence(x => x.MoveNextAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(true)
            .ReturnsAsync(false);

        _mockUsersCollection.Setup(x => x.FindAsync(
            It.IsAny<FilterDefinition<User>>(),
            It.IsAny<FindOptions<User, User>>(),
            It.IsAny<CancellationToken>()))
            .ReturnsAsync(mockAsyncCursor.Object);

        // Act
        var result = await _service.GetUserByUsernameAsync(username);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(username, result.Username);
    }

    [Fact]
    public async Task CreateUserAsync_ShouldInsertUser()
    {
        // Arrange
        var user = new User { Username = "newuser" };

        // Act
        await _service.CreateUserAsync(user);

        // Assert
        _mockUsersCollection.Verify(x => x.InsertOneAsync(
            It.IsAny<User>(),
            It.IsAny<InsertOneOptions>(),
            It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Fact]
    public async Task GetPasswordsByUserIdAsync_ShouldReturnPasswords()
    {
        // Arrange
        var userId = "user123";
        var expectedPasswords = new List<PasswordEntry>
        {
            new PasswordEntry { UserId = userId, Title = "Test1" },
            new PasswordEntry { UserId = userId, Title = "Test2" }
        };

        var mockAsyncCursor = new Mock<IAsyncCursor<PasswordEntry>>();
        mockAsyncCursor.Setup(x => x.Current).Returns(expectedPasswords);
        mockAsyncCursor.SetupSequence(x => x.MoveNext(It.IsAny<CancellationToken>()))
            .Returns(true)
            .Returns(false);
        mockAsyncCursor.SetupSequence(x => x.MoveNextAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(true)
            .ReturnsAsync(false);

        _mockPasswordsCollection.Setup(x => x.FindAsync(
            It.IsAny<FilterDefinition<PasswordEntry>>(),
            It.IsAny<FindOptions<PasswordEntry, PasswordEntry>>(),
            It.IsAny<CancellationToken>()))
            .ReturnsAsync(mockAsyncCursor.Object);

        // Act
        var result = await _service.GetPasswordsByUserIdAsync(userId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);
        Assert.All(result, p => Assert.Equal(userId, p.UserId));
    }

    [Fact]
    public async Task AddPasswordAsync_ShouldInsertPassword()
    {
        // Arrange
        var password = new PasswordEntry { UserId = "user123", Title = "Test Password" };

        // Act
        await _service.AddPasswordAsync(password);

        // Assert
        _mockPasswordsCollection.Verify(x => x.InsertOneAsync(
            It.IsAny<PasswordEntry>(),
            It.IsAny<InsertOneOptions>(),
            It.IsAny<CancellationToken>()),
            Times.Once);
    }
} 