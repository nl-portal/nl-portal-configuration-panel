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
import styles from "./ConfigurationList.module.scss";
import { Link } from "@gemeente-denhaag/link";
import { Paragraph } from "@gemeente-denhaag/typography";
import { SettingsIcon } from "@gemeente-denhaag/icons";
import Table, { CellObject } from "./Table.tsx";
import PortalLink from "./PortalLink.tsx";

interface ConfigurationListProps {
  configurationKey: string;
  entries: string[];
}

const ConfigurationList = ({
  configurationKey,
  entries,
}: ConfigurationListProps) => {
  return (
    <Table
      headers={[
        {
          key: configurationKey,
          head: true,
          children: (
            <Paragraph>
              <b>
                <FormattedMessage id={`configuration.${configurationKey}`} />
              </b>
            </Paragraph>
          ),
        },
      ]}
      rows={
        entries.map((entryId) => [
          <span className={styles["configuration-list__header"]}>
            <Paragraph>
              <FormattedMessage id={`${configurationKey}.${entryId}`} />
            </Paragraph>
          </span>,
          <Link
            href={`/${configurationKey}/${entryId}`}
            icon={<SettingsIcon />}
            Link={PortalLink}
            iconAlign="end"
          >
            <div className={styles["configuration-list__value-edit"]}>
              <Paragraph>
                <FormattedMessage id={`configuration.configure`} />
              </Paragraph>
            </div>
          </Link>,
        ]) as unknown as CellObject[][]
      }
    />
  );
};

export default ConfigurationList;
