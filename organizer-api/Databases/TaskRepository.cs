using Microsoft.EntityFrameworkCore;
using organizer_api.Database.Entities;

namespace organizer_api.Database
{
    public class TaskRepository : DbContext
    {
        public virtual DbSet<TaskEntity> Tasks { get; set; }

        public TaskRepository(DbContextOptions<TaskRepository> options) : base(options) { }

        public TaskRepository() { }
    }
}
