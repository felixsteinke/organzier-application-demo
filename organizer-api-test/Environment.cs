using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Configurations;
using DotNet.Testcontainers.Containers;
using DotNet.Testcontainers.Networks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using organizer_api;
using organizer_api.Database;

namespace organizer_api_test
{
    public class OrganizerWebApplication : WebApplicationFactory<Program>
    {
        private string? _testConnectionString = null;

        public OrganizerWebApplication() { }

        public OrganizerWebApplication(string connectionString)
        {
            _testConnectionString = connectionString;
        }


        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            if (this._testConnectionString != null)
            {
                builder.ConfigureServices(services =>
                {
                    // remove the existing context configuration
                    var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<TaskRepository>));
                    if (descriptor != null)
                    {
                        services.Remove(descriptor);
                    }
                    // replace it with a new context configuration
                    services.AddDbContext<TaskRepository>(opt => opt.UseNpgsql(_testConnectionString));
                });
            }
            builder.UseEnvironment("Development");
        }

        protected override IHost CreateHost(IHostBuilder builder)
        {
            return base.CreateHost(builder);
        }
    }

    public class PostgresDB : IAsyncLifetime
    {
        public static readonly short EXPOSED_PORT = 5432;
        private static readonly string NETWORK_ALIAS = "postgres-network";
        private readonly IDockerNetwork NETWORK;
        public readonly TestcontainerDatabase CONTAINER;

        public PostgresDB()
        {
            NETWORK = new TestcontainersNetworkBuilder()
            .WithName(Guid.NewGuid().ToString("D"))
            .Build();

            CONTAINER = new TestcontainersBuilder<PostgreSqlTestcontainer>()
            .WithDatabase(new PostgreSqlTestcontainerConfiguration
            {
                Database = "organizer_db",
                Username = "postgres",
                Password = "password",
            })
            //.WithNetwork(NETWORK)
            //.WithNetworkAliases(NETWORK_ALIAS)
            .WithPortBinding(EXPOSED_PORT, true)
            .WithWaitStrategy(Wait.ForUnixContainer()
            .UntilPortIsAvailable(EXPOSED_PORT))
            .Build();
        }

        public Task InitializeAsync()
        {
            return this.CONTAINER.StartAsync();
        }

        public Task DisposeAsync()
        {
            return this.CONTAINER.StopAsync();
        }
    }
}
