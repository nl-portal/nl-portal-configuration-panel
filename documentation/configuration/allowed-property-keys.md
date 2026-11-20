# Allowed property keys

The panel only reads, writes and deletes, and its configuration server only serves, property keys that start with one
of the allowed prefixes. Retired keys (listed in the notice on the panel's main page) can always be deleted.

## Settings

| Env var | Helm value (`nl-portal-configpanel-backend`) | Default | Required |
|---|---|---|---|
| `CONFIG_SECURITY_ALLOWED_KEY_PREFIXES` | `settings.app.security.allowedKeyPrefixes` | `nl-portal.config.,nl-portal.frontend.` | no |

Comma separated. Set to an empty value, any key can be read, written, deleted and served; the panel logs a warning at startup. The helm chart refuses an empty value.

## Configure

The default covers every key the panel manages. Only add a prefix if you add rows for other NL Portal properties to the
panel's database yourself.

## Verify

- Save a setting in the panel. The backend logs `User <user id> modified the following keys: [<keys>]`.
- `curl -H 'X-Config-Token: <CONFIG_SERVER_TOKEN>' <panel>/configuration/<application>/default` lists only keys under
  the allowed prefixes.

## Troubleshooting

| Symptom | Fix |
|---|---|
| A request returns `400` with `Property keys not allowed: [<keys>]`, log: `User <user id>: property keys [<keys>] denied` | The key is outside the allowed prefixes. Add its prefix to `CONFIG_SECURITY_ALLOWED_KEY_PREFIXES` if the panel should manage it. |
| Log: `Property key <key> in <source> is not allowed and is not served` | A row in the database is outside the allowed prefixes, so NL Portal doesn't get it and the panel doesn't show it. Remove the row from the database, or add its prefix. |
| Startup log: `configuration-panel.security.allowed-key-prefixes is empty: any property key can be read, written, deleted and served` | Set `CONFIG_SECURITY_ALLOWED_KEY_PREFIXES`, or leave it unset for the default. |
