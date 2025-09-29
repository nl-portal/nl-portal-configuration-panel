import { Fragment, useEffect, useState } from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import Fieldset, { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { FormattedMessage } from "react-intl";
import { Heading3, Paragraph } from "@gemeente-denhaag/typography";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import styles from "../../styles/Configuration.module.scss";
import TextInput from "@gemeente-denhaag/text-input";
import { RadioButton } from "@gemeente-denhaag/radio-button";
import ConfigurationForm from "../ConfigurationForm.tsx";
import { useForm } from "react-hook-form";
import PasswordInput from "../PasswordInput.tsx";

interface BesluitenApiConfiguration {
  enabled?: string;
  properties?: {
    url?: string;
    "client-id"?: string;
    secret?: string;
  };
}

interface CatalogiApiFeatureConfigurationProps
  extends FeatureConfigurationProps {
  prefillConfiguration?: BesluitenApiConfiguration;
}

const BesluitenApiFeatureConfiguration = ({
  prefillConfiguration,
  onChange,
  onSubmit,
}: CatalogiApiFeatureConfigurationProps) => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<BesluitenApiConfiguration>(prefillConfiguration || {});
  const {
    register,
    watch,
    reset,
    formState,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<BesluitenApiConfiguration>({
    defaultValues: { ...prefillConfiguration, enabled: "false" },
  });

  useEffect(() => {
    if (prefillConfiguration) reset(prefillConfiguration);
  }, [prefillConfiguration]);

  useEffect(() => {
    if (
      onChange &&
      currentConfiguration &&
      formState.isDirty &&
      formState.isValid
    ) {
      onChange(currentConfiguration);
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
                id={"features.besluitenapi.configuration"}
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
                  <FormLabel htmlFor={"url"}>
                    <FormattedMessage id={"features.besluitenapi.url"} />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.besluitenapi.url.description"}
                    />
                  </Paragraph>
                }
              >
                <TextInput
                  {...register("properties.url")}
                  id="url"
                  type="url"
                />
              </FormField>
              <FormField
                label={
                  <FormLabel htmlFor={"client-id"}>
                    <FormattedMessage id={"features.besluitenapi.client-id"} />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.besluitenapi.client-id.description"}
                    />
                  </Paragraph>
                }
              >
                <TextInput
                  {...register("properties.client-id")}
                  id="client-id"
                />
              </FormField>
              <FormField
                label={
                  <FormLabel htmlFor={"secret"}>
                    <FormattedMessage id={"features.besluitenapi.secret"} />
                  </FormLabel>
                }
                description={
                  <Paragraph>
                    <FormattedMessage
                      id={"features.besluitenapi.secret.description"}
                    />
                  </Paragraph>
                }
              >
                <PasswordInput {...register("properties.secret")} id="secret" />
              </FormField>
            </Fragment>
          )}
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default BesluitenApiFeatureConfiguration;
