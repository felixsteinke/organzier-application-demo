[![Test-Reports](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/test-reports.yml/badge.svg)](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/test-reports.yml)
[![Docker-Image](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/docker-image.yml/badge.svg)](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/docker-image.yml)
[![Deployment](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/deployment.yml/badge.svg)](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/deployment.yml)

# Organizer Application

System to show different demonstrate different concepts for System Design. 
It contains a ASP.NET Core API, that uses a PostgresDB with the Entityframework and Keycloak for the authentification.
A Angular UI will use the API and is the entrypoint for users into the system.

The entire system will be deployed on a PaaS Cloud with docker compose via GitHub Actions.

```
root
 |___ .docker					--> docker compose files to run the entire system
 |___ .github/workflows			--> github action definitions
 |___ e2e-test					--> project within the api.sln for testing
 |		 |___ EndToEnd			--> NUnit tests with Playwright
 |___ organizer-api				--> project within the api.sln for testing
 |		 |___ Controllers		--> controller with endpoints registered in the program.cs
 |		 |___ Databases			--> database layer with DBContexts registered in the program.cs
 |		 |___ Enums				--> definied constants
 |		 |___ Migrations		--> generated from the EF with Add-Migration
 |		 |___ Services			--> application layer with registered services in the program.cs
 |		 |___ orginizer-api.sln	--> solution that contains multiple projects
 |___ organizer-api-test		--> project within the api.sln for testing
		 |___ Integration		--> XUnit integreation testing (starts the program.cs & testcontainers)
		 |___ Unit				--> XUnit unit testing 
```

## API

### Development Tools

* [Visual Studio 2022](https://visualstudio.microsoft.com/de/downloads/)
	* .NET 7 (selectable in the installer)
	* ASP.NET Application Development
	* [NuGet Source Configuration](https://learn.microsoft.com/en-us/azure/devops/artifacts/nuget/upstream-sources?view=azure-devops#add-nuget-gallery-upstream-source)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### EntityFramework & Database

The application depends on a Postgres Database. On startup it will apply the [Migrations](./organizer-api/Migrations).
Within the development, the DB can be started as a docker container:

```shell
docker run --name postgres-db -p 5432:5432 -e POSTGRES_DB=organizer_db -e POSTGRES_PASSWORD=password -d postgres:15.1-alpine
```

Keep in mind to sync the settings with the [appsettings.json](./organizer-api/appsettings.json).

__Updating the Database Layer:__

The [Database Layer](./organizer-api/Databases) is defines `Reposytories` as definition of `DbContexts` and contain `DbSets`.
The `DbSets` register the `Entitites` in the EntityFramework. 
Within the `Entity`-Classes several configurations can be made for the __Code-First Approach__.

When the modification is finished, it is required to update the `Migration` within the __Package Manager Console__:

```shell
Add-Migration DatabaseMigration
Update-Database
```

__Behaviour in Production:__

In production the database container will be started with the docker compose and if there is no exisiting volume, 
the application will apply the Migration on startup. This means everything should be automated.

__Tutorials:__

* 

### Unit Testing

For the unit tests, the testing framework `XUnit` is used because it has the highest isolation. 
Unit tests should run completely isolated and fast. Therefore the unit under test are completely isolated.
For example when testing a `Service` with the dependency to a `DbContext`, it is required to mock the dependency with the `Moq`-Library.

These tests are run by the GitHub Action for Continuous Integration (CI). 

__Tutorials:__

* [Verify Library (GitHub)](https://github.com/VerifyTests/Verify)
* [WinMerge for Verify Comparison (Installer)](https://winmerge.org/?lang=en)
* [Verify Overview Video (YT)](https://www.youtube.com/watch?v=wA7oJDyvn4c&ab_channel=%E2%80%A4NETOxford)

### Integration Testing

For the integration tests, the testing framework `XUnit` is used aswell. 
They also should be highly isolated and fast. The difference to unit tests is the preparation of the unit under test.
In the integration test, the entire application is started up in the test and several `Testcontainers` will be available and isolated within the test.

To make the verification easier, the `Verify`-Library is used to make snapshots of verified results.

These tests are run by the GitHub Action for Continuous Integration (CI) in combination with the Unit Tests.

__Tutorials:__

* [General Web App Testing](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/multi-container-microservice-net-applications/test-aspnet-core-services-web-apps)
* [Program.cs accessible to TestServer](https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-7.0#basic-tests-with-the-default-webapplicationfactory)
* [WebApplicationFactory as Wrapper for TestServer](https://stackoverflow.com/questions/69897652/how-do-you-create-a-test-server-in-net-6)
* [Testcontainer Library](https://dotnet.testcontainers.org/)
* [Tutorial for Testcontainer in Java (YT)](https://www.youtube.com/watch?v=9fzn0j1jbiQ&t=1148s&ab_channel=SebastianDaschner)

### E2E Testing

End-To-End Testing is more complex than Unit and Integration Testing. 
It takes the finished container und starts up the entire system within an isolated test environment.

To execute User-Actions on the UI, the `Playwright`-Library is used. 
This library is mostly supported within the testing framework `NUnit` and therefore it is used for this project.

The results on the UI can be verified with `Assert` and `Playwright` aswell. 
To have the least effort with the tests, `Verify` can be used on top of `Playwright`.

The least effort is to generate tests with the `Playwright Code Generator` and then `Verify` is used on the page. 
It verifies the full `html & png of the page`. 

> Disclaimer: This is still work in progress und not fully functional yet!

__Tutorials:__

* [Playwright UI Automation](https://playwright.dev/)
* [Playwright Code Generator](https://playwright.dev/docs/codegen)

## Deployment

The deployment is done with the GitHub Actions. 
The container image gets published as package on GitHub and after that deployed with SSH on the BW-Cloud.
The BW-Cloud provides PaaS and is available for students.
