using Microsoft.AspNetCore.Mvc;
using organizer_api.Controllers.Models;
using organizer_api.Database;
using organizer_api.Database.Entities;

namespace organizer_api.Controllers
{
    [ApiController]
    [Route("/api/task")]
    public class TaskController : ControllerBase
    {

        private readonly ILogger<TaskController> _logger;
        private readonly IDatabaseService _dbService;

        public TaskController(ILogger<TaskController> logger, IDatabaseService dbService)
        {
            _logger = logger;
            _dbService = dbService;
        }

        [HttpPost("")]
        public ActionResult<TaskEntity> PostTask()
        {
            _logger.LogInformation("Requesting insert Task.");
            return Ok(_dbService.InsertTask(
                "SomeTitle",
                5,
                Enums.Priority.MEDIUM,
                DateTime.Now,
                "SomeDescription"));
        }

        [HttpGet("")]
        public ActionResult<TaskEntity> GetTask()
        {
            _logger.LogInformation("Requesting get Task.");
            return Ok(_dbService.SelectTask(1));
        }

        [HttpDelete("")]
        public ActionResult<TaskEntity> DeleteTask()
        {
            _logger.LogInformation("Requesting delete Task.");
            return Ok(_dbService.DeleteTask(1));
        }

        [HttpGet("all")]
        public IEnumerable<TaskEntity> GetAllTask()
        {
            _logger.LogInformation("Requesting get all Tasks.");
            return _dbService.SelectAllTasks();
        }
    }
}
