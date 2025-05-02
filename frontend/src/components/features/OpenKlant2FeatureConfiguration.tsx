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

interface OpenKlant2FeatureConfiguration {
  enabled?: string;
  properties?: {
      "klantinteracties-api-url"?: string,
      "contactgegevens-api-url"?: string,
      "token"?: string
  }
}

interface OpenKlant2FeatureConfigurationProps extends FeatureConfigurationProps {
  prefillConfiguration?: OpenKlant2FeatureConfiguration
}

const OpenKlant2FeatureConfiguration = ({
  prefillConfiguration,
  onSubmit,
  onChange
}: OpenKlant2FeatureConfigurationProps) => {
  const [currentConfiguration, setCurrentConfiguration] = useState<OpenKlant2FeatureConfiguration>(prefillConfiguration || {})
  const {
    register,
    watch,
    reset,
    formState,
    handleSubmit,
    getValues: getFormValue
  } = useForm<OpenKlant2FeatureConfiguration>({
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
                                   id={"features.openklant2.configuration"}></FormattedMessage></Heading3>
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
                                           <FormattedMessage id={"features.openklant2.klantinteracties-api-url"}/>
                                         </FormLabel>
                                       }
                                       description={
                                         <Paragraph>
                                           <FormattedMessage
                                               id={"features.openklant2.klantinteracties-api-url.description"}/>
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
                                           <FormattedMessage id={"features.openklant2.contactgegevens-api-url"}/>
                                         </FormLabel>
                                       }
                                       description={
                                         <Paragraph>
                                           <FormattedMessage
                                               id={"features.openklant2.contactgegevens-api-url.description"}/>
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
                                           <FormattedMessage id={"features.openklant2.token"}/>
                                         </FormLabel>
                                       }
                                       description={
                                         <Paragraph>
                                           <FormattedMessage
                                               id={"features.openklant2.token.description"}/>
                                         </Paragraph>
                                       }
                                   >
                                     <PasswordInput
                                         {...register("properties.token")}
                                         id="token"
                                     />
                                   </FormField>
                                 </Fragment>
                             )}
                           </Fragment>
                         }>
      </ConfigurationForm>
  )
}

export default OpenKlant2FeatureConfiguration;
