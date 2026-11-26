# Connecting NL Portal

NL Portal reads its configuration from the panel's configuration server. These are the settings on both sides.

## Settings

On the panel:

| Env var | Purpose |
|---|---|
| `CONFIG_SERVER_TOKEN` | Token NL Portal sends to the configuration server |
| `CONFIG_SERVER_PREFIX` | Base path of the configuration server, e.g. `/configuration` |
| `CONFIG_ENCRYPTION_KEY` | See [Encryption](encryption.md) |
| `CONFIG_NOTIFY_*` | See [Notify NL Portal](notify.md) |

On NL Portal:

| Env var | Purpose |
|---|---|
| `CONFIGURATION_PANEL_ENABLED` | `true` |
| `CONFIGURATION_PANEL_URI` | The panel's configuration server, e.g. `http://config-panel:8090/configuration` |
| `CONFIGURATION_PANEL_TOKEN` | Same value as the panel's `CONFIG_SERVER_TOKEN` |
| `CONFIGURATION_PANEL_APPLICATION_NAME` | Same value as the panel frontend's `CLIENT_APPLICATION_NAME`, e.g. `nl-portal-app` |
| `CONFIGURATION_PANEL_ENCRYPTION_KEY` | Same value as the panel's `CONFIG_ENCRYPTION_KEY` |
| `NLPORTAL_SECURITY_ACTUATOR_JWKSETURI` | Only for [notify](notify.md): turns on NL Portal's actuator access |

For NL Portal's side, refer to the NL Portal documentation for the version you run.

## Configure

1. Generate the configuration server token and the encryption key (`openssl rand -base64 32`).
2. Set the panel's variables and start the panel.
3. Set NL Portal's variables and start NL Portal.
4. Optional: set up [notify](notify.md).

To adapt the Docker Compose example, change [imports/backend.env](../../imports/backend.env) and
[imports/frontend.env](../../imports/frontend.env). When NL Portal's compose stack joins this stack's network, NL Portal
reaches the panel at `http://configuration-panel:8090/configuration`.

## Verify

- NL Portal's startup log shows it fetched its configuration from the panel's URI.
- A setting saved in the panel shows up in NL Portal after a refresh or restart.

## Troubleshooting

| Symptom | Fix |
|---|---|
| NL Portal starts without the panel's settings | Check `CONFIGURATION_PANEL_URI`, `CONFIGURATION_PANEL_TOKEN` and that `CONFIGURATION_PANEL_APPLICATION_NAME` matches the panel's application name. |
| NL Portal fails to start with a decrypt error | See [Encryption](encryption.md#troubleshooting). |
