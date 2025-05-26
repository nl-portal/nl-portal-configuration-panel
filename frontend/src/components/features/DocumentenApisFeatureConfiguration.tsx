import {Fragment, useEffect, useState} from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import Fieldset, {FieldsetLegend} from "@gemeente-denhaag/form-fieldset";
import {FormattedMessage} from "react-intl";
import {Heading3, Paragraph} from "@gemeente-denhaag/typography";
import {FormField} from "@gemeente-denhaag/form-field";
import {FormLabel} from "@gemeente-denhaag/form-label";
import styles from "../ConfigurationForm.module.scss"
import {RadioButton} from "@gemeente-denhaag/radio-button";
import ConfigurationForm from "../ConfigurationForm.tsx";
import {useForm} from "react-hook-form";
import {Select, SelectOption} from "@utrecht/component-library-react";
import TextInput from "@gemeente-denhaag/text-input";
import PasswordInput from "../PasswordInput.tsx";

interface DocumentenApisConfiguration {
    enabled?: string;
    properties?: {
        "default-document-api": string,
        "configurations": {
            [name: string]: DocumentenApiConfigurationEntry
        }
    }
}

interface DocumentenApiConfigurationEntry {
    "url"?: string,
    "client-id"?: string,
    "secret"?: string,
    "rsin"?: string,
    "document-type-url"?: string,
}

interface DocumentenApiFeatureConfigurationProps extends FeatureConfigurationProps {
    prefillConfiguration?: DocumentenApisConfiguration
}

const DocumentenApisFeatureConfiguration = ({
                                                prefillConfiguration,
                                                onChange,
                                                onSubmit
                                            }: DocumentenApiFeatureConfigurationProps) => {
    const [currentConfiguration, setCurrentConfiguration] = useState<DocumentenApisConfiguration | undefined>(prefillConfiguration)
    const {
        register,
        watch,
        reset,
        // formState,
        handleSubmit,
        getValues: getFormValue
    } = useForm<DocumentenApisConfiguration>({
        defaultValues: {
            enabled: "false",
            // properties: {
            //     configurations: {
            //         openzaak: {
            //             url: "http://localhost:8001/documenten/api/v1",
            //             "client-id": "valtimo_client",
            //             secret: "e09b8bc5-5831-4618-ab28-41411304309d",
            //             rsin: "051845623",
            //             "document-type-url": "http://localhost:8001/catalogi/api/v1/informatieobjecttypen/efc332f2-be3b-4bad-9e3c-49a6219c92ad"
            //         },
            //         dummydoc: {
            //             url: "http://example:8001/documenten/api/v1",
            //             "client-id": "example_client",
            //             secret: "VerySuperSecretHaHa",
            //             rsin: "081111111",
            //             "document-type-url": "http://example:8001/catalogi/api/v1/informatieobjecttypen/efc332f2-be3b-4bad-9e3c-49a6219c92ad"
            //         }
            //     }
            // },
            ...!!prefillConfiguration && prefillConfiguration,
        }
    })
    const [configurations, setConfigurations] = useState<Array<string>>([])

    useEffect(() => {
        console.log("prefill was updated: ", prefillConfiguration)
        if (prefillConfiguration) {
            setConfigurations(Object.keys(watch("properties.configurations")))
            reset(prefillConfiguration)
        }

    }, [prefillConfiguration])

    useEffect(() => {
        console.log("FORM DATA: ", currentConfiguration)
        if (onChange && currentConfiguration) {
            onChange(currentConfiguration)
        }
    }, [currentConfiguration])

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
                                           id={"features.documentenapis.configuration"}></FormattedMessage></Heading3>
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
                                           {
                                               (
                                                   configurations.map((key, index) =>
                                                       <section
                                                           className={styles["form-field__section"]}
                                                           key={key+"-"+index}
                                                       >
                                                           <FormField
                                                               label={
                                                                   <FormLabel htmlFor={key + ".url"}>
                                                                       <FormattedMessage id={"features.zakenapi.url"}/>
                                                                   </FormLabel>
                                                               }
                                                               description={
                                                                   <Paragraph>
                                                                       <FormattedMessage
                                                                           id={"features.zakenapi.url.description"}/>
                                                                   </Paragraph>
                                                               }
                                                           >
                                                               <TextInput
                                                                   {...register(`properties.configurations.${key}.url`)}
                                                                   id={key + ".url"}
                                                                   type="url"
                                                               />
                                                           </FormField>
                                                           <FormField
                                                               label={
                                                                   <FormLabel htmlFor={key + ".client-id"}>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapi.client-id"}/>
                                                                   </FormLabel>
                                                               }
                                                               description={
                                                                   <Paragraph>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapi.client-id.description"}/>
                                                                   </Paragraph>
                                                               }
                                                           >
                                                               <TextInput
                                                                   {...register(`properties.configurations.${key}.client-id`)}
                                                                   id={key + ".client-id"}
                                                               />
                                                           </FormField>
                                                           <FormField
                                                               label={
                                                                   <FormLabel htmlFor={"secret"}>
                                                                       <FormattedMessage
                                                                           id={"features.zakenapi.secret"}/>
                                                                   </FormLabel>
                                                               }
                                                               description={
                                                                   <Paragraph>
                                                                       <FormattedMessage
                                                                           id={"features.zakenapi.secret.description"}/>
                                                                   </Paragraph>
                                                               }
                                                           >
                                                               <PasswordInput
                                                                   {...register(`properties.configurations.${key}.secret`)}
                                                                   id={key + ".secret"}
                                                               />
                                                           </FormField>
                                                           <FormField
                                                               label={
                                                                   <FormLabel htmlFor={key + ".rsin"}>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapi.rsin"}/>
                                                                   </FormLabel>
                                                               }
                                                               description={
                                                                   <Paragraph>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapi.rsin.description"}/>
                                                                   </Paragraph>
                                                               }
                                                           >
                                                               <TextInput
                                                                   {...register(`properties.configurations.${key}.rsin`)}
                                                                   id={key + ".rsin"}
                                                               />
                                                           </FormField>
                                                           <FormField
                                                               label={
                                                                   <FormLabel htmlFor={key + ".document-type-url"}>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapi.document-type-url"}/>
                                                                   </FormLabel>
                                                               }
                                                               description={
                                                                   <Paragraph>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapi.document-type-url.description"}/>
                                                                   </Paragraph>
                                                               }
                                                           >
                                                               <TextInput
                                                                   {...register(`properties.configurations.${key}.document-type-url`)}
                                                                   id={key + ".document-type-url"}
                                                                   type="url"
                                                               />
                                                           </FormField>
                                                       </section>
                                                   )
                                               )
                                           }
                                           {
                                               configurations.length > 0 &&
                                               <FormField
                                                   label={
                                                       <FormLabel htmlFor={"default-document-api"}>
                                                           <FormattedMessage
                                                               id={"features.documentenapis.default-document-api"}/>
                                                       </FormLabel>
                                                   }
                                                   description={
                                                       <Paragraph>
                                                           <FormattedMessage
                                                               id={"features.documentenapis.default-document-api.description"}/>
                                                       </Paragraph>
                                                   }>
                                                   <Select className={styles["form-field__select"]}
                                                           {...register("properties.default-document-api")}
                                                           id="default-document-api"
                                                           required={true}
                                                           disabled={!watch("properties.configurations")}
                                                   >
                                                       {
                                                           Object.keys(watch("properties.configurations") || {})
                                                               .map((configurationName, index) =>
                                                                   <SelectOption
                                                                       key={configurationName + index}
                                                                       value={configurationName}
                                                                       id={configurationName + index}
                                                                   >
                                                                       {configurationName}
                                                                   </SelectOption>
                                                               )
                                                       }
                                                   </Select>
                                               </FormField>
                                           }
                                           <FormField
                                               label={
                                                   <FormLabel>
                                                       SUBMISSION
                                                   </FormLabel>
                                               }
                                               key={"submission"}
                                           >
                                                               <pre
                                                                   {...register(`properties`)}
                                                               >
                                                                   {JSON.stringify(watch("properties"), null, 2)}
                                                               </pre>
                                           </FormField>
                                       </Fragment>
                                   )}
                               </Fragment>
                           }>
        </ConfigurationForm>
    )
}

export default DocumentenApisFeatureConfiguration;
