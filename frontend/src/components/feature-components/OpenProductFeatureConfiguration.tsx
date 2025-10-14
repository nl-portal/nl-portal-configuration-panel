import { Fragment, useEffect, useState } from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { FormattedMessage } from "react-intl";
import { Heading3, Heading4, Paragraph } from "@gemeente-denhaag/typography";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import styles from "../../styles/Configuration.module.scss";
import { TextInput } from "@gemeente-denhaag/text-input";
import { useForm } from "react-hook-form";
import ConfigurationForm from "../ConfigurationForm.tsx";

interface OpenProductConfiguration {
  properties?: {
    token?: string;
    "product-api-url"?: string;
    "product-type-api-url"?: string;
    dmn: {
      clientId?: string;
      secret?: string;
      username?: string;
      password?: string;
    };
  };
}

interface OpenProductFeatureConfigurationProps
  extends FeatureConfigurationProps {
  prefillConfiguration?: OpenProductConfiguration | undefined;
}

const ProductFeatureConfiguration = ({
  prefillConfiguration,
  onSubmit,
  onChange,
}: OpenProductFeatureConfigurationProps) => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<OpenProductConfiguration>(prefillConfiguration || {});
  const {
    register,
    reset,
    formState,
    handleSubmit,
    getValues: getFormValue,
  } = useForm<OpenProductConfiguration>({
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
                <FormLabel htmlFor={"product-type-url"}>
                  <FormattedMessage id={"features.openproduct.token"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.openproduct.token.description"}
                  />
                </Paragraph>
              }
            >
              <TextInput
                {...register("properties.token")}
                id="token"
                type="text"
              />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"product-api-url"}>
                  <FormattedMessage
                    id={"features.openproduct.product-api-url"}
                  />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.openproduct.product-api-url.description"}
                  />
                </Paragraph>
              }
            >
              <TextInput
                {...register("properties.product-api-url")}
                id="product-api-url"
                type="url"
              />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"product-type-api-url"}>
                  <FormattedMessage
                    id={"features.openproduct.product-type-api-url"}
                  />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.openproduct.product-type-api-url.description"}
                  />
                </Paragraph>
              }
            >
              <TextInput
                {...register("properties.product-type-api-url")}
                id="product-type-api-url"
                type="url"
              />
            </FormField>
            <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
              <Heading4>
                <FormattedMessage
                  id={"features.openproduct.dmn"}
                ></FormattedMessage>
              </Heading4>
            </FieldsetLegend>
            <FormField
              label={
                <FormLabel htmlFor={"dmn.clientId"}>
                  <FormattedMessage id={"features.openproduct.dmn.clientId"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.openproduct.dmn.clientId.description"}
                  />
                </Paragraph>
              }
            >
              <TextInput
                {...register("properties.dmn.clientId")}
                id="dmn.clientId"
                type="text"
              />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"dmn.secret"}>
                  <FormattedMessage id={"features.openproduct.dmn.secret"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.openproduct.dmn.secret.description"}
                  />
                </Paragraph>
              }
            >
              <TextInput
                {...register("properties.dmn.secret")}
                id="dmn.secret"
                type="password"
              />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"dmn.username"}>
                  <FormattedMessage id={"features.openproduct.dmn.username"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.openproduct.dmn.username.description"}
                  />
                </Paragraph>
              }
            >
              <TextInput
                {...register("properties.dmn.username")}
                id="dmn.username"
                type="text"
              />
            </FormField>
            <FormField
              label={
                <FormLabel htmlFor={"dmn.password"}>
                  <FormattedMessage id={"features.openproduct.dmn.password"} />
                </FormLabel>
              }
              description={
                <Paragraph>
                  <FormattedMessage
                    id={"features.openproduct.dmn.password.description"}
                  />
                </Paragraph>
              }
            >
              <TextInput
                {...register("properties.dmn.password")}
                id="dmn.password"
                type="password"
              />
            </FormField>
          </Fragment>
        </Fragment>
      }
    ></ConfigurationForm>
  );
};

export default ProductFeatureConfiguration;
