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

import { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { Heading3 } from "@gemeente-denhaag/typography";
import {
  EditableSection,
  sectionFieldGroups,
} from "../interfaces/ConfigSection.ts";
import FieldRenderer from "./config-fields/FieldRenderer.tsx";
import styles from "../styles/Configuration.module.scss";

interface SectionRendererProps {
  section: EditableSection;
  values: object;
  onChange: (path: string, value: unknown) => void;
}

/** Renders a section's fields from its schema. */
const SectionRenderer = ({
  section,
  values,
  onChange,
}: SectionRendererProps) => {
  const groups = sectionFieldGroups(section);

  return (
    <form
      id="configuration-form"
      className={styles["feature-config__form"]}
      onSubmit={(e) => e.preventDefault()}
    >
      {groups
        .filter((group) => group.fields.length > 0)
        .map((group, index) => (
          <Fragment key={`${group.titleKey}-${index}`}>
            <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
              <Heading3>
                <FormattedMessage id={group.titleKey} />
              </Heading3>
            </FieldsetLegend>
            {group.fields.map(({ path, field }) => (
              <FieldRenderer
                key={path}
                field={field}
                path={path}
                values={values}
                onChange={onChange}
              />
            ))}
          </Fragment>
        ))}
    </form>
  );
};

export default SectionRenderer;
