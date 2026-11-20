# Environment variables

Every environment variable of the panel. Usual Spring Boot variables can be set as well.

## Backend

### Required

| Env var | Description |
|---|---|
| `DATABASE_URL` | Shorthand for `SPRING_DATASOURCE_URL`. JDBC URL of the panel's Postgres database. |
| `DATABASE_USERNAME` | Shorthand for `SPRING_DATASOURCE_USERNAME`. |
| `DATABASE_PASSWORD` | Shorthand for `SPRING_DATASOURCE_PASSWORD`. |
| `JWKS_URI` | Shorthand for `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI`. Validates REST API tokens, see [Admin access](admin-access.md). |
| `CONFIG_CACHE_TTL` | Duration in milliseconds after which the configuration cache is evicted. |
| `CONFIG_SERVER_TOKEN` | Token NL Portal uses to read the configuration server. NL Portal's `CONFIGURATION_PANEL_TOKEN` must have the same value. |
| `CONFIG_ENCRYPTION_KEY` | Unless `CONFIG_ENCRYPTION_ENABLED=false`. See [Encryption](encryption.md). |

### Optional

| Env var | Default | Description |
|---|---|---|
| `LOGLEVEL` | `INFO` | Shorthand for `LOGGING_LEVEL_ROOT`. |
| `CONFIG_SECURITY_API_AUTHORITIES` | `ROLE_CONFIG_PANEL_ADMIN` | Roles that grant REST API access, comma separated. See [Admin access](admin-access.md). |
| `CONFIG_SECURITY_JWT_AUTHORITIES_CLAIM_NAME` | `['realm_access']['roles']` | Where the roles are in the token. See [Admin access](admin-access.md). |
| `CONFIG_SECURITY_ALLOWED_KEY_PREFIXES` | `nl-portal.config.,nl-portal.frontend.` | Property key prefixes the panel reads, writes, deletes and serves. See [Allowed property keys](allowed-property-keys.md). |
| `CORS_ALLOWED_ORIGINS` | `*` | Allowed request origins for the REST API. |
| `CORS_ALLOWED_METHODS` | `GET, POST, PUT, DELETE` | Allowed request methods for the REST API. |
| `CORS_ALLOWED_HEADERS` | `Authorization, Content-Type, Accept` | Allowed request headers for the REST API. |
| `CONFIG_SERVER_PREFIX` | none | Shorthand for `SPRING_CLOUD_CONFIG_SERVER_PREFIX`. Base path of the configuration server, e.g. `/configuration`. |
| `CONFIG_ENCRYPTION_ENABLED` | `true` | See [Encryption](encryption.md). |
| `CONFIG_NOTIFY_ENABLED` | `false` | See [Notify NL Portal](notify.md). |
| `CONFIG_NOTIFY_LIST` | none | Comma-separated NL Portal base URLs. Required when notify is enabled. |
| `CONFIG_NOTIFY_CLIENT_TOKEN_URI` | none | Required when notify is enabled. |
| `CONFIG_NOTIFY_CLIENT_ID` | none | Required when notify is enabled. |
| `CONFIG_NOTIFY_CLIENT_SECRET` | none | Required when notify is enabled. |
| `CONFIG_NOTIFY_CLIENT_SCOPE` | empty | Scopes for the token request, comma separated. |
| `CONFIG_NOTIFY_CONNECT_TIMEOUT` | `5s` | Connect timeout for the token request and NL Portal calls. |
| `CONFIG_NOTIFY_READ_TIMEOUT` | `10s` | Read timeout for the token request and NL Portal calls. |

## Frontend

### Required

| Env var | Description |
|---|---|
| `OIDC_URL` | OIDC authority URL. |
| `OIDC_CLIENT_ID` | Client ID for the login flow at the OIDC authority. |
| `OIDC_REDIRECT_URL` | Where the OIDC authority redirects after login. Set to the base URL of the panel. |
| `OIDC_POST_LOGOUT_REDIRECT_URL` | Where the OIDC authority redirects after logout. |
| `CLIENT_APPLICATION_NAME` | The application name NL Portal reads its configuration for, e.g. `nl-portal-app`. |

### Optional

| Env var | Description |
|---|---|
| `CONFIG_PANEL_REST_API_URL` | The frontend sends `/api` requests to its own host, which an ingress forwards to the backend. Set this to the backend's REST API base URL when the frontend and backend run on different hosts without routing, as the Docker Compose example does (see [imports/frontend.env](../../imports/frontend.env)). |
