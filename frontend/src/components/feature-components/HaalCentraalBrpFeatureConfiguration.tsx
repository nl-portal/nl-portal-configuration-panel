import { Fragment, useEffect, useState } from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { FormattedMessage } from "react-intl";
import { Heading3, Paragraph } from "@gemeente-denhaag/typography";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import styles from "../../styles/Configuration.module.scss";
import { TextInput } from "@gemeente-denhaag/text-input";
import { useForm } from "react-hook-form";
import ConfigurationForm from "../ConfigurationForm.tsx";
import PasswordInput from "../PasswordInput.tsx";

interface HaalCentraalBrpConfiguration {
  properties?: {
    url?: string;
    "api-key"?: string;
  };
}

interface HaalCentraalBrpFeatureConfigurationProps
  extends FeatureConfigurationProps {
  prefillConfiguration?: HaalCentraalBrpConfiguration;
}

const HaalCentraalBrpFeatureConfiguration = ({
  prefillConfiguration,
  onSubmit,
  onChange,
}: HaalCentraalBrpFeatureConfigurationProps) => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<HaalCentraalBrpConfiguration>(prefillConfiguration || {});
  const {
    register,
    reset,
    formState,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<HaalCentraalBrpConfiguration>({
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
            <Heading3>
              <FormattedMessage
                id={"features.haalcentraal-brp.configuration"}
              ></FormattedMessage>
            </Heading3>
          </FieldsetLegend>
          <Fragment>
            <FormField
              label={
                <FormLabel htmlFor={"url"}>
                  <FormattedMessage id={"features.haalcentraal-brp.url"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.haalcentraal-brp.url.description"}
                  />
                </Paragraph>
              }
            >
              <TextInput {...register("properties.url")} id="url" type="url" />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"api-key"}>
                  <FormattedMessage id={"features.haalcentraal-brp.api-key"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.haalcentraal-brp.api-key.description"}
                  />
                </Paragraph>
              }
            >
              <PasswordInput {...register("properties.api-key")} id="api-key" />
            </FormField>
          </Fragment>
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default HaalCentraalBrpFeatureConfiguration;
