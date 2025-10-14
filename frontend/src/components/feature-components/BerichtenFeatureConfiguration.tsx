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
import { Fragment, useEffect, useState } from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { Heading4, Paragraph } from "@gemeente-denhaag/typography";
import { FormattedMessage } from "react-intl";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { ConfigurationForm } from "../ConfigurationForm.tsx";
import { useForm } from "react-hook-form";
import styles from "../../styles/Configuration.module.scss";
import { TextInput } from "@gemeente-denhaag/text-input";

interface BerichtenConfiguration {
  properties?: {
    "bericht-object-type-url"?: string;
  };
}

interface BerichtenFeatureConfigurationProps extends FeatureConfigurationProps {
  prefillConfiguration?: BerichtenConfiguration;
}

const BerichtenFeatureConfiguration = ({
  prefillConfiguration,
  onChange,
  onSubmit,
}: BerichtenFeatureConfigurationProps) => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<BerichtenConfiguration>(prefillConfiguration || {});
  const {
    register,
    reset,
    formState,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<BerichtenConfiguration>({
    defaultValues: { ...prefillConfiguration },
  });

  useEffect(() => {
    if (prefillConfiguration) reset(prefillConfiguration);
  }, [prefillConfiguration, reset]);

  useEffect(() => {
    if (
      onChange &&
      currentConfiguration &&
      formState.isDirty &&
      formState.isValid
    ) {
      onChange(currentConfiguration);
    }
  }, [currentConfiguration, formState.isDirty, formState.isValid, onChange]);

  return (
    <ConfigurationForm
      className={styles["feature-config__form"]}
      onChange={() => {
        setCurrentConfiguration(getFormValue());
      }}
      onSubmit={handleSubmit(() => onSubmit)}
      children={
        <Fragment>
          <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
            <Heading4>
              <FormattedMessage
                id={"features.feature.configuration.properties"}
              ></FormattedMessage>
            </Heading4>
          </FieldsetLegend>
          <FormField
            label={
              <FormLabel htmlFor={"bericht-object-type-url"}>
                <FormattedMessage
                  id={"features.berichten.bericht-object-type-url"}
                />
              </FormLabel>
            }
            description={
              <Paragraph>
                <FormattedMessage
                  id={"features.berichten.bericht-object-type-url.description"}
                />
              </Paragraph>
            }
          >
            <TextInput
              {...register("properties.bericht-object-type-url")}
              id="bericht-object-type-url"
              type="url"
            />
          </FormField>
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default BerichtenFeatureConfiguration;
