# Encryption

The panel stores configuration values encrypted (AES-256-GCM) and serves them encrypted, as `{cipher}…`. NL Portal
decrypts them with the same key. The panel's UI and API show plaintext.

## Settings

| Env var | Helm value (`nl-portal-configpanel-backend`) | Default | Required |
|---|---|---|---|
| `CONFIG_ENCRYPTION_ENABLED` | `settings.app.encryption.enabled` | `true` | no |
| `CONFIG_ENCRYPTION_KEY` | `settings.app.encryption.key` (Secret) | none | when encryption is enabled |

- The key is a Base64-encoded 32-byte key. NL Portal's `CONFIGURATION_PANEL_ENCRYPTION_KEY` must have the same value.
- With an existing Secret, set the key via key `CONFIG_ENCRYPTION_KEY`.

## Configure

1. Generate a key: `openssl rand -base64 32`.
2. Store it with your database backups. Without it the stored values can't be recovered.
3. Set it in NL Portal. Refer to the NL Portal documentation for the version you run.
4. Set `CONFIG_ENCRYPTION_KEY` in the panel and restart it. On startup the panel encrypts every value that is still
   plaintext.

### Turn encryption off

1. Set `CONFIG_ENCRYPTION_ENABLED=false` and keep `CONFIG_ENCRYPTION_KEY`. Restart the panel: it decrypts every value.
2. Restart NL Portal while it still has its key, so it reads the plaintext values.
3. Set NL Portal's `CONFIGURATION_PANEL_ENCRYPTION_ENABLED=false`, then remove the key from both apps.

## Verify

- The panel's startup log shows `Encrypted <n> configuration values`.
- In the database, `SELECT property_value FROM nlp_configuration` shows values starting with `{cipher}`.
- `curl -H 'X-Config-Token: <CONFIG_SERVER_TOKEN>' <panel>/configuration/<application>/default` shows `{cipher}…`
  values.
- The panel's UI shows the plaintext values, and NL Portal starts with them.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Startup fails: `CONFIG_ENCRYPTION_KEY is required; set CONFIG_ENCRYPTION_ENABLED=false to opt out` | Set the key, or turn encryption off. |
| Startup fails: `CONFIG_ENCRYPTION_KEY must be Base64` | Use the output of `openssl rand -base64 32` as is. |
| Startup fails: `CONFIG_ENCRYPTION_KEY must be a Base64-encoded 32-byte (AES-256) key, got <n> bytes` | Generate a new key with `openssl rand -base64 32`. |
| Startup fails: `<n> encrypted configuration values found; set CONFIG_ENCRYPTION_KEY to decrypt them or re-enable encryption` | Encryption is off but the database still has encrypted values. Set the key once so the panel decrypts them, or turn encryption back on. |
| Reading settings fails with `Cannot decrypt configuration value: CONFIG_ENCRYPTION_KEY is not the key it was encrypted with` | The key changed. Restore the original key. |
| NL Portal fails to start with a decrypt error | NL Portal's key differs from the panel's. Set the same value in both. |
