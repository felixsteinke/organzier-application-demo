using DotNet.Testcontainers.Containers;
using Npgsql;

namespace organizer_api_test.Integration
{
    public class DatabaseServiceIT : IAsyncLifetime
    {
        private readonly TestcontainerDatabase _database = PostgresDB.CONTAINER;

        public Task InitializeAsync()
        {
            return _database.StartAsync();
        }

        public Task DisposeAsync()
        {
            return _database.DisposeAsync().AsTask();
        }

        [Fact]
        public void ExecuteCommand()
        {
            //Act
            using (var connection = new NpgsqlConnection(_database.ConnectionString))
            {
                using (var command = new NpgsqlCommand())
                {
                    connection.Open();
                    command.Connection = connection;
                    command.CommandText = "SELECT 1";
                    var result = command.ExecuteReader();
                }
            }
            //Assert
        }
    }
}
