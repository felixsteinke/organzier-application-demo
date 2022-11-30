using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace e2e_test.EndToEnd
{

    [Parallelizable(ParallelScope.Self)]
    [TestFixture]
    public class PublicUiTest : PageTest
    {

        //[Test]
        public async Task GithubProfile()
        {
            await Page.GotoAsync("https://github.com/felixsteinke");
            await Page.GetByRole(AriaRole.Link, new() { NameString = "Projects" }).ClickAsync();
            await Page.GetByRole(AriaRole.Link, new() { NameString = "System Design Workshop" }).ClickAsync();

            await Verify(Page);
        }

        [Test]
        public async Task BwCloudSwagger()
        {
            await Page.GotoAsync("http://193.196.52.129/swagger-ui/");

            await Verify(Page);
        }
    }
}
