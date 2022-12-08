[![Test-Reports](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/test-reports.yml/badge.svg)](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/test-reports.yml)
[![Docker-Image](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/docker-image.yml/badge.svg)](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/docker-image.yml)
[![Deployment](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/deployment.yml/badge.svg)](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/deployment.yml)

# Organizer Application

Application for the lecture System Design.

## API

ASP.NET API as backend of the application.

### Development Software

* [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-7.0.100-windows-x64-installer)
* [Visual Studio 2022](https://visualstudio.microsoft.com/de/downloads/)
	* [NuGet Source Configuration](https://learn.microsoft.com/en-us/azure/devops/artifacts/nuget/upstream-sources?view=azure-devops#add-nuget-gallery-upstream-source)
* [PostgresDB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

### Local Database

```shell
docker run --name postgres-db -p 5432:5432 -e POSTGRES_DB=organizer_db -e POSTGRES_PASSWORD=password -d postgres:15.1-alpine
```

__Migration Management within Package Manager Console:__

```shell
Add-Migration DatabaseMigration
Update-Database
```

## Tutorials

* [General Web App Testing](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/multi-container-microservice-net-applications/test-aspnet-core-services-web-apps)
* [General verfification of expected data](https://github.com/VerifyTests/Verify)
	* [WinMerge](https://winmerge.org/?lang=en)
	* [Verify Overview Video](https://www.youtube.com/watch?v=wA7oJDyvn4c&ab_channel=%E2%80%A4NETOxford)
* [IT Program.cs accessible to TestServer](https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-7.0#basic-tests-with-the-default-webapplicationfactory)
* [IT WebApplicationFactory as Wrapper for TestServer](https://stackoverflow.com/questions/69897652/how-do-you-create-a-test-server-in-net-6)
* [IT Testcontainer for fast integration tests](https://dotnet.testcontainers.org/)
	* [Tutorial for Testcontainer (Java)](https://www.youtube.com/watch?v=9fzn0j1jbiQ&t=1148s&ab_channel=SebastianDaschner)
* [E2E Playwright UI Automation](https://playwright.dev/)
	* [Playwright CodeGen](https://playwright.dev/docs/codegen)
