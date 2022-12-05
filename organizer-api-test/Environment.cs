using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Configurations;
using DotNet.Testcontainers.Containers;
using DotNet.Testcontainers.Networks;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Hosting;
using organizer_api;

namespace organizer_api_test
{
    public class OrganizerWebApplication : WebApplicationFactory<Program>
    {
        protected override IHost CreateHost(IHostBuilder builder)
        {
            // shared extra set up goes here
            return base.CreateHost(builder);
        }
    }

    public static class PostgresDB
    {
        private static readonly short EXPOSED_PORT = 5432;
        private static readonly string NETWORK_ALIAS = "postgres-network";

        private static readonly IDockerNetwork NETWORK = new TestcontainersNetworkBuilder()
            .WithName(Guid.NewGuid().ToString("D"))
            .Build();

        public static readonly TestcontainerDatabase CONTAINER = new TestcontainersBuilder<PostgreSqlTestcontainer>()
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
}
