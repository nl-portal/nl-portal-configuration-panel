import {Fragment, useEffect, useState} from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import Fieldset, {FieldsetLegend} from "@gemeente-denhaag/form-fieldset";
import {FormattedMessage} from "react-intl";
import {Heading3, Paragraph} from "@gemeente-denhaag/typography";
import {FormField} from "@gemeente-denhaag/form-field";
import {FormLabel} from "@gemeente-denhaag/form-label";
import styles from '../ConfigurationForm.module.scss';
import TextInput from "@gemeente-denhaag/text-input";
import {useForm} from "react-hook-form";
import ConfigurationForm from "../ConfigurationForm.tsx";
import {RadioButton} from "@gemeente-denhaag/radio-button";
import PasswordInput from "../PasswordInput.tsx";

interface OpenKlantConfiguration {
    enabled?: string;
    properties?: {
        "url"?: string,
        "client-id"?: string,
        "secret"?: string
    }
}

interface OpenKlantFeatureConfigurationProps extends FeatureConfigurationProps {
    prefillConfiguration?: OpenKlantConfiguration
}

const OpenKlantFeatureConfiguration = ({
                                           prefillConfiguration,
                                           onSubmit,
                                           onChange
                                       }: OpenKlantFeatureConfigurationProps) => {
    const [currentConfiguration, setCurrentConfiguration] = useState<OpenKlantConfiguration>(prefillConfiguration || {})
    const {
        register,
        watch,
        reset,
        formState,
        handleSubmit,
        getValues: getFormValue
    } = useForm<OpenKlantConfiguration>({
        defaultValues: {...prefillConfiguration, enabled: "false"},
    })

    useEffect(() => {
        if (prefillConfiguration) reset(prefillConfiguration)

    }, [prefillConfiguration, reset])

    useEffect(() => {
        if (onChange && currentConfiguration && formState.isDirty && formState.isValid) {
            onChange(currentConfiguration)
        }
    }, [currentConfiguration, formState.isDirty, formState.isValid, onChange])

    return (
        <ConfigurationForm className={styles["feature-config__form"]}
                           onChange={() => {
                               setCurrentConfiguration(getFormValue())
                           }}
                           onSubmit={handleSubmit(() => onSubmit)}
                           children={
                               <Fragment>
                                   <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
                                       <Heading3><FormattedMessage
                                           id={"features.openklant.configuration"}></FormattedMessage></Heading3>
                                   </FieldsetLegend>
                                   <Fieldset role={"radiogroup"}>
                                       <FormField className={styles["form-field__radio-option"]}
                                                  type="radio"
                                                  label={
                                                      <FormLabel htmlFor={"enabled.true"}>
                                                          <FormattedMessage
                                                              id={"features.feature.enabled.true"}></FormattedMessage>
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
                                       <FormField className={styles["form-field__radio-option"]}
                                                  type="radio"
                                                  label={
                                                      <FormLabel htmlFor={"enabled.false"}>
                                                          <FormattedMessage
                                                              id={"features.feature.enabled.false"}></FormattedMessage>
                                                      </FormLabel>
                                                  }>
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
                                                       <FormattedMessage
                                                           id={"features.openklant.url"}/>
                                                   </FormLabel>
                                               }
                                               description={
                                                   <Paragraph>
                                                       <FormattedMessage
                                                           id={"features.openklant.url.description"}/>
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
                                                       <FormattedMessage
                                                           id={"features.openklant.client-id"}/>
                                                   </FormLabel>
                                               }
                                               description={
                                                   <Paragraph>
                                                       <FormattedMessage
                                                           id={"features.openklant.client-id.description"}/>
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
                                                       <FormattedMessage id={"features.openklant.secret"}/>
                                                   </FormLabel>
                                               }
                                               description={
                                                   <Paragraph>
                                                       <FormattedMessage
                                                           id={"features.openklant.secret.description"}/>
                                                   </Paragraph>
                                               }
                                           >
                                               <PasswordInput
                                                   {...register("properties.secret")}
                                                   id="secret"
                                               />
                                           </FormField>
                                       </Fragment>
                                   )}
                               </Fragment>
                           }>
        </ConfigurationForm>
    )
}

export default OpenKlantFeatureConfiguration;
