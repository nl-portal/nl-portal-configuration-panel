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
import { FormattedMessage } from "react-intl";
import { Heading3, Paragraph } from "@gemeente-denhaag/typography";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import styles from "../../styles/Configuration.module.scss";
import ConfigurationForm from "../ConfigurationForm.tsx";
import { useForm } from "react-hook-form";
import { TextInput } from "@gemeente-denhaag/text-input";

interface ClamAVConfiguration {
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
    reset,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<ClamAVConfiguration>({
    defaultValues: {
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
                id={"features.feature.configuration.properties"}
              ></FormattedMessage>
            </Heading3>
          </FieldsetLegend>
          <Fragment>
            <FormField
              label={
                <FormLabel htmlFor={"host-name"}>
                  <FormattedMessage id={"features.virusscan.clamav.hostname"} />
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
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default ClamAVFeatureConfiguration;
