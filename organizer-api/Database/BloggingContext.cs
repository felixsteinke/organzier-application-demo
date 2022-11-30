using Microsoft.EntityFrameworkCore;

namespace organizer_api.Database
{
    public class BloggingContext : DbContext
    {
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }

        // The following configures EF to create a Sqlite database file in the
        // special "local" folder for your platform.
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseNpgsql($"Host={Constants.DB_URL};Database={Constants.DB_NAME};Username={Constants.DB_USER};Password={Constants.DB_PASSWORD}");
    }
}
