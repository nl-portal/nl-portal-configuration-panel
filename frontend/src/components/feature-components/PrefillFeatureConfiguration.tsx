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
import { Select, SelectOption } from "@utrecht/component-library-react";

interface PrefillConfiguration {
  properties?: {
    "type-url"?: string;
    "prefill-sha-version"?: string;
  };
}

interface PrefillFeatureConfigurationProps extends FeatureConfigurationProps {
  prefillConfiguration?: PrefillConfiguration | undefined;
}

const PrefillFeatureConfiguration = ({
  onChange,
  onSubmit,
  prefillConfiguration,
}: PrefillFeatureConfigurationProps) => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<PrefillConfiguration>(prefillConfiguration || {});
  const {
    register,
    reset,
    formState,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<PrefillConfiguration>({
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
                <FormLabel htmlFor={"type-url"}>
                  <FormattedMessage id={"features.prefill.type-url"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.prefill.type-url.description"}
                  />
                </Paragraph>
              }
            >
              <TextInput
                {...register("properties.type-url")}
                id="type-url"
                type="url"
              />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"prefill-sha-version"}>
                  <FormattedMessage
                    id={"features.prefill.prefill-sha-version"}
                  />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.prefill.prefill-sha-version.description"}
                  />
                </Paragraph>
              }
            >
              <Select
                className={styles["form-field__select"]}
                {...register("properties.prefill-sha-version")}
                id="prefill-sha-version"
              >
                <SelectOption key={"SHA1"} value={"SHA1"}>
                  SHA1
                </SelectOption>
                <SelectOption key={"SHA256"} value={"SHA256"}>
                  SHA256
                </SelectOption>
                <SelectOption key={"SHA512"} value={"SHA512"}>
                  SHA512
                </SelectOption>
              </Select>
            </FormField>
          </Fragment>
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default PrefillFeatureConfiguration;
