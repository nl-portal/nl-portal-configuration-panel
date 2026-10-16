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

import { ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FieldSpec } from "../../interfaces/ConfigSection.ts";
import { formatDefault } from "../../utils/formatDefault.ts";
import styles from "./ConfigFields.module.scss";

interface LabeledFieldProps {
  field: FieldSpec;
  inputId: string;
  error?: ReactNode;
  children: ReactNode;
}

const LabeledField = ({
  field,
  inputId,
  error,
  children,
}: LabeledFieldProps) => {
  const intl = useIntl();

  return (
    <FormField
      label={
        <FormLabel htmlFor={inputId}>
          <FormattedMessage id={field.labelKey} />
        </FormLabel>
      }
      description={
        <>
          {field.descriptionKey && (
            <Paragraph>
              <FormattedMessage id={field.descriptionKey} />
            </Paragraph>
          )}
          <Paragraph className={styles["config-field__default"]}>
            <FormattedMessage
              id="defaults.label"
              values={{ value: formatDefault(intl, field) }}
            />
          </Paragraph>
        </>
      }
      errorMessage={error}
      invalid={!!error}
    >
      {children}
    </FormField>
  );
};

export default LabeledField;
