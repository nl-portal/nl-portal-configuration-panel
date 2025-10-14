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

interface OpenKlant2Configuration {
  properties?: {
    "klantinteracties-api-url"?: string;
    "contactgegevens-api-url"?: string;
    token?: string;
  };
}

interface OpenKlant2FeatureConfigurationProps
  extends FeatureConfigurationProps {
  prefillConfiguration?: OpenKlant2Configuration;
}

const OpenKlant2FeatureConfiguration = ({
  prefillConfiguration,
  onSubmit,
  onChange,
}: OpenKlant2FeatureConfigurationProps) => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<OpenKlant2Configuration>(prefillConfiguration || {});
  const {
    register,
    reset,
    formState,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<OpenKlant2Configuration>({
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
                id={"features.feature.configuration.properties"}
              ></FormattedMessage>
            </Heading3>
          </FieldsetLegend>
          <Fragment>
            <FormField
              label={
                <FormLabel htmlFor={"url"}>
                  <FormattedMessage
                    id={"features.openklant2.klantinteracties-api-url"}
                  />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={
                      "features.openklant2.klantinteracties-api-url.description"
                    }
                  />
                </Paragraph>
              }
            >
              <TextInput
                {...register("properties.klantinteracties-api-url")}
                id="klantinteracties-api-url"
                type="url"
              />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"url"}>
                  <FormattedMessage
                    id={"features.openklant2.contactgegevens-api-url"}
                  />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={
                      "features.openklant2.contactgegevens-api-url.description"
                    }
                  />
                </Paragraph>
              }
            >
              <TextInput
                {...register("properties.contactgegevens-api-url")}
                id="contactgegevens-api-url"
                type="url"
              />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"token"}>
                  <FormattedMessage id={"features.openklant2.token"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.openklant2.token.description"}
                  />
                </Paragraph>
              }
            >
              <PasswordInput {...register("properties.token")} id="token" />
            </FormField>
          </Fragment>
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default OpenKlant2FeatureConfiguration;
