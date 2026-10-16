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

import { PageHeader } from "@gemeente-denhaag/page";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { Heading2, Paragraph } from "@gemeente-denhaag/typography";
import styles from "./NLPortalConfigurationPage.module.scss";
import ConfigurationList, {
  ConfigurationListEntry,
} from "../components/ConfigurationList.tsx";
import PageGrid from "../components/PageGrid.tsx";
import UpgradeNotice from "../components/UpgradeNotice.tsx";
import {
  frontendSections,
  moduleSections,
  themeSections,
} from "../constants/sections.tsx";
import { paths } from "../constants/paths.ts";
import {
  ConfigSection,
  ConfigSectionKind,
  sectionTitle,
} from "../interfaces/ConfigSection.ts";

const toEntry = (
  intl: IntlShape,
  section: ConfigSection,
): ConfigurationListEntry => ({
  id: section.id,
  href:
    section.kind === ConfigSectionKind.THEME
      ? paths.theme(section.id)
      : paths.feature(section.id),
  label: sectionTitle(intl, section),
  hintKey: section.hintKey,
});

const NLPortalConfigurationPage = () => {
  const intl = useIntl();
  const features = [...moduleSections].sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  return (
    <PageGrid>
      <PageHeader>
        <Heading2>
          <FormattedMessage id="configuration.title" />
        </Heading2>
      </PageHeader>
      <Paragraph className={styles["features__sub-header"]}>
        <FormattedMessage id="configuration.subtitle" />
      </Paragraph>
      <UpgradeNotice />
      <ConfigurationList
        titleKey="configuration.portal-interface"
        entries={[...frontendSections, ...themeSections].map((section) =>
          toEntry(intl, section),
        )}
      />
      <ConfigurationList
        titleKey="configuration.features"
        entries={features.map((section) => toEntry(intl, section))}
      />
    </PageGrid>
  );
};

export default NLPortalConfigurationPage;
