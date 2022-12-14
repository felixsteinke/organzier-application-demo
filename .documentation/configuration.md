# Application Configuration

## 1. ASP.NET API

.NET provides the [appsettings.json](../organizer-api/appsettings.json) where the configuration can be defined.

They can be used in different ways, for example directly in the [program.cs](../organizer-api/Program.cs):

```
var hostString = $"Host={builder.Configuration["PostgresDB:Host"]};";
```

The environment variables can be injected at the container start:

```shell
docker run -e PostgresDB__Host="host.docker.internal:5432"
```

### 1.1. Specific API Environment

| Key                  |     Default      | Examples                                      | Description                       |
|:---------------------|:----------------:|:----------------------------------------------|:----------------------------------|
| PostgresDB__Host     | `localhost:5432` | `localhost:5432`, `host.docker.internal:5432` | postgres-host for the connection  |
| PostgresDB__Database |  `organizer_db`  |                                               | database name for the application |
| PostgresDB__Username |    `postgres`    |                                               | username for db access            |
| PostgresDB__Password |    `password`    |                                               | user password for db access       |

## 2. Angular UI

Angular provides the [environment.ts](../organizer-ui/src/environments/environment.ts) where the configuration can be
defined. These variables can be used in the entire application by just importing the file.

The problem is that the environment values usually need to be known at the build time what is not always sufficient.

To provide dynamic environment variables, following files need to be added to the `assets`-directory to be available
after the build:

* [dynamic-env.js](../organizer-ui/src/assets/dynamic-env.js)
* [dynamic-env.template.js](../organizer-ui/src/assets/dynamic-env.template.js)

To apply the defined function on startup, add the `script` to the [index.html](../organizer-ui/src/index.html):

```
<head>
  <script src="assets/dynamic-env.js"></script>
</head>
```

After that, the [environment.ts](../organizer-ui/src/environments/environment.ts) can be fed with
the [dynamic-env.js](../organizer-ui/src/assets/dynamic-env.js) variables.

The [dynamic-env.template.js](../organizer-ui/src/assets/dynamic-env.template.js) enables the `envsubst`-command in
the [Dockerfile](../organizer-ui/Dockerfile) to inject the environment on the container start.

> Full Guide: [Pumping Code Blog](https://pumpingco.de/blog/environment-variables-angular-docker/)

### 2.1. Specific UI Environment

| Key              |         Default         | Examples                                                    | Description                               |
|:-----------------|:-----------------------:|:------------------------------------------------------------|:------------------------------------------|
| BACKEND_API_HOST | `http://localhost:5183` | `http://localhost:8080`, `http://host.docker.internal:8080` | host for backend api (no `/` at the end!) |
