# nl-portal-configuration-panel

## Requirements

The following software has to be installed to be able to use this application

| Run latest prebuilt app images | Build and run app images | Run from source |
|--------------------------------|--------------------------|-----------------|
| Docker Desktop                 | Docker Desktop           | Docker Desktop  |
|                                | NodeJS 20                | NodeJS 20       |
|                                | PNPM                     | PNPM            |

## Dependencies

## Compatibility

Refer to the following table for version compatibility between the Configuration Panel and NL Portal:

|         | Configuration Panel | NL Portal (Libraries/App) |
|---------|---------------------|---------------------------|
| Version | 1.0.0               | 2.0.2                     |

## Running the application

Follow one of the following to start up the application:

* [Run latest prebuilt app images](#by-pulling-and-running-latest-prebuilt-docker-images)
* [Build and run app images](#by-building-and-running-docker-images)
* [Run from source](#from-source)

Once started, the application will become available at http://localhost:3001. The default user credentials
for this application are `admin:admin`.

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
2. Build the frontend app
   ```shell
   pnpm -C frontend i && pnpm -C frontend build
   ```
3. Build and compose the images with docker
   ```shell
   docker compose --profile local up -d --build
   ```

### From source

Start up the backend and frontend from within their respective directories through an IDE (only do step 1) or via the
following shell commands:

1. Compose the database and keycloak services
   ```shell
   docker compose up -d
   ```
2. Install and start the frontend
   ```shell
   cd frontend
   pnpm i && pnpm dev
   ```
3. Start the backend
   ```shell
   cd backend
   ./gradlew bootRun
   ```

## Environment Variabes

The following is a list of environment variables specific to this application. Usual Spring boot variables can be
configured as well.

* Configuration Panel Backend
    * **Required**
        * `DATABASE_URL` - Shorthand for `SPRING_DATASOURCE_URL`. Sets the database of the application.
        * `DATABASE_USERNAME` - Shorthand for `SPRING_DATASOURCE_USERNAME`. Sets the database username.
        * `DATABASE_PASSWORD` - Shorthand for `SPRING_DATASOURCE_PASSWORD`. Sets the database password.
        * `JWKS_URI` - Shorthand for `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI`. URI that points towards a
          JSON Key Set. Used to authenticate incoming REST API requests.
        * `CONFIG_CACHE_TTL` - Used to set the duration at which the configuration cache is evicted in milliseconds.
        * `CONFIG_SERVER_TOKEN` - The token that should be used to authenticate configuration queries. Every NL Portal
          needs to have this
          value set for their Spring Cloud Configuration Client.
    * Optional
        * `LOGLEVEL` - Shorthand for `LOGGING_LEVEL_ROOT`. Used to set the stdout loglevel of the application.
          Default: `INFO`
        * `CORS_ALLOWED_ORIGINS` - CORS configuration for setting allowed request origins against the REST API. Default:
          `*`
        * `CORS_ALLOWED_METHODS` - CORS configuration for setting allowed request methods against the REST API.
          Default: `GET, POST, PUT, DELETE`
        * `CORS_ALLOWED_HEADERS` - CORS configuration for setting allowed request headers against the REST API.
          Default: `Authorization, Content-Type, Accept`
        * `CONFIG_SERVER_PREFIX` - Shorthand for `SPRING_CLOUD_CONFIG_SERVER_PREFIX`. Can be used to customise the base
          path of the configuration server. Application base URL is used as the configuration server if not set.
        * `CONFIG_NOTIFY_ENABLED` - Whether to notify NL Portal instances when configuration is changed. Default:
          `false`
        * `CONFIG_NOTIFY_LIST` - A comma separated list of NL Portal base URLs that should receive a Spring Actuator
          Restart request if Notify is enabled. Example: `https://localhost:9001, https://localhost:9002`
* Configuration Panel Frontend
    * **Required**
        * `OIDC_URL` - OIDC Authority/Oauth2 Provider URL.
        * `OIDC_CLIENT_ID` - The Client ID of the client that will be used for the authentication flow at the OIDC
          Authority.
        * `OIDC_REDIRECT_URI` - The post authentication target URL where the OIDC Authority should redirect the user.
          Should be set to the base URL of this application.
        * `OIDC_POST_LOGOUT_REDIRECT_URI` - The post logout target URL where the OIDC Authority should redirect the
          user.
        * `CLIENT_APPLICATION_NAME` - The name of the Spring Boot application whose configuration is being provided by
          this application. Example: `nl-portal-app`.
    * Optional
        * `CONFIG_PANEL_REST_API_URL` - The frontend app relies on requests made to `/api` being routed to the backend,
          either via ingress or a custom router (see example [docker-compose.yml](docker-compose.yaml)). Set this to the
          base URL of the backend REST API should the backend and frontend be running on different hosts without
          routing.

## Connecting to an existing NL Portal

### Via envinronment varibales

Configure the following environment variables according to your infrastructure, be it local or remote to affect the
example docker-compose setup.

* [nl-portal-app-backend environment variables](imports/backend.env)
* [nl-portal-app-frontend environment variables](imports/frontend.env)
