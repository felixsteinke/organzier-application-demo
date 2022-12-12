using organizer_api.Controllers.Models;
using organizer_api.Database.Entities;
using organizer_api.Enums;

namespace organizer_api.Databases.Mapper
{
    public class TaskMapper : DomainMapper<TaskModel, TaskEntity>
    {
        public override TaskModel ToDomain(TaskEntity entity)
        {
            return new TaskModel
            {
                Id = entity.Id,
                Title = entity.Titel,
                EntryDate = new DateTime(entity.EntryDate),
                Estimate = entity.Estimate,
                Priority = (Priority)entity.Priority,
                DueDate = new DateTime(entity.DueDate),
                Done = entity.Done,
                Description = entity.Description
            };
        }

        public override TaskEntity ToEntity(TaskModel domain)
        {
            return new TaskEntity
            {
                Id = domain.Id,
                Titel = domain.Title,
                EntryDate = domain.EntryDate.Ticks,
                Estimate = domain.Estimate,
                Priority = (int)domain.Priority,
                DueDate = domain.DueDate.Ticks,
                Done = domain.Done,
                Description = domain.Description
            };
        }
    }
}
