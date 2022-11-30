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