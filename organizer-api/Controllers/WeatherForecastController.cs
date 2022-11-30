using Microsoft.AspNetCore.Mvc;
using organizer_api.Models;

namespace organizer_api.Controllers
{
    [ApiController]
    [Route("/api/weather")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet("forecast")]
        public IEnumerable<WeatherForecast> GetForecast()
        {
            _logger.LogInformation("Requesting Weather Forcast.");
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("current")]
        public ActionResult<WeatherForecast> GetCurrent()
        {
            _logger.LogInformation("Requesting current Weather.");
            return Ok(new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now),
                TemperatureC = 20,
                Summary = Summaries[5]
            });
        }
    }
}