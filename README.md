# nl-portal-configuration-panel

## Requirements

The following software has to be installed to be able to use this application

| Run latest prebuilt app images | Build and run app images | Run from source |
|--------------------------------|--------------------------|-----------------|
| Docker Desktop                 | Docker Desktop           | Docker Desktop  |
|                                |                          | Node.js 24      |
|                                |                          | pnpm 11         |
|                                |                          | Java 21         |

## Compatibility

Refer to the following table for version compatibility between the Configuration Panel and NL Portal:

|         | Configuration Panel | NL Portal (Libraries/App) |
|---------|---------------------|---------------------------|
| Version | 1.0.0               | 2.0.2                     |
| Version | 2.0.0               | 3.0.0                     |
| Version | 3.0.0               | 4.0.0                     |

Configuration Panel 3.0.0 also keeps serving the configuration NL Portal 3.x reads, so you can upgrade the panel first
and NL Portal at your own pace. The panel's main page lists the keys kept for older NL Portal versions; delete them once
every connected NL Portal instance runs the newer version.

Deleting a kept key does not notify connected NL Portal instances (no `actuator/refresh`). An older instance that is
still running keeps the deleted value until it restarts or its configuration is refreshed, and only then loses it. So a
key deleted too early shows up at the next restart, not right away: check every instance's version before deleting.

## Running the application

The Docker Compose setup has three run modes, chosen with the `RUN_MODE` environment variable:

| `RUN_MODE`          | Started by compose                         | Panel                                             |
|---------------------|--------------------------------------------|---------------------------------------------------|
| `sources` (default) | database (54322), Keycloak (8083)          | run `./gradlew bootRun` (8090) and `pnpm dev` yourself |
| `local`             | the above, plus the panel behind a router  | built from this checkout                          |
| `remote`            | the above, plus the panel behind a router  | the published `3.0` images                        |

Once started, the application is available at http://localhost:3001. The default user credentials are `admin:admin`.

### By pulling and running latest prebuilt docker images

```shell
RUN_MODE=remote docker compose up -d
```

### By building and running docker images

```shell
RUN_MODE=local docker compose up -d --build
```

### From source

1. Compose the database and Keycloak
   ```shell
   docker compose up -d
   ```
2. Install and start the frontend
   ```shell
   cd frontend
   pnpm i && pnpm dev
   ```
3. Configure and start the backend. `bootRun` reads only `backend/.env.properties`:
   ```shell
   cd backend
   cp .env.properties.example .env.properties
   ./gradlew bootRun
   ```

### Side by side with NL Portal

The panel's ports don't clash with the NL Portal monorepo's Docker Compose stack (the panel's Keycloak runs on 8083), so
both can run at the same time.
Start the NL Portal stack without its `config` profile, and point the NL Portal backend at the panel:

```properties
CONFIGURATION_PANEL_ENABLED=true
CONFIGURATION_PANEL_URI=http://localhost:8090/configuration
CONFIGURATION_PANEL_TOKEN=VerySecretToken
CONFIGURATION_PANEL_APPLICATION_NAME=nl-portal-app
```

Use `http://host.docker.internal:8090/configuration` as the URI when NL Portal runs in a container. The token must match
the panel's `CONFIG_SERVER_TOKEN`. The panel notifies the NL Portal backend on `http://localhost:8080` of changes (see
`CONFIG_NOTIFY_LIST`).

## Environment Variables

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
          needs to have this value set for their Spring Cloud Configuration Client.
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
        * `OIDC_REDIRECT_URL` - The post authentication target URL where the OIDC Authority should redirect the user.
          Should be set to the base URL of this application.
        * `OIDC_POST_LOGOUT_REDIRECT_URL` - The post logout target URL where the OIDC Authority should redirect the
          user.
        * `CLIENT_APPLICATION_NAME` - The name of the Spring Boot application whose configuration is being provided by
          this application. Example: `nl-portal-app`.
    * Optional
        * `CONFIG_PANEL_REST_API_URL` - The frontend app relies on requests made to `/api` being routed to the backend,
          either via ingress or a custom router (see example [compose.local.yaml](compose.local.yaml)). Set this to the
          base URL of the backend REST API should the backend and frontend be running on different hosts without
          routing.

## Connecting to an existing NL Portal

### Via environment variables

Configure the following environment variables according to your infrastructure, be it local or remote, to adapt the
example Docker Compose setup.

* [Configuration Panel backend environment variables](imports/backend.env)
* [Configuration Panel frontend environment variables](imports/frontend.env)
