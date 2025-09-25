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
import Fieldset, { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { FormattedMessage } from "react-intl";
import { Heading3, Paragraph } from "@gemeente-denhaag/typography";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import styles from "../../styles/Configuration.module.scss";
import { RadioButton } from "@gemeente-denhaag/radio-button";
import ConfigurationForm from "../ConfigurationForm.tsx";
import { useForm } from "react-hook-form";
import TextInput from "@gemeente-denhaag/text-input";

interface ClamAVConfiguration {
  enabled?: string;
  properties?: {
    "host-name": string;
    port: number;
  };
}

interface ClamAVFeatureConfigurationProps extends FeatureConfigurationProps {
  prefillConfiguration?: ClamAVConfiguration;
}

const ClamAVFeatureConfiguration = ({
  prefillConfiguration,
  onChange,
  onSubmit,
}: ClamAVFeatureConfigurationProps) => {
  const [currentConfiguration, setCurrentConfiguration] = useState<
    ClamAVConfiguration | undefined
  >(prefillConfiguration);
  const {
    register,
    watch,
    reset,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<ClamAVConfiguration>({
    defaultValues: {
      enabled: "false",
      properties: {},
      ...prefillConfiguration,
    },
  });

  useEffect(() => {
    if (prefillConfiguration) {
      setCurrentConfiguration(prefillConfiguration);
      reset(prefillConfiguration);
    }
  }, [prefillConfiguration]);

  useEffect(() => {
    if (onChange && currentConfiguration) {
      onChange(currentConfiguration);
      reset(currentConfiguration);
    }
  }, [currentConfiguration]);

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
            <Heading3>
              <FormattedMessage
                id={"features.payment.ogone.configuration"}
              ></FormattedMessage>
            </Heading3>
          </FieldsetLegend>
          <Fieldset role={"radiogroup"}>
            <FormField
              className={styles["form-field__radio-option"]}
              type="radio"
              label={
                <FormLabel htmlFor={"enabled.true"}>
                  <FormattedMessage
                    id={"features.feature.enabled.true"}
                  ></FormattedMessage>
                </FormLabel>
              }
            >
              <RadioButton
                {...register("enabled")}
                className="utrecht-form-field__input"
                id={"enabled.true"}
                value={"true"}
              />
            </FormField>
            <FormField
              className={styles["form-field__radio-option"]}
              type="radio"
              label={
                <FormLabel htmlFor={"enabled.false"}>
                  <FormattedMessage
                    id={"features.feature.enabled.false"}
                  ></FormattedMessage>
                </FormLabel>
              }
            >
              <RadioButton
                {...register("enabled")}
                className="utrecht-form-field__input"
                id={"enabled.false"}
                value={"false"}
              />
            </FormField>
          </Fieldset>
          {watch("enabled") === "true" && (
            <Fragment>
              <FormField
                label={
                  <FormLabel htmlFor={"host-name"}>
                    <FormattedMessage
                      id={"features.virusscan.clamav.hostname"}
                    />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.virusscan.clamav.hostname.description"}
                    />
                  </Paragraph>
                }
              >
                <TextInput
                  {...register("properties.host-name")}
                  id={"host-name"}
                />
              </FormField>
              <FormField
                label={
                  <FormLabel htmlFor={"port"}>
                    <FormattedMessage id={"features.virusscan.clamav.port"} />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.virusscan.clamav.port.description"}
                    />
                  </Paragraph>
                }
              >
                <TextInput
                  {...register("properties.port")}
                  id={"port"}
                  type={"number"}
                />
              </FormField>
            </Fragment>
          )}
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default ClamAVFeatureConfiguration;
