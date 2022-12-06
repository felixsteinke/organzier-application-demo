using Microsoft.EntityFrameworkCore;
using organizer_api.Database.Entities;

namespace organizer_api.Database
{
    public class DatabaseRepository : DbContext
    {
        public virtual DbSet<TaskEntity> Tasks { get; set; }

        // The following configures EF to create a Sqlite database file in the
        // special "local" folder for your platform.
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseNpgsql("Host=localhost:5432;Database=organizer_db;Username=postgres;Password=password");
    }
}
