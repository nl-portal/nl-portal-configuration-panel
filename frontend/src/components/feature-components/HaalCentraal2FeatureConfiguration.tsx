import { Fragment, useEffect, useState } from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import Fieldset, { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { FormattedMessage } from "react-intl";
import { Heading3, Paragraph } from "@gemeente-denhaag/typography";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import styles from "../../styles/Configuration.module.scss";
import TextInput from "@gemeente-denhaag/text-input";
import { useForm } from "react-hook-form";
import ConfigurationForm from "../ConfigurationForm.tsx";
import { RadioButton } from "@gemeente-denhaag/radio-button";
import PasswordInput from "../PasswordInput.tsx";

interface HaalCentraal2Configuration {
  enabled?: string;
  properties?: {
    "brp-api-url"?: string;
    "bewoning-api-url"?: string;
    "api-key"?: string;
  };
}

interface HaalCentraal2FeatureConfigurationProps
  extends FeatureConfigurationProps {
  prefillConfiguration?: HaalCentraal2Configuration;
}

const HaalCentraal2FeatureConfiguration = ({
  prefillConfiguration,
  onSubmit,
  onChange,
}: HaalCentraal2FeatureConfigurationProps) => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<HaalCentraal2Configuration>(prefillConfiguration || {});
  const {
    register,
    watch,
    reset,
    formState,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<HaalCentraal2Configuration>({
    defaultValues: { ...prefillConfiguration, enabled: "false" },
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
                  <FormLabel htmlFor={"brp-api-url"}>
                    <FormattedMessage
                      id={"features.haalcentraal2.brp-api-url"}
                    />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.haalcentraal2.brp-api-url.description"}
                    />
                  </Paragraph>
                }
              >
                <TextInput
                  {...register("properties.brp-api-url")}
                  id="brp-api-url"
                  type="url"
                />
              </FormField>
              <FormField
                label={
                  <FormLabel htmlFor={"bewoning-api-url"}>
                    <FormattedMessage
                      id={"features.haalcentraal2.bewoning-api-url"}
                    />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.haalcentraal2.bewoning-api-url.description"}
                    />
                  </Paragraph>
                }
              >
                <TextInput
                  {...register("properties.bewoning-api-url")}
                  id="bewoning-api-url"
                  type="url"
                />
              </FormField>
              <FormField
                label={
                  <FormLabel htmlFor={"api-key"}>
                    <FormattedMessage id={"features.haalcentraal2.api-key"} />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.haalcentraal2.api-key.description"}
                    />
                  </Paragraph>
                }
              >
                <PasswordInput
                  {...register("properties.api-key")}
                  id="api-key"
                />
              </FormField>
            </Fragment>
          )}
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default HaalCentraal2FeatureConfiguration;
