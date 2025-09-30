import { Fragment, useEffect, useState } from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import Fieldset, { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { FormattedMessage } from "react-intl";
import { Heading3, Paragraph } from "@gemeente-denhaag/typography";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import styles from "../../styles/Configuration.module.scss";
import TextInput from "@gemeente-denhaag/text-input";
import ConfigurationForm from "../ConfigurationForm.tsx";
import { RadioButton } from "@gemeente-denhaag/radio-button";
import { useForm } from "react-hook-form";

interface TaakConfiguration {
  enabled?: string;
  properties?: {
    "object-type-url"?: string;
  };
}

interface TaakFeatureConfigurationProps extends FeatureConfigurationProps {
  prefillConfiguration?: TaakConfiguration;
}

const TaakFeatureConfiguration = ({
  prefillConfiguration,
  onSubmit,
  onChange,
}: TaakFeatureConfigurationProps) => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<TaakConfiguration>(prefillConfiguration || {});
  const {
    register,
    watch,
    reset,
    formState,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<TaakConfiguration>({
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
                id={"features.berichten.configuration"}
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
                  <FormLabel htmlFor={"object-type-url"}>
                    <FormattedMessage id={"features.taak.object-type-url"} />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.taak.object-type-url.description"}
                    />
                  </Paragraph>
                }
              >
                <TextInput
                  {...register("properties.object-type-url")}
                  id="object-type-url"
                  type="url"
                />
              </FormField>
            </Fragment>
          )}
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default TaakFeatureConfiguration;
