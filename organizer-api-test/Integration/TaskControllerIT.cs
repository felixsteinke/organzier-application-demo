using DotNet.Testcontainers.Containers;
using Microsoft.Extensions.Configuration;
using Npgsql;
using organizer_api.Controllers.Models;
using organizer_api.Enums;
using System.Net.Http.Json;
using VerifyTests;

namespace organizer_api_test.Integration
{
    [UsesVerify]
    public class TaskControllerIT : IAsyncLifetime
    {
        private PostgresDB _database;
        private OrganizerWebApplication _server;
        private HttpClient _client;

        public async Task InitializeAsync()
        {
            // Arrange
            this._database = new PostgresDB();
            await _database.InitializeAsync();
            this._server = new OrganizerWebApplication(_database.CONTAINER.ConnectionString);
            this._client = _server.CreateClient();
        }

        [Fact]
        public async void PostTask()
        {
            // Act
            var response = await _client.PostAsJsonAsync("/api/task", new TaskModel
            {
                Id = 1,
                Titel = "Testing Domain Task",
                EntryDate = new DateTime(638059479207954693),
                Estimate = 5,
                Priority = Priority.MEDIUM,
                DueDate = new DateTime(638859475207954693),
                Done = true,
                Description = "Testing Domain Task Description"
            });
            response.EnsureSuccessStatusCode();
            var responseBody = await response.Content.ReadFromJsonAsync<TaskModel>();
            // Assert
            var verifySettings = new VerifySettings();
            verifySettings.ScrubLinesContaining("Id:", "id:");
            await Verify(settings: verifySettings, target: responseBody);
        }

        public Task DisposeAsync()
        {
            return _database.DisposeAsync();
        }
    }
}
