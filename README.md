[![Test-Reports](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/test-reports.yml/badge.svg)](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/test-reports.yml)
[![Docker-Image](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/docker-image.yml/badge.svg)](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/docker-image.yml)
[![Deployment](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/deployment.yml/badge.svg)](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/deployment.yml)

# Organizer Application

System to show different demonstrate different concepts for System Design. It contains an ASP.NET Core API, that uses a
PostgresDB with the EntityFramework and Keycloak for the Authentication. An Angular UI will use the API and is the
entrypoint for users into the system.

The entire system will be deployed on a PaaS Cloud with docker compose via GitHub Actions.

```
root
 |_ .docker			--> docker compose files to run the entire system
 |_ .github/workflows		--> github action definitions
 |_ e2e-test			--> .NET project within the api.sln for testing
 |	|_ EndToEnd			--> NUnit tests with Playwright
 |_ organizer-api		--> .NET project within the api.sln for testing
 |	|_ Controllers			--> controller with endpoints registered in the program.cs
 |	|_ Databases			--> database layer with DBContexts registered in the program.cs
 |	|_ Enums			--> definied constants
 |	|_ Migrations			--> generated from the EF with Add-Migration
 |	|_ Services			--> application layer with registered services in the program.cs
 |	|_ orginizer-api.sln		--> solution that contains multiple projects
 |_ organizer-api-test		--> .NET project within the api.sln for testing
 |	|_ Integration			--> XUnit integreation testing (starts the program.cs & testcontainers)
 |	|_ Unit				--> XUnit unit testing 
 |_ organizer-ui		--> Angular project as UI for the API
 	|_ src/app			--> main application component with module import and routing
 		  |_ view		    --> components that contain components and are accessible by the routing
 		  |_ components             --> components that are used within vuews
 		  |_ services               --> services that use APIs
```

## API

### Development Tools

* [Visual Studio 2022](https://visualstudio.microsoft.com/de/downloads/)
  * .NET 7 (selectable in the installer)
  * ASP.NET Application Development
  * [NuGet Source Configuration](https://learn.microsoft.com/en-us/azure/devops/artifacts/nuget/upstream-sources?view=azure-devops#add-nuget-gallery-upstream-source)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### EntityFramework & Database

The application depends on a Postgres Database. On startup, it will apply the [Migrations](./organizer-api/Migrations).
Within the development, the DB can be started as a docker container:

```shell
docker run --name postgres-db -p 5432:5432 -e POSTGRES_DB=organizer_db -e POSTGRES_PASSWORD=password -d postgres:15.1-alpine
```

Keep in mind to sync the settings with the [appsettings.json](./organizer-api/appsettings.json).

__Updating the Database Layer:__

The [Database Layer](./organizer-api/Databases) is defines `Reposytories` as definition of `DbContexts` and
contain `DbSets`. The `DbSets` register the `Entitites` in the EntityFramework. Within the `Entity`-Classes several
configurations can be made for the __Code-First Approach__.

When the modification is finished, it is required to update the `Migration` within the __Package Manager Console__:

```shell
Add-Migration DatabaseMigration
Update-Database
```

__Behaviour in Production:__

In production the database container will be started with the docker compose and if there is no existing volume, the
application will apply the Migration on startup. This means everything should be automated.

### Unit Testing

For the unit tests, the testing framework `XUnit` is used because it has the highest isolation. Unit tests should run
completely isolated and fast. Therefore, the unit under test are completely isolated. For example when testing
a `Service` with the dependency to a `DbContext`, it is required to mock the dependency with the `Moq`-Library.

These tests are run by the GitHub Action for Continuous Integration (CI).

__Tutorials:__

* [Verify Library (GitHub)](https://github.com/VerifyTests/Verify)
* [WinMerge for Verify Comparison (Installer)](https://winmerge.org/?lang=en)
* [Verify Overview Video (YT)](https://www.youtube.com/watch?v=wA7oJDyvn4c&ab_channel=%E2%80%A4NETOxford)

### Integration Testing

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

### E2E Testing

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

## UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.1.

__UI Container:__

* Run `docker build -t organizer-ui .` to build the image with docker.
* Run `docker run -d -p 4200:80 --name organizer-ui organizer-ui` to run the container with docker.

> Disclaimer: Current Dockerfile does not build the project automatically.

### Development Tools

* [NodeJS](https://nodejs.org/en/download/)
  * Angular CLI 14.1.1: `npm install -g @angular/cli@14.1.1`
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* Optional: [IntelliJ IDEA](https://www.jetbrains.com/idea/download)

### Material UI

Install the [Angular Material](https://material.angular.io/components) dependency to the project:

```shell
ng add @angular/material@14.2.7
```

Add the [material-module.ts](organizer-ui/src/app/material-module.ts) file and import it in
the [app.module.ts](organizer-ui/src/app/app.module.ts).

For a custom theme it is required to create a [themes.scss](organizer-ui/src/themes.scss) and add it to the `styles` in
the [angular.json](organizer-ui/angular.json).

For Grids and Tables the [W2UI](http://www.w2ui.com/web/demos/#/grid) dependency can be added to the project:

```shell
ng add w2ui
```

To make the JS-Library accessible, it is required to add following properties to
the [angular.json](organizer-ui/angular.json):

* `./node_modules/w2ui/w2ui.min.js` to the `scripts`
* `./node_modules/w2ui/w2ui.min.css` to the `styles`

### Flex Layout

To structure the layout, the [Angular FlexLayout](https://github.com/angular/flex-layout) is used. It helps to align
content easily and is defined in the HTML. To not cluster too many tags into the HTML, most of the time only `<div>`s
have an applied layout.

Get more information on the [Demo Page](https://tburleson-layouts-demos.firebaseapp.com/#/docs).

### Angular CLI

* __Development server:__ Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will
  automatically reload if you change any of the source files.
* __Code scaffolding:__ Run `ng generate component component-name` to generate a new component. You can also
  use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
* __Build:__ Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
* __Running unit tests:__ Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
* __Running end-to-end tests:__ Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this
  command, you need to first add a package that implements end-to-end testing capabilities.
* __Further help:__ To get more help on the Angular CLI use `ng help` or go check out
  the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Deployment

The deployment is done with the GitHub Actions. The container image gets published as package on GitHub and after that
deployed with SSH on the BW-Cloud. The BW-Cloud provides PaaS and is available for students.
