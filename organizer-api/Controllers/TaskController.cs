using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using organizer_api.Controllers.Models;
using organizer_api.Database.Entities;
using organizer_api.Databases.Mapper;
using organizer_api.Enums;
using organizer_api.Services;
using System;

namespace organizer_api.Controllers
{
    [ApiController]
    [Route("/api/task")]
    public class TaskController : ControllerBase
    {

        private readonly ILogger<TaskController> _logger;
        private readonly IDatabaseService _dbService;
        private readonly TaskMapper _taskMapper;

        public TaskController(ILogger<TaskController> logger, IDatabaseService dbService)
        {
            _logger = logger;
            _dbService = dbService;
            _taskMapper = new TaskMapper();
        }

        [HttpPost("")]
        public ActionResult<TaskModel> PostTask(TaskModel model)
        {
            _logger.LogInformation("Requesting insert Task.");
            return Ok(_taskMapper.ToDomain(_dbService.InsertTask(
                model.Titel,
                model.Estimate,
                model.Priority,
                model.DueDate,
                model.Description)));
        }

        [HttpPost("generate")]
        public ActionResult<MessageModel> PostGeneratedTasks()
        {
            _logger.LogInformation("Requesting generation of Tasks.");
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (int i = 0; i < 1000; i++)
            {
                _dbService.InsertTask(
                new string(Enumerable.Repeat(chars, 8).Select(s => s[Random.Shared.Next(s.Length)]).ToArray()),
                Random.Shared.Next(1, 20) * 0.5,
                (Priority)Random.Shared.Next(0, 3),
                DateTime.Now.AddDays(Random.Shared.Next(0, 100)),
                new string(Enumerable.Repeat(chars, 16).Select(s => s[Random.Shared.Next(s.Length)]).ToArray()));
            }
            
            return Ok(new MessageModel("Saved 1000 random Task entitites."));
        }

        [HttpPut("")]
        public ActionResult<TaskModel> PutTask(TaskModel model)
        {
            _logger.LogInformation("Requesting update Task.");
            return Ok(_taskMapper.ToDomain(_dbService.UpdateTask(
                model.Id,
                model.Done)));
        }

        [HttpGet("{id}")]
        public ActionResult<TaskModel> GetTask(long id)
        {
            _logger.LogInformation($"Requesting get Task {id}.");
            return Ok(_taskMapper.ToDomain(_dbService.SelectTask(id)));
        }

        [HttpDelete("{id}")]
        public ActionResult<TaskEntity> DeleteTask(long id)
        {
            _logger.LogInformation($"Requesting delete Task for task {id}.");
            return Ok(_taskMapper.ToDomain(_dbService.DeleteTask(id)));
        }

        [HttpGet("all")]
        public IEnumerable<TaskModel> GetAllTask()
        {
            _logger.LogInformation("Requesting get all Tasks.");
            return _taskMapper.ToDomain(_dbService.SelectAllTasks());
        }
    }
}
