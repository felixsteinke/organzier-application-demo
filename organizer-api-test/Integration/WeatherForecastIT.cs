using organizer_api.Models;
using System.Collections;
using System.Net.Http.Json;

namespace organizer_api_test.Integration
{
    public class WeatherForecastIT
    {
        private readonly OrganizerWebApplication _server;
        private readonly HttpClient _client;

        public WeatherForecastIT()
        {
            // Arrange
            _server = new OrganizerWebApplication();
            _client = _server.CreateClient();
        }

        [Fact]
        public async void GetWeather()
        {
            //Act
            var response = await _client.GetAsync("/api/weather");
            response.EnsureSuccessStatusCode();
            var responseBody = await response.Content.ReadFromJsonAsync<IEnumerable<WeatherForecast>>();
            //Assert
            Assert.NotNull(responseBody);
            Assert.Equal(5, responseBody.Count());
        }
    }
}
