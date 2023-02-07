using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;

namespace WebApp.Tests
{
    public class UnitTest
    {
        private readonly HttpClient httpClient;

        public UnitTest()
        {
            var appFactory = new WebApplicationFactory<Program>();
            httpClient = appFactory.CreateClient();
        }

        [Fact]
        public void Test()
        {
        }
    }
}