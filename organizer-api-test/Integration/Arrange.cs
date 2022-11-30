using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Hosting;
using organizer_api;

namespace organizer_api_test.Integration
{
    public class OrganizerWebApplication : WebApplicationFactory<Program>
    {
        protected override IHost CreateHost(IHostBuilder builder)
        {
            // shared extra set up goes here
            return base.CreateHost(builder);
        }
    }
}
