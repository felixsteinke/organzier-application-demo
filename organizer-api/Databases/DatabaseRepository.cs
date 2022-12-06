using Microsoft.EntityFrameworkCore;
using organizer_api.Database.Entities;

namespace organizer_api.Database
{
    public class DatabaseRepository : DbContext
    {
        public virtual DbSet<TaskEntity> Tasks { get; set; }

        public DatabaseRepository(DbContextOptions<DatabaseRepository> options) : base(options) { }
    }
}
