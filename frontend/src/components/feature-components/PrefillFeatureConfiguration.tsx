import { Fragment, useEffect, useState } from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import { Fieldset, FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { FormattedMessage } from "react-intl";
import { Heading3, Paragraph } from "@gemeente-denhaag/typography";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import styles from "../../styles/Configuration.module.scss";
import { TextInput } from "@gemeente-denhaag/text-input";
import { useForm } from "react-hook-form";
import { RadioButton } from "@gemeente-denhaag/radio-button";
import ConfigurationForm from "../ConfigurationForm.tsx";
import { Select, SelectOption } from "@utrecht/component-library-react";

// import {Select, SelectOption} from "@gemeente-denhaag/select";

interface PrefillConfiguration {
  enabled?: string;
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
    watch,
    reset,
    formState,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<PrefillConfiguration>({
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
                id={"features.prefill.configuration"}
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
          )}
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default PrefillFeatureConfiguration;
