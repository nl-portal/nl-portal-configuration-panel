Configuration panel 3.0.0 is the configuration panel for NL Portal 4.0. Upgrading? See
[Migration](migration.md).

## New features

- **Verificatie, Form and portal interface settings**\
  Verificatie, Form, and the portal interface settings (feature toggles and texts of the end-user portal) can be
  configured. Every NL Portal 4.0 module can now be configured field by field.

## Breaking changes

- **REST API requires a role**\
  The default is the realm role `ROLE_CONFIG_PANEL_ADMIN`. Users without it get `403`. If you use the opt-in role check
  from 2.1.0: it is always on now, and its default role `ROLE_ADMIN` changed. See
  [Admin access](../../../configuration/admin-access.md).

- **Only NL Portal configuration keys are managed**\
  Only keys under `nl-portal.config.` and `nl-portal.frontend.` are read, written, deleted and served. Other keys get
  `400` and are no longer served to NL Portal. Retired keys can always be deleted. See
  [Allowed property keys](../../../configuration/allowed-property-keys.md).

- **Notify needs a client**\
  With `CONFIG_NOTIFY_ENABLED=true`, `CONFIG_NOTIFY_CLIENT_TOKEN_URI`, `_ID` and `_SECRET` are required, and NL Portal
  4.0.0 must accept the client's token on its actuator. See [Notify NL Portal](../../../configuration/notify.md).

- **Values are encrypted**\
  `CONFIG_ENCRYPTION_KEY` is required unless `CONFIG_ENCRYPTION_ENABLED=false`; NL Portal 4.0.0 needs the same key.
  NL Portal 3.x can't read encrypted values. See [Encryption](../../../configuration/encryption.md).

- **Panel settings override NL Portal's environment variables**\
  If you configured the portal interface or Verificatie through NL Portal's environment variables, saving those
  sections in the panel replaces them.

- **New default application name**\
  Examples now use `CLIENT_APPLICATION_NAME=nl-portal-app` (was `nl-portal-backend-libraries`). Configuration is stored
  per application name; if you used the old default, keep setting it.

- **Open Product settings must be entered again**\
  Configuration panel 2.0.0 saved them under a wrong key that no NL Portal version reads, so they are not copied. Enter
  them on the Open Product page. NL Portal 3.x reads the same key, so the settings apply to 3.x instances too.

- **Haal Centraal BRP and Ogone payment are removed**\
  They were removed from NL Portal 4.0. Their keys are listed in the notice for deletion.

- **An empty setting means NL Portal's default**\
  The panel no longer saves empty fields or lists. In 2.0.0 a cleared field was saved as empty: a cleared document
  status whitelist, for example, hid every document. In 3.0.0 clearing it brings back the default
  (`DEFINITIEF, GEARCHIVEERD`). Every field shows its default.

- **Both images run as a non-root user**\
  The backend runs as uid 1001, the frontend as uid 101. Check your `securityContext` and volume permissions. The
  frontend writes `config.js` on start, so it doesn't work with a read-only root filesystem.

## Deprecations

- **Product, DMN and Prefill**\
  Use Open Product.

## Under the hood

- **One registry for every configuration form**\
  The 18 hand-written feature forms are replaced by a single schema in `frontend/src/constants/sections.tsx`. A section
  is a list of typed fields (text, url, secret, number, toggle, enum, groups, SSL, named profiles, key-value maps,
  JSON), rendered by one shared component. Adding a module or a field is a data change, not a new form. Every field
  must declare NL Portal's default, so a missing default fails the build.

- **Prerequisites as data**\
  A section lists the sections it needs (`requires`); the panel warns when any of them is off.

- **Reusable upgrade path**\
  Moving keys for a new NL Portal version is a Liquibase changelog: it copies keys and marks the old ones with the
  version that stopped reading them. The notice on the main page and its delete actions work for any version, without
  panel code changes.

- **Up-to-date stack**\
  Spring Boot 4.1, Spring Cloud 5.0, Kotlin 2.4 and Gradle 9.8 on the backend; React 19.3, React Router 8,
  TypeScript 6, Vite 8, Node 24 and pnpm 11 on the frontend. The panel no longer depends on the `@nl-portal/*` npm
  packages. Images run on `eclipse-temurin:21-jre-noble` (Ubuntu 24.04, was Alpine) and `nginx-unprivileged` 1.31.9
  from `public.ecr.aws/nginx`.

## Security

- **For internal use only**\
  A reminder: the panel is for internal use only. See the README.

- **Encrypted values**\
  Configuration values are encrypted in the database and on their way to NL Portal.

- **Notify uses a service token**\
  Notify authenticates to NL Portal's actuator with a service token. People, panel admins included, can't call NL
  Portal's refresh or restart themselves.

- **Encryption endpoints disabled**\
  Spring Cloud Config's `/encrypt`, `/decrypt` and `/key` endpoints are disabled.

- **Tighter logging**\
  Credentials and configuration values no longer show in the logs at `DEBUG`.

- **No remote debug port**\
  Earlier backend images opened a remote debug port (8000). 3.0.0 images don't. Upgrade, or block port 8000, for every
  older backend image you run. To debug a 3.0.0 backend, add the agent through `JAVA_TOOL_OPTIONS`.

- **Dependencies updated**\
  Dependencies are updated to fix known vulnerabilities, including Spring Boot 4.1.2 and Spring Cloud Config 5.0.6 on
  the backend.

## Container images

- `ghcr.io/nl-portal/configuration-panel-backend:3.0.0`
- `ghcr.io/nl-portal/configuration-panel-frontend:3.0.0`

Releases are also tagged `3.0` and `3`; pin one of those. `latest` is the newest snapshot from `main`, not a release.
Images are signed with cosign:

```shell
cosign verify ghcr.io/nl-portal/configuration-panel-backend:3.0.0 \
  --certificate-identity "https://github.com/nl-portal/nl-portal-configuration-panel/.github/workflows/_build-app-image.yml@refs/heads/rc/3.0.0" \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```
