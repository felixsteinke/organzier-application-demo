[![Test-Reports](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/test-reports.yml/badge.svg)](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/test-reports.yml)
[![Docker-Image](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/docker-image.yml/badge.svg)](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/docker-image.yml)
[![Deployment](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/deployment.yml/badge.svg)](https://github.com/felixsteinke/organzier-application-demo/actions/workflows/deployment.yml)

# Organizer Application

System to show different demonstrate different concepts for System Design. It contains an ASP.NET Core API, that uses a
PostgresDB with the EntityFramework and Keycloak for the Authentication. An Angular UI will use the API and is the
entrypoint for users into the system.

The entire system will be deployed on a PaaS Cloud with docker compose via GitHub Actions.

* [Development Tools](.documentation/dev-tools.md)
* [Docker Documentation](.documentation/docker.md)
* [Configuration Documentation](./.documentation/configuration.md)
* [.NET Testing Documentation](.documentation/dotnet-testing.md)
* [Material UI Documentation](.documentation/material-ui.md)

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

## UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.1.

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
