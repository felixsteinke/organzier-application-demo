# Docker

> Prerequisite: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

__(Commands are based on repository root)__

## 1. Run Application Stack

### 1.1. Run by building the current code

[docker-compose-prod.yml](../.docker/docker-compose-build.yml)

```shell
docker compose --file .docker/docker-compose-build.yml up --build
```

* UI: [http://localhost:8080](http://localhost:8080)
* API: [http://localhost:8088/swagger/index.html](http://localhost:8088/swagger/index.html)

### 1.2. Run with GitHub Packages (Port 80)

[docker-compose-prod.yml](../.docker/docker-compose-prod.yml)

```shell
docker compose --file .docker/docker-compose-prod.yml up
```

* UI: [http://localhost:80](http://localhost:80)
* API: [http://localhost:8088/swagger/index.html](http://localhost:8088/swagger/index.html)

### 1.3. Run with GitHub Packages (Port 8080)

[docker-compose.yml](../.docker/docker-compose.yml)

```shell
cd ./.docker
docker compose kill
docker compose rm --stop --force
docker compose pull
docker compose up
```

* UI: [http://localhost:8080](http://localhost:8080)
* API: [http://localhost:8088/swagger/index.html](http://localhost:8088/swagger/index.html)

## 2. Build & Run single Containers

### 2.1. UI

* [Dockerfile](../organizer-ui/Dockerfile)
* [Environment Configuration](../organizer-ui/src/environments/environment.ts)

```shell
cd ./organizer-ui
docker build -t organizer-ui:single .
docker run -p 8080:80 -e BACKEND_API_HOST="http://host.docker.internal:8088" --name organizer-ui-single organizer-ui:single
```

Running container on [http://localhost:8080](http://localhost:8080).

### 2.2. API

* [Dockerfile](../organizer-api/Dockerfile)
* [Environment Configuration](../organizer-api/appsettings.json)

```shell
cd ./organizer-api
docker build -t organizer-api:single .
docker run -p 8088:80 -e PostgresDB__Host="host.docker.internal:5432" -e PostgresDB__Database="organizer_db" -e PostgresDB__Username="hugo" -e PostgresDB__Password="password" --name organizer-api-single organizer-api:single
```

Running container on [http://localhost:8088/swagger/index.html](http://localhost:8088/swagger/index.html).

### 2.3. Database

```shell
docker run -p 5432:5432 -e POSTGRES_DB="organizer_db" -e POSTGRES_USER="hugo" -e POSTGRES_PASSWORD="password" -d --name postgres-db-single postgres:15.1-alpine
```

## 3. Automated Build & Run

* [.github/workflows/docker-image.yml](../.github/workflows/docker-image.yml)
* [.github/workflows/deployment.yml](../.github/workflows/deployment.yml)
