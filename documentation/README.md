# Configuration Panel

The Configuration Panel is an admin application for NL Portal. Admins use it to configure NL Portal's backend modules,
portal interface and theme. NL Portal reads the settings from the panel's configuration server at startup and on
refresh.

> [!WARNING]
> Do not expose the Configuration Panel to the public internet. The frontend and REST API belong on an internal network
> or behind a WAF. The configuration server (`CONFIG_SERVER_PREFIX`) is for NL Portal only.

## Pages

| Page | What it covers |
|---|---|
| [Environment variables](configuration/environment-variables.md) | Every setting of the backend and frontend |
| [Admin access](configuration/admin-access.md) | Which users can use the panel |
| [Allowed property keys](configuration/allowed-property-keys.md) | Which keys the panel manages and serves |
| [Notify NL Portal](configuration/notify.md) | Refresh or restart NL Portal after a change |
| [Encryption](configuration/encryption.md) | Encrypted values in the database and on the way to NL Portal |
| [Connecting NL Portal](configuration/connecting-nl-portal.md) | Pointing an NL Portal instance at the panel |
