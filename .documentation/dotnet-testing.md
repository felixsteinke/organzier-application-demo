# .NET Testing

## 1. Unit Testing

For the unit tests, the testing framework `XUnit` is used because it has the highest isolation. Unit tests should run
completely isolated and fast. Therefore, the unit under test are completely isolated. For example when testing
a `Service` with the dependency to a `DbContext`, it is required to mock the dependency with the `Moq`-Library.

These tests are run by the GitHub Action for Continuous Integration (CI).

__Tutorials:__

* [Verify Library (GitHub)](https://github.com/VerifyTests/Verify)
* [WinMerge for Verify Comparison (Installer)](https://winmerge.org/?lang=en)
* [Verify Overview Video (YT)](https://www.youtube.com/watch?v=wA7oJDyvn4c&ab_channel=%E2%80%A4NETOxford)

## 2. Integration Testing

For the integration tests, the testing framework `XUnit` is used as well. They also should be highly isolated and fast.
The difference to unit tests is the preparation of the unit under test. In the integration test, the entire application
is started up in the test and several `Testcontainers` will be available and isolated within the test.

To make the verification easier, the `Verify`-Library is used to make snapshots of verified results.

These tests are run by the GitHub Action for Continuous Integration (CI) in combination with the Unit Tests.

__Tutorials:__

* [General Web App Testing](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/multi-container-microservice-net-applications/test-aspnet-core-services-web-apps)
* [Program.cs accessible to TestServer](https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-7.0#basic-tests-with-the-default-webapplicationfactory)
* [WebApplicationFactory as Wrapper for TestServer](https://stackoverflow.com/questions/69897652/how-do-you-create-a-test-server-in-net-6)
* [Testcontainer Library](https://dotnet.testcontainers.org/)
* [Tutorial for Testcontainer in Java (YT)](https://www.youtube.com/watch?v=9fzn0j1jbiQ&t=1148s&ab_channel=SebastianDaschner)

## 3. E2E Testing

End-To-End Testing is more complex than Unit and Integration Testing. It takes the finished container und starts up the
entire system within an isolated test environment.

To execute User-Actions on the UI, the `Playwright`-Library is used. This library is mostly supported within the testing
framework `NUnit` and therefore it is used for this project.

The results on the UI can be verified with `Assert` and `Playwright` as well. To have the least effort with the
tests, `Verify` can be used on top of `Playwright`.

The least effort is to generate tests with the `Playwright Code Generator` and then `Verify` is used on the page. It
verifies the full `html & png of the page`.

> Disclaimer: This is still work in progress und not fully functional yet!

__Tutorials:__

* [Playwright UI Automation](https://playwright.dev/)
* [Playwright Code Generator](https://playwright.dev/docs/codegen)
