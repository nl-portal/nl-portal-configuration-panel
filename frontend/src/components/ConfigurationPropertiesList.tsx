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

import styles from "./ConfigurationPropertiesList.module.scss";
import { Paragraph } from "@gemeente-denhaag/typography";
import Skeleton from "react-loading-skeleton";
import Table, { CellObject } from "./Table.tsx";

interface ConfigProperty {
  propertyKey: string;
  propertyValue: string;
  application: string;
  modifiedOn: Date;
}

interface Props {
  loading?: boolean;
  error?: boolean;
  errorTranslationId?: string;
  showEmpty?: boolean;
  emptyTranslationId?: string;
  titleTranslationId?: string | null;
  readMoreLink?: string;
  readMoreTranslationId?: string | null;
  totalAmount?: number;
  configurationProperties?: ConfigProperty[];
  index?: number;
  indexLimit?: number;
  onChange?: (index: number) => number;
}

const ConfigurationPropertiesList = ({
  loading,
  error,
  showEmpty = true,
  configurationProperties,
}: Props) => {
  if (loading) {
    return (
      <section className={styles["configurations-list"]}>
        <Skeleton height={60} />
      </section>
    );
  }

  if (error)
    return (
      <section className={styles["configurations-list"]}>
        <Paragraph>Failed to load Configuration Properties</Paragraph>
      </section>
    );

  if (!configurationProperties || configurationProperties.length === 0) {
    if (!showEmpty) return null;
    return (
      <section className={styles["configurations-list"]}>
        <Paragraph>Nothing found</Paragraph>
      </section>
    );
  }

  return (
    <section className={styles["configurations-list"]}>
      <Table
        headers={[
          {
            key: "propertyKey",
            head: true,
            children: (
              <Paragraph>
                <b>Property Key</b>
              </Paragraph>
            ),
          },
          {
            key: "propertyValue",
            head: true,
            children: (
              <Paragraph>
                <b>Property Value</b>
              </Paragraph>
            ),
          },
        ]}
        rows={
          Object.values(configurationProperties).map(
            ({ propertyKey, propertyValue }) => [
              <Paragraph>{propertyKey}</Paragraph>,
              <Paragraph>{propertyValue}</Paragraph>,
            ],
          ) as unknown as CellObject[][]
        }
      />
    </section>
  );
};

export default ConfigurationPropertiesList;
