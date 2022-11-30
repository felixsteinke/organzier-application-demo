using Microsoft.AspNetCore.Mvc;
using organizer_api.Database;

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

        [HttpPost(Name = "PostMessage")]
        public ActionResult<String> Post(String todoItem)
        {
            _dbService.execute();
            return Ok(todoItem);
        }
    }
}
