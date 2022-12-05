using DotNet.Testcontainers.Containers;
using Microsoft.Playwright.NUnit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace e2e_test.EndToEnd
{
    [Parallelizable(ParallelScope.Self)]
    [TestFixture]
    public class ApplicationUiTest : PageTest
    {
        private readonly TestcontainersContainer _application = ApplicationAPI.CONTAINER;

        [SetUp]
        public async Task Setup()
        {
            await _application.StartAsync();
        }

        [Test]
        public async Task DockerGettingStarted()
        {
            await Page.GotoAsync($"http://localhost:{_application.GetMappedPublicPort(ApplicationAPI.EXPOSED_PORT)}/tutorial/");

            await Verify(Page);
        }

        [TearDown]
        public async Task Teardown()
        {
            await _application.DisposeAsync();
        }
    }
}
