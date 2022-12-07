﻿using organizer_api.Controllers.Models;
using organizer_api.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moq;
using organizer_api.Database.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using organizer_api.Database;
using System.Net.Sockets;
using organizer_api.Services;
using Newtonsoft.Json;

namespace organizer_api_test.Unit.Services
{
    [UsesVerify]
    public class DatabaseServiceTest
    {
        private readonly Mock<DbSet<TaskEntity>> mockTaskDbSet;
        private readonly Mock<TaskRepository> mockTaskRepository;
        private readonly DatabaseService service;

        private readonly TaskEntity dataSample1;
        private readonly TaskEntity dataSample2;

        public DatabaseServiceTest() {
            // Arrange Data
            dataSample1 = new TaskEntity
            {
                Id = 1,
                Titel = "Testing Entity Task 1",
                EntryDate = 638059479207954693,
                Estimate = 5,
                Priority = (int)Priority.MEDIUM,
                DueDate = 638859475207954693,
                Done = false,
                Description = "Testing Entity Task 1 Description"
            };
            dataSample2 = new TaskEntity
            {
                Id = 2,
                Titel = "Testing Entity Task 2",
                EntryDate = DateTime.Now.Ticks,
                Estimate = 10,
                Priority = (int)Priority.HIGH,
                DueDate =638859475207957693,
                Done = true,
                Description = "Testing Entity Task 2 Description"
            };
            var data = new List<TaskEntity> { dataSample1, dataSample2}.AsQueryable();
            // Arrange DbSet
            mockTaskDbSet = new Mock<DbSet<TaskEntity>>();
            mockTaskDbSet.As<IQueryable<TaskEntity>>()
                .Setup(m => m.Provider).Returns(data.Provider);
            mockTaskDbSet.As<IQueryable<TaskEntity>>()
                .Setup(m => m.Expression).Returns(data.Expression);
            mockTaskDbSet.As<IQueryable<TaskEntity>>()
                .Setup(m => m.ElementType).Returns(data.ElementType);
            mockTaskDbSet.As<IQueryable<TaskEntity>>()
                .Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator);
            // Arrange DbContext
            mockTaskRepository = new Mock<TaskRepository>();
            mockTaskRepository.Setup(m => m.Tasks).Returns(mockTaskDbSet.Object);
            // Arrange Service
            service = new DatabaseService(mockTaskRepository.Object);
        }

        [Fact]
        public void SelectTask()
        {
            var entity = service.SelectTask(1);
            Assert.Equal(JsonConvert.SerializeObject(dataSample1), JsonConvert.SerializeObject(entity));
        }

        [Fact]
        public void SelectTaskInvalid()
        {
            var entity = service.SelectTask(999);
            Assert.Null(entity);
        }

        [Fact]
        public void InsertTask()
        {

            var title = "Testing Entity Task 3";
            var estimate = 7.5;
            var priority = Priority.LOW;
            var dueDate = DateTime.Now;
            var description = "Testing Entity Task 3 Description";

            var entity = service.InsertTask(title, estimate, priority, dueDate, description);

            Assert.Equal(title, entity.Titel);
            Assert.Equal(estimate, entity.Estimate);
            Assert.Equal((int)priority, entity.Priority);
            Assert.Equal(dueDate.Ticks, entity.DueDate);
            Assert.Equal(description, entity.Description);
            Assert.False(entity.Done);
        }

        [Fact]
        public void UpdateTask()
        {

            var entity = service.UpdateTask(dataSample1.Id, true);
            Assert.True(entity.Done);
            dataSample1.Done = true;
        }

        [Fact]
        public void SelectAllTasks()
        {
            var entityList = service.SelectAllTasks();
            Assert.NotNull(entityList.Where(e => e.Id == 1).FirstOrDefault());
        }

        [Fact]
        public void DeleteTask()
        {
            var entity = service.DeleteTask(2);
            Assert.Equal(JsonConvert.SerializeObject(dataSample2), JsonConvert.SerializeObject(entity));
        }
    }
}
