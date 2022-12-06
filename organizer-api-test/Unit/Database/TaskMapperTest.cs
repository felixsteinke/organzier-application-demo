using organizer_api.Controllers.Models;
using organizer_api.Database.Entities;
using organizer_api.Databases.Mapper;
using organizer_api.Enums;

namespace organizer_api_test.Unit.Database
{
    [UsesVerify]
    public class TaskMapperTest
    {
        private readonly TaskMapper _taskMapper;

        public TaskMapperTest() {
            // Arrange
            _taskMapper = new();
        }

        [Fact]
        public Task DomainToEntity()
        {
            // Arrange
            var taskModel = new TaskModel
            {
                Id = 1,
                Titel = "Testing Domain Task",
                EntryDate = new DateTime(638059479207954693),
                Estimate = 5,
                Priority = Priority.MEDIUM,
                DueDate = new DateTime(638859475207954693),
                Done = true,
                Description = "Testing Domain Task Description"
            };
            //Act
            var taskEntity = _taskMapper.ToEntity(taskModel);
            //Assert
            return Verify(taskEntity);
        }

        [Fact]
        public Task EntityToDomain()
        {
            // Arrange
            var taskEntity = new TaskEntity
            {
                Id = 1,
                Titel = "Testing Entity Task",
                EntryDate = DateTime.Now.Ticks,
                Estimate = 5,
                Priority = (int)Priority.MEDIUM,
                DueDate = DateTime.Now.Ticks,
                Done = true,
                Description = "Testing Entity Task Description"
            };
            //Act
            var taskModel = _taskMapper.ToDomain(taskEntity);
            //Assert
            return Verify(taskModel);
        }

        [Fact]
        public void DomainToEntityToDomain()
        {
            // Arrange
            var taskModel1 = new TaskModel
            {
                Id = 1,
                Titel = "Testing Domain Task",
                EntryDate = new DateTime(DateTime.Now.Ticks),
                Estimate = 5,
                Priority = Priority.MEDIUM,
                DueDate = new DateTime(DateTime.Now.Ticks),
                Done = true,
                Description = "Testing Domain Task Description"
            };
            //Act
            var taskEntity = _taskMapper.ToEntity(taskModel1);
            var taskModel2 = _taskMapper.ToDomain(taskEntity);
            //Assert
            Assert.Equal(taskModel1.Id, taskModel2.Id);
            Assert.Equal(taskModel1.Titel, taskModel2.Titel);
            Assert.Equal(taskModel1.EntryDate, taskModel2.EntryDate);
            Assert.Equal(taskModel1.Estimate, taskModel2.Estimate);
            Assert.Equal(taskModel1.Priority, taskModel2.Priority);
            Assert.Equal(taskModel1.DueDate, taskModel2.DueDate);
            Assert.Equal(taskModel1.Done, taskModel2.Done);
            Assert.Equal(taskModel1.Description, taskModel2.Description);
        }
    }
}
