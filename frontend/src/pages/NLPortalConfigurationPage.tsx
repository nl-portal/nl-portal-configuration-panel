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
import { FormattedMessage } from "react-intl";
import { Heading2, Paragraph } from "@gemeente-denhaag/typography";
import styles from "./NLPortalConfigurationPage.module.scss";
import ConfigurationList from "../components/ConfigurationList.tsx";
import { features } from "../constants/features.tsx";
import PageGrid from "../components/PageGrid.tsx";
import { themes } from "../constants/themes.tsx";

const NLPortalConfigurationPage = () => {
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
      <div>
        <ConfigurationList
          configurationKey={"theme"}
          entries={themes.map(
            (themeSettings) => themeSettings.themeConfigurationId,
          )}
        />
      </div>
      <div>
        <ConfigurationList
          configurationKey={"features"}
          entries={features.map((feat) => feat.featureId)}
        />
      </div>
    </PageGrid>
  );
};

export default NLPortalConfigurationPage;
