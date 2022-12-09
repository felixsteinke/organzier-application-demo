using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using organizer_api.Database;
using organizer_api.Services;

namespace organizer_api
{
    public partial class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add rest controllers to dependeny injection
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            // Setup database connection
            builder.Services.AddDbContext<TaskRepository>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("PostgresDB")));
            // Setup service dependency injection
            builder.Services.AddScoped<IDatabaseService, DatabaseService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            // Apply database migration
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<TaskRepository>();
                db.Database.Migrate();
            }

            app.Run();
        }
    }
}