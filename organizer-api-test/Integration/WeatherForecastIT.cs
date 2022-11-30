using organizer_api.Models;
using System.Net.Http.Json;

namespace organizer_api_test.Integration
{
    [UsesVerify]
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
        public async void GetWeatherForecast()
        {
            //Act
            var response = await _client.GetAsync("/api/weather/forecast");
            response.EnsureSuccessStatusCode();
            var responseBody = await response.Content.ReadFromJsonAsync<IEnumerable<WeatherForecast>>();
            //Assert
            Assert.NotNull(responseBody);
            Assert.Equal(5, responseBody.Count());
        }

        [Fact]
        public async void GetCurrentWeather()
        {
            //Act
            var response = await _client.GetAsync("/api/weather/current");
            response.EnsureSuccessStatusCode();
            var responseBody = await response.Content.ReadFromJsonAsync<WeatherForecast>();
            //Assert
            await Verify(responseBody);
        }
    }
}
