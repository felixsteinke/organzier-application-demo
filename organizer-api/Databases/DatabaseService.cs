using organizer_api.Database.Entities;
using organizer_api.Enums;
using System.Linq;
using System.Reflection.Metadata;

namespace organizer_api.Database
{
    public interface IDatabaseService
    {
        TaskEntity InsertTask(string title, double estimate, Priority priority, DateTime dueDate, string description);
        IEnumerable<TaskEntity> SelectAllTasks();
        TaskEntity SelectTask(int id);
        TaskEntity DeleteTask(int id);
    }

    public class DatabaseService : IDatabaseService
    {
        private readonly DatabaseRepository _db;

        public DatabaseService(DatabaseRepository db) {
            this._db = db;
        }

        public TaskEntity InsertTask(
            string title, 
            double estimate, 
            Priority priority, 
            DateTime dueDate, 
            string description)
        {
            var entity = new TaskEntity
            {
                Id = 1,
                Titel = title,
                EntryDate = DateTime.Now.Ticks,
                Estimate = estimate,
                Priority = (int)priority,
                DueDate = dueDate.Ticks,
                Done = false,
                Description = description
            };
            _db.Add(entity);
            _db.SaveChanges();
            return entity;
        }

        public IEnumerable<TaskEntity> SelectAllTasks()
        {
            return _db.Tasks
                .OrderBy(task => task.Id);
        }

        public TaskEntity SelectTask(int id)
        {
            return _db.Tasks
                .Where(predicate: task => task.Id == id)
                .FirstOrDefault();
        }

        public TaskEntity DeleteTask(int id)
        {
            var entity = SelectTask(id);
            _db.Remove(entity);
            _db.SaveChanges();
            return entity;
        }
    }
}
