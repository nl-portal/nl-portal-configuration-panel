# Notify NL Portal

After a change, the panel tells NL Portal to reload its configuration: `POST /actuator/refresh` for a changed setting,
`POST /actuator/restart` for a toggled feature. It authenticates with a service token it gets from your identity provider
(OAuth2 client-credentials grant). A failed notify never fails the save.

Notify is optional: NL Portal always loads its configuration from the panel at startup. Without notify, changes apply
at NL Portal's next restart.

Notify needs NL Portal 4.0.0 or later, with actuator access turned on.

## Settings

| Env var | Helm value (`nl-portal-configpanel-backend`) | Default | Required |
|---|---|---|---|
| `CONFIG_NOTIFY_ENABLED` | `settings.app.notifyEnabled` | `false` | no |
| `CONFIG_NOTIFY_LIST` | `settings.app.notifyList` | none | when notify is enabled |
| `CONFIG_NOTIFY_CLIENT_TOKEN_URI` | `settings.app.notify.client.tokenUri` | none | when notify is enabled |
| `CONFIG_NOTIFY_CLIENT_ID` | `settings.app.notify.client.clientId` | none | when notify is enabled |
| `CONFIG_NOTIFY_CLIENT_SECRET` | `settings.app.notify.client.clientSecret` (Secret) | none | when notify is enabled |
| `CONFIG_NOTIFY_CLIENT_SCOPE` | `settings.app.notify.client.scope` | empty: no `scope` parameter | no |
| `CONFIG_NOTIFY_CONNECT_TIMEOUT` | `settings.app.notify.connectTimeout` | `5s` | no |
| `CONFIG_NOTIFY_READ_TIMEOUT` | `settings.app.notify.readTimeout` | `10s` | no |

- `CONFIG_NOTIFY_LIST`: comma-separated NL Portal backend base URLs, e.g. `https://portal-backend.internal`.
- `CONFIG_NOTIFY_CLIENT_SCOPE`: comma separated.
- The timeouts apply to the token request and to each NL Portal call. Notify runs during the save, so a slow identity
  provider or NL Portal delays the save by at most these timeouts.
- With an existing Secret, set the client secret via key `CONFIG_NOTIFY_CLIENT_SECRET`.

## Configure

1. At your identity provider, register a confidential client for the panel with the client-credentials grant (in
   Keycloak: client authentication on, service accounts on, standard flow off).
2. Grant that client the authority NL Portal requires for its actuator (default: realm role `ROLE_ACTUATOR` on the
   client's service account). Don't grant it to people.
3. In NL Portal, turn on actuator access: set its actuator JWKS URI to the JWKS of the realm behind
   `CONFIG_NOTIFY_CLIENT_TOKEN_URI`. Without it, NL Portal denies refresh and restart. Refer to the NL Portal 4.0.0
   documentation on actuator access.
4. Set `CONFIG_NOTIFY_ENABLED=true`, `CONFIG_NOTIFY_LIST` and the `CONFIG_NOTIFY_CLIENT_*` variables, and restart the
   panel.

## Examples

| Identity provider | `CONFIG_NOTIFY_CLIENT_TOKEN_URI` | `CONFIG_NOTIFY_CLIENT_SCOPE` |
|---|---|---|
| Keycloak | `https://<host>/realms/<realm>/protocol/openid-connect/token` | empty (role in the token) |
| Entra ID | `https://login.microsoftonline.com/<tenant>/oauth2/v2.0/token` | `api://<NL Portal app id>/.default` |
| Scope-based (Okta, Auth0, Zitadel, Keycloak) | the provider's token endpoint | `nl-portal-actuator`, matching NL Portal's settings |

The Docker Compose example uses the `nl-portal-m2m` client of the `nlportalconfig` realm, whose service account has
`ROLE_ACTUATOR`.

## Verify

- Change a setting in the panel. NL Portal logs a refresh; the panel logs no WARN.
- Toggle a feature. NL Portal restarts.

## Troubleshooting

All notify failures are logged at WARN as `Failed to refresh NL Portal at <url>: <reason>` or
`Failed to restart NL Portal at <url>: <reason>`.

| Symptom | Fix |
|---|---|
| Startup fails: `[CONFIG_NOTIFY_CLIENT_TOKEN_URI, ...] required when CONFIG_NOTIFY_ENABLED=true` | Set the listed variables, or set `CONFIG_NOTIFY_ENABLED=false`. |
| WARN with `[invalid_client]` or another OAuth2 error | The token request failed. Check the token URI, client id and secret. |
| WARN with `401 Unauthorized` | NL Portal doesn't accept the token. Check NL Portal's actuator JWKS URI: it must belong to the realm of `CONFIG_NOTIFY_CLIENT_TOKEN_URI`. |
| WARN with `403 Forbidden` | The token lacks NL Portal's actuator authority. Grant the role (or scope) to the panel's client. |
| WARN with `Read timed out` or `Connect timed out` | NL Portal or the identity provider didn't answer in time. Check that the URL is reachable from the panel. |
