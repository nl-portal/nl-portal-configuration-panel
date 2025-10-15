import { Fragment, useEffect, useState } from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { FormattedMessage } from "react-intl";
import { Heading3, Paragraph } from "@gemeente-denhaag/typography";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import styles from "../../styles/Configuration.module.scss";
import ConfigurationForm from "../ConfigurationForm.tsx";
import PasswordInput from "../PasswordInput.tsx";
import { TextInput } from "@gemeente-denhaag/text-input";
import { useForm } from "react-hook-form";

interface DmnConfiguration {
  properties?: {
    url?: string;
    "client-id"?: string;
    secret?: string;
    username?: string;
    password?: string;
  };
}

interface DmnFeatureConfigurationProps extends FeatureConfigurationProps {
  prefillConfiguration?: DmnConfiguration;
}

const DmnFeatureConfiguration = ({
  prefillConfiguration,
  onSubmit,
  onChange,
}: DmnFeatureConfigurationProps) => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<DmnConfiguration>(prefillConfiguration || {});
  const {
    register,
    reset,
    formState,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<DmnConfiguration>({
    defaultValues: { ...prefillConfiguration },
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
                id={"features.feature.configuration.properties"}
              ></FormattedMessage>
            </Heading3>
          </FieldsetLegend>
          <Fragment>
            <FormField
              label={
                <FormLabel htmlFor={"url"}>
                  <FormattedMessage id={"features.dmn.url"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage id={"features.dmn.url.description"} />
                </Paragraph>
              }
            >
              <TextInput {...register("properties.url")} id="url" type="url" />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"client-id"}>
                  <FormattedMessage id={"features.dmn.client-id"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage id={"features.dmn.client-id.description"} />
                </Paragraph>
              }
            >
              <TextInput {...register("properties.client-id")} id="clientid" />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"secret"}>
                  <FormattedMessage id={"features.dmn.secret"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage id={"features.dmn.secret.description"} />
                </Paragraph>
              }
            >
              <PasswordInput {...register("properties.secret")} id="secret" />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"username"}>
                  <FormattedMessage id={"features.dmn.username"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage id={"features.dmn.username.description"} />
                </Paragraph>
              }
            >
              <TextInput {...register("properties.username")} id="username" />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"password"}>
                  <FormattedMessage id={"features.dmn.password"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage id={"features.dmn.password.description"} />
                </Paragraph>
              }
            >
              <PasswordInput
                {...register("properties.password")}
                id="password"
              />
            </FormField>
          </Fragment>
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default DmnFeatureConfiguration;
