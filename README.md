# nl-portal-configuration-panel

## Requirements

The following software has to be installed to be able to use this application

| Run latest prebuilt app images | Build and run app images | Run from source |
|--------------------------------|--------------------------|-----------------|
| Docker Desktop                 | Docker Desktop           | Docker Desktop  |
|                                | Gradle 8.*               | Gradle 8.*      |
|                                | NodeJS 20                | NodeJS 20       |
|                                | PNPM                     | PNPM            |

## Dependencies

### NL Portal Docker Compose

This application relies on the keycloak and keycloak-db services from the
[NL Portal Docker Compose](https://github.com/nl-portal/nl-portal-docker-compose) project.
Please make sure those are composed and running.

## Running the application

Follow one of the following to start up the application:  
* [Run latest prebuilt app images](#by-pulling-and-running-latest-prebuilt-docker-images)
* [Build and run app images](#by-building-and-running-docker-images)
* [Run from source](#from-source)

Once started, the application will become available at http://localhost:3333. The default user credentials
for this application are `admin:admin` (if you're using the above-mentioned compose).

### By pulling and running latest prebuilt docker images

Running the latest public docker images can be done via your favourite IDE by running the `docker-compose` file with
the `remote` profile or by running the following command in your terminal:

```shell
docker compose --profile remote up -d
```

### By building and running docker images

You can choose to build docker images of the backend and frontend for running locally
instead of in a development environment by following these steps:

1. Build the backend app
   ```shell
   cd backend
   ./gradlew bootJar
   ```
1. Build the frontend app
   ```shell
   pnpm -C frontend i && pnpm -C frontend build
   ```
1. Build and compose the images with docker
   ```shell
   docker compose --profile local up -d --build
   ```

### From source

Start up the backend and frontend from within their respective directories through an IDE
or via the following shell commands:


1. Compose the database
   ```shell
   docker compose up -d
   ```
1. Install and start the frontend
   ```shell
   cd frontend
   pnpm i && pnpm dev
   ```
1. Start the backend
   ```shell
   cd backend
   ./gradlew bootRun
   ```