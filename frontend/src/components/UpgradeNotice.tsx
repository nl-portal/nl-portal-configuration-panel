/*
 * Copyright 2025 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState } from "react";
import _ from "lodash";
import { FormattedMessage, useIntl } from "react-intl";
import { Alert } from "@gemeente-denhaag/alert";
import { Button } from "@gemeente-denhaag/button";
import { IconButton } from "@gemeente-denhaag/iconbutton";
import { TrashIcon } from "@gemeente-denhaag/icons";
import { Paragraph } from "@gemeente-denhaag/typography";
import useRetiredConfiguration from "../hooks/useRetiredConfiguration.tsx";
import styles from "./UpgradeNotice.module.scss";

interface VersionNoticeProps {
  version: string;
  propertyKeys: string[];
  busy: boolean;
  onDeleteKey: (propertyKey: string) => void;
  onDeleteVersion: (version: string) => void;
}

const VersionNotice = ({
  version,
  propertyKeys,
  busy,
  onDeleteKey,
  onDeleteVersion,
}: VersionNoticeProps) => {
  const intl = useIntl();
  const [confirming, setConfirming] = useState(false);

  return (
    <Alert
      variant="warning"
      title={intl.formatMessage({ id: "upgrade-notice.title" })}
      text={
        <div className={styles["upgrade-notice"]}>
          <Paragraph>
            <FormattedMessage id="upgrade-notice.body" values={{ version }} />
          </Paragraph>
          <ul className={styles["upgrade-notice__keys"]}>
            {propertyKeys.map((propertyKey) => (
              <li key={propertyKey} className={styles["upgrade-notice__key"]}>
                <code>{propertyKey}</code>
                <IconButton
                  type="button"
                  aria-label={intl.formatMessage(
                    { id: "upgrade-notice.delete-key" },
                    { propertyKey },
                  )}
                  disabled={busy}
                  onClick={() => onDeleteKey(propertyKey)}
                >
                  <TrashIcon />
                </IconButton>
              </li>
            ))}
          </ul>
          <div className={styles["upgrade-notice__actions"]}>
            {confirming ? (
              <>
                <Button
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setConfirming(false);
                    onDeleteVersion(version);
                  }}
                >
                  <FormattedMessage id="upgrade-notice.confirm-delete" />
                </Button>
                <Button
                  type="button"
                  variant="secondary-action"
                  onClick={() => setConfirming(false)}
                >
                  <FormattedMessage id="action.cancel" />
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="secondary-action"
                disabled={busy}
                onClick={() => setConfirming(true)}
              >
                <FormattedMessage id="upgrade-notice.delete-all" />
              </Button>
            )}
          </div>
        </div>
      }
    />
  );
};

/** Lists configuration kept for older NL Portal versions, one warning per version. */
const UpgradeNotice = () => {
  const {
    getRetiredKeys: { data: retiredKeys },
    deleteRetiredKey,
    deleteRetiredVersion,
  } = useRetiredConfiguration();

  if (!retiredKeys || retiredKeys.length === 0) return null;

  const byVersion = _.groupBy(retiredKeys, (it) => it.retiredIn);
  const busy = deleteRetiredKey.isPending || deleteRetiredVersion.isPending;

  return (
    <section className={styles["upgrade-notices"]}>
      {Object.entries(byVersion).map(([version, keys]) => (
        <VersionNotice
          key={version}
          version={version}
          propertyKeys={keys.map((it) => it.propertyKey)}
          busy={busy}
          onDeleteKey={(propertyKey) => deleteRetiredKey.mutate(propertyKey)}
          onDeleteVersion={(retiredIn) =>
            deleteRetiredVersion.mutate(retiredIn)
          }
        />
      ))}
    </section>
  );
};

export default UpgradeNotice;
