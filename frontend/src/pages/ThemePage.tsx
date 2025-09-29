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
import { Heading2, Heading4 } from "@gemeente-denhaag/typography";
import PageGrid from "../components/PageGrid.tsx";
import BackLink from "../components/BackLink.tsx";
import { paths } from "../constants/paths.ts";
import { useNavigate, useParams } from "react-router-dom";
import { themes } from "../constants/themes.tsx";
import { useEffect } from "react";
import styles from "../styles/Configuration.module.scss";

const ThemePage = () => {
  const { themeConfigurationId } = useParams();
  const navigate = useNavigate();
  const theme = themes.find(
    (it) => it.themeConfigurationId == themeConfigurationId,
  );

  useEffect(() => {
    if (!theme) navigate(paths.configuration);
  }, []);

  return (
    <PageGrid>
      <PageHeader>
        <BackLink
          href={paths.configuration}
          children={
            <Heading4>
              <FormattedMessage id={"action.back"}></FormattedMessage>
            </Heading4>
          }
        ></BackLink>
        <div className={styles["feature-config__header"]}>
          <Heading2>
            <FormattedMessage id={"theme." + themeConfigurationId} />
          </Heading2>
        </div>
      </PageHeader>
      {theme?.themeConfigurationComponent && (
        <theme.themeConfigurationComponent />
      )}
    </PageGrid>
  );
};
export default ThemePage;
