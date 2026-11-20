# nl-portal-configuration-panel

> [!WARNING]
> **Do NOT expose the Configuration Panel to the public internet.**
>
> - The frontend and REST API (`/api/v1/**`) belong on an internal network or behind a WAF.
> - The configuration server (`CONFIG_SERVER_PREFIX`) is for NL Portal only and must never be reachable from outside the
>   Kubernetes cluster or Docker network. Don't route it through an ingress.

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
and NL Portal at your own pace. NL Portal 3.x can't decrypt values, so keep `CONFIG_ENCRYPTION_ENABLED=false` until every
connected instance runs 4.0 (see [Upgrading from 2.x](documentation/release-notes/3.x.x/3.0.0/migration.md)). The panel's main page lists the keys kept for older NL Portal versions; delete them once
every connected NL Portal instance runs the newer version.

Deleting a kept key does not notify connected NL Portal instances (no `actuator/refresh`). An older instance that is
still running keeps the deleted value until it restarts or its configuration is refreshed, and only then loses it. So a
key deleted too early shows up at the next restart, not right away: check every instance's version before deleting.

## Running the application

The Docker Compose setup has three run modes, chosen with the `RUN_MODE` environment variable:

| `RUN_MODE`          | Started by compose                                         | Panel                                                  |
|---------------------|------------------------------------------------------------|--------------------------------------------------------|
| `sources` (default) | database (54322), Keycloak (8083)                          | run `./gradlew bootRun` (8090) and `pnpm dev` yourself |
| `local`             | the above, plus the frontend (3001) and the backend (8090) | built from this checkout                               |
| `remote`            | the above, plus the frontend (3001) and the backend (8090) | the published `3.0` images                             |

Once started, the application is available at http://localhost:3001. The default user credentials are `admin:admin`.
The frontend calls the backend's REST API on port 8090. That port is published for local development only: it also
serves the configuration server, which must never be reachable from outside your network.

All services share the network namespace of the `localhost` helper container, so they reach each other on
`localhost:<port>`, the same URLs you use from your host. The stack's network is named `nl-portal-configuration-panel`;
on it, the helper container has the alias `configuration-panel`.

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

NL Portal can join this stack's network and fetch its configuration from the panel at startup. The panel notifies
NL Portal on `nl-portal:8080`, with the `nl-portal-m2m` client of this stack's Keycloak.

1. Start this stack:
   ```shell
   RUN_MODE=local docker compose up -d --build
   ```
2. Start NL Portal with `NETWORK=configuration-panel`, as the compose README of the NL Portal version you run describes.
3. To stop, stop NL Portal first, then this stack. While NL Portal is attached, this stack's network stays.

In `sources` an app runs on your host, which the other stack's containers can't reach, so not every combination works:

| NL Portal `RUN_MODE` | Panel `RUN_MODE`   | Configuration at startup | Notify                                          |
|----------------------|--------------------|--------------------------|-------------------------------------------------|
| `local` / `remote`   | `local` / `remote` | works                    | works                                           |
| `sources`            | `sources`          | works                    | works                                           |
| `sources`            | `local` / `remote` | works (`localhost:8090`) | fails, WARN only; restart NL Portal for changes |
| `local` / `remote`   | `sources`          | fails                    | works                                           |

## Documentation

See [documentation](documentation/README.md):

* [Environment variables](documentation/configuration/environment-variables.md)
* [Admin access](documentation/configuration/admin-access.md)
* [Allowed property keys](documentation/configuration/allowed-property-keys.md)
* [Notify NL Portal](documentation/configuration/notify.md)
* [Encryption](documentation/configuration/encryption.md)
* [Connecting NL Portal](documentation/configuration/connecting-nl-portal.md)
