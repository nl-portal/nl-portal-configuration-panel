# Admin access

Every REST API request needs a valid token (checked against `JWKS_URI`) with one of the configured roles. Without a
token the API returns `401`, without an allowed role `403`.

## Settings

| Env var | Helm value (`nl-portal-configpanel-backend`) | Default | Required |
|---|---|---|---|
| `CONFIG_SECURITY_API_AUTHORITIES` | `settings.auth.authorities` | `ROLE_CONFIG_PANEL_ADMIN` | no |
| `CONFIG_SECURITY_JWT_AUTHORITIES_CLAIM_NAME` | `settings.auth.authoritiesClaimExpression` | `['realm_access']['roles']` | no |

- `CONFIG_SECURITY_API_AUTHORITIES`: comma separated; any of them grants access. Roles are matched exactly as they are
  in the token, no prefix is added. Set to an empty value, nobody can use the REST API. The configuration server keeps
  serving NL Portal.
- `CONFIG_SECURITY_JWT_AUTHORITIES_CLAIM_NAME`: where the roles are in the token, as a SpEL expression with every key
  quoted. Several expressions can be combined, comma separated.

## Configure

1. Use a realm (or tenant) of its own for the panel's users.
2. Create the role `ROLE_CONFIG_PANEL_ADMIN`, or pick your own and set `CONFIG_SECURITY_API_AUTHORITIES` to it.
3. Assign the role to the people who manage NL Portal's configuration.
4. If the role is not a realm role, set `CONFIG_SECURITY_JWT_AUTHORITIES_CLAIM_NAME` (see the examples).

## Examples

| Role type | `CONFIG_SECURITY_JWT_AUTHORITIES_CLAIM_NAME` |
|---|---|
| Keycloak realm role (default) | `['realm_access']['roles']` |
| Keycloak client role | `['resource_access']['<client-id>']['roles']` |
| Entra ID app role | `['roles']` |

In the Docker Compose example, user `admin` has the realm role `ROLE_CONFIG_PANEL_ADMIN` and user `test` has none.
Keycloak only imports the realm when it doesn't exist yet; after changing `imports/keycloak`, run
`docker compose up -d --force-recreate keycloak keycloak-database`.

## Verify

- Log in with a user that has the role: the panel's main page loads.
- Log in with a user without it: the panel shows an error page that refers the user to their system administrator.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Every user gets the error page after login | The token doesn't contain an allowed role. Check the role assignment and `CONFIG_SECURITY_JWT_AUTHORITIES_CLAIM_NAME`. |
| Startup log: `configuration-panel.security.authorities is empty: nobody can use the REST API` | Set `CONFIG_SECURITY_API_AUTHORITIES`. |
