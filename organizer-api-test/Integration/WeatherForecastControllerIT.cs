using organizer_api.Controllers.Models;
using System.Net.Http.Json;

namespace organizer_api_test.Integration
{
    [UsesVerify]
    public class WeatherForecastControllerIT : IAsyncLifetime
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
        public async void GetWeatherForecast()
        {
            // Act
            var response = await _client.GetAsync("/api/weather/forecast");
            response.EnsureSuccessStatusCode();
            var responseBody = await response.Content.ReadFromJsonAsync<IEnumerable<WeatherForecast>>();
            // Assert
            Assert.NotNull(responseBody);
            Assert.Equal(5, responseBody.Count());
        }

        [Fact]
        public async void GetCurrentWeather()
        {
            // Act
            var response = await _client.GetAsync("/api/weather/current");
            response.EnsureSuccessStatusCode();
            var responseBody = await response.Content.ReadFromJsonAsync<WeatherForecast>();
            // Assert
            await Verify(responseBody);
        }

        public Task DisposeAsync()
        {
            return _database.DisposeAsync();
        }
    }
}
