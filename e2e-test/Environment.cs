using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Containers;
using DotNet.Testcontainers.Images;

namespace e2e_test
{
    public class ApplicationAPI
    {
        public static readonly short EXPOSED_PORT = 80;
        public static readonly TestcontainersContainer CONTAINER = new TestcontainersBuilder<TestcontainersContainer>()
            .WithImage(new DockerImage("docker", "getting-started", "latest"))
            //.WithNetwork(NETWORK)
            //.WithNetworkAliases(NETWORK_ALIAS)
            .WithPortBinding(EXPOSED_PORT, true)
            //.WithEnvironment("KEY", "VALUE")
            .WithWaitStrategy(Wait.ForUnixContainer()
            .UntilPortIsAvailable(EXPOSED_PORT))
            .Build();
    }
}
