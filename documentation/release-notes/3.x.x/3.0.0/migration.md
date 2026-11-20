# Upgrading from 2.x

Configuration panel 3.0.0 keeps serving NL Portal 3.x instances during the upgrade, so you can upgrade the panel first
and NL Portal at your own pace. NL Portal 4.0 depends on panel 3.0.0, and NL Portal 3.x can't read encrypted values:
upgrade the panel first with encryption off, and turn encryption on in both apps once every NL Portal instance runs 4.0.

1. **Give panel users the admin role**\
   Give panel users the realm role `ROLE_CONFIG_PANEL_ADMIN`, or configure your own roles, before you upgrade. Without
   an allowed role, users can't use the panel. See [Admin access](../../../configuration/admin-access.md).\
   If you use the opt-in role check from 2.1.0: `CONFIG_SECURITY_API_AUTHORITIES` and
   `CONFIG_SECURITY_JWT_AUTHORITIES_CLAIM_NAME` carry over. If you used its default `ROLE_ADMIN`, set
   `CONFIG_SECURITY_API_AUTHORITIES=ROLE_ADMIN` or give users the new role. `CONFIG_SECURITY_API_AUTHORITIES_ENABLED`
   is no longer read; the check is always on.

2. **Upgrade the panel with encryption off**\
   Upgrade the configuration panel to 3.0.0 with `CONFIG_ENCRYPTION_ENABLED=false`. On first start it copies the
   settings that moved in NL Portal 4.0 to their new keys, as they are, and keeps the old keys. NL Portal 3.x instances
   keep reading the old keys, NL Portal 4.0 instances read the new ones. Notify to an NL Portal 3.x instance fails
   (logged as a WARN); saves still work.

3. **Check every configuration section**\
   Look for broken or outdated values. Values are copied unchanged, empty ones included: an empty document status
   whitelist, for example, hides every document in NL Portal 4.0 just as it did in 3.x.

4. **Upgrade NL Portal**\
   Upgrade your NL Portal instances to 4.0. Refer to the NL Portal 4.0 release notes.

5. **Turn on encryption**\
   Once every connected NL Portal instance runs 4.0: first in NL Portal, then set `CONFIG_ENCRYPTION_KEY` (the same
   key), remove `CONFIG_ENCRYPTION_ENABLED` and restart the panel. See
   [Encryption](../../../configuration/encryption.md).

6. **Set up notify**\
   To use notify, set the `CONFIG_NOTIFY_CLIENT_*` variables. See [Notify NL Portal](../../../configuration/notify.md).

7. **Delete the old keys**\
   Delete them from the notice on the panel's main page. Deleting doesn't notify NL Portal: an instance still on 3.x
   keeps the deleted values until it restarts, and only then loses them.

| Setting                            | NL Portal 3.x key (kept)             | NL Portal 4.0 key (copied)   |
|------------------------------------|--------------------------------------|------------------------------|
| Document confidentiality whitelist | Zaken API (`zaak-documenten-config`) | Documenten APIs              |
| Document status whitelist          | Zaken API (`zaak-documenten-config`) | Documenten APIs              |
| Theme logo and style               | `nl-portal.config.theme.*`           | `nl-portal.frontend.theme.*` |

Until you delete the old keys, changes to these settings in the panel reach NL Portal 4.0 only.

Direct payment profile languages are converted automatically from `nl-NL` / `en-GB` to `nl_NL` / `en_GB`, the format
Worldline and NL Portal use (also NL Portal 3.x's default).
