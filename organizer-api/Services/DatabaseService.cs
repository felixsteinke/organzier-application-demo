using organizer_api.Database;
using organizer_api.Database.Entities;
using organizer_api.Enums;

namespace organizer_api.Services
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
        private readonly TaskRepository _db;

        public DatabaseService(TaskRepository db)
        {
            _db = db;
        }

        public TaskEntity SelectTask(int id) => _db.Tasks.Where(predicate: task => task.Id == id).FirstOrDefault();

        public IEnumerable<TaskEntity> SelectAllTasks() => _db.Tasks.OrderBy(task => task.Id);

        public long SelectTaskCount() => _db.Tasks.Count();

        public TaskEntity InsertTask(string title, double estimate, Priority priority, DateTime dueDate, string description)
        {
            var entity = new TaskEntity
            {
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

        public TaskEntity UpdateTask(int id, string title, double estimate, Priority priority, DateTime dueDate, string description, bool done)
        {
            var entity = SelectTask(id);
            entity.Titel= title;
            entity.Estimate= estimate;
            entity.Priority = (int)priority;
            entity.DueDate = dueDate.Ticks;
            entity.Description = description;
            entity.Done= done;
            _db.Update(entity);
            _db.SaveChanges();
            return entity;
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
