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

import { FormattedMessage } from "react-intl";
import { Link } from "@gemeente-denhaag/link";
import { Paragraph } from "@gemeente-denhaag/typography";
import { SettingsIcon } from "@gemeente-denhaag/icons";
import PortalLink from "./PortalLink.tsx";
import styles from "./ConfigurationList.module.scss";
import Table from "./Table.tsx";

export interface ConfigurationListEntry {
  id: string;
  href: string;
  label: string;
  hintKey?: string;
}

interface ConfigurationListProps {
  titleKey: string;
  entries: ConfigurationListEntry[];
}

const ConfigurationList = ({ titleKey, entries }: ConfigurationListProps) => {
  return (
    <div className={styles["configuration-list"]}>
      <Table
        headers={[
          {
            key: titleKey,
            head: true,
            children: (
              <Paragraph>
                <b>
                  <FormattedMessage id={titleKey} />
                </b>
              </Paragraph>
            ),
          },
          // Second header cell, so the header line spans both columns.
          { head: true, className: styles["configuration-list__action"] },
        ]}
        rows={entries.map((entry) => [
          <span key={`${entry.id}-label`}>
            <Paragraph>
              {entry.label}
              {entry.hintKey && (
                <>
                  {" "}
                  <small className={styles["configuration-list__hint"]}>
                    (<FormattedMessage id={entry.hintKey} />)
                  </small>
                </>
              )}
            </Paragraph>
          </span>,
          {
            className: styles["configuration-list__action"],
            children: (
              <Link
                href={entry.href}
                icon={<SettingsIcon />}
                Link={PortalLink}
                iconAlign="end"
              >
                <Paragraph>
                  <FormattedMessage id={`configuration.configure`} />
                </Paragraph>
              </Link>
            ),
          },
        ])}
      />
    </div>
  );
};

export default ConfigurationList;
