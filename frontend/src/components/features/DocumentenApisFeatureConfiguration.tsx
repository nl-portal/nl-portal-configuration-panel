import {Fragment, useEffect, useMemo, useRef, useState} from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import Fieldset, {FieldsetLegend} from "@gemeente-denhaag/form-fieldset";
import {FormattedMessage, useIntl} from "react-intl";
import {Heading3, Heading4, Paragraph} from "@gemeente-denhaag/typography";
import {FormField} from "@gemeente-denhaag/form-field";
import {FormLabel} from "@gemeente-denhaag/form-label";
import styles from "../ConfigurationForm.module.scss"
import {RadioButton} from "@gemeente-denhaag/radio-button";
import ConfigurationForm from "../ConfigurationForm.tsx";
import {useForm} from "react-hook-form";
import {Select, SelectOption} from "@utrecht/component-library-react";
import TextInput from "@gemeente-denhaag/text-input";
import PasswordInput from "../PasswordInput.tsx";
import IconButton from "@gemeente-denhaag/iconbutton";
import {ArrowRightIcon, TrashIcon} from "@gemeente-denhaag/icons";
import _ from "lodash";
import ActionField from "../ActionField.tsx";

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
    const intl = useIntl()
    const [currentConfiguration, setCurrentConfiguration] = useState<DocumentenApisConfiguration | undefined>(prefillConfiguration)
    const configurationEntries = useMemo(() => Object.keys(currentConfiguration?.properties?.configurations || {}), [currentConfiguration])
    const {
        register,
        watch,
        reset,
        handleSubmit,
        getValues: getFormValue,
    } = useForm<DocumentenApisConfiguration>({
        defaultValues: {
            enabled: "false",
            properties: {
                configurations: {}
            },
            ...prefillConfiguration,
        }
    })
    const addConfigurationRef = useRef<HTMLInputElement>(null)
    const addConfiguration = (key: string) => {
        setCurrentConfiguration(_.set({...currentConfiguration}, `properties.configurations.${key}`, {}))
    }
    const addAnotherValid = () => {
        return !!addConfigurationRef &&
            addConfigurationRef.current?.value.match(/^[0-9a-z/-]+$/) &&
            !configurationEntries.find(key => addConfigurationRef.current?.value === key) ||
            false;
    };

    useEffect(() => {
        console.log("prefill was updated: ", prefillConfiguration)
        if (prefillConfiguration) {
            setCurrentConfiguration(prefillConfiguration)
            reset(prefillConfiguration)
        }

    }, [prefillConfiguration])

    useEffect(() => {
        console.log("FORM DATA: ", currentConfiguration)
        if (onChange && currentConfiguration) {
            onChange(currentConfiguration)
            reset(currentConfiguration)
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
                                                   configurationEntries.map((key, index) =>
                                                       <section
                                                           className={styles["form-field__section"]}
                                                           key={key + "-" + index}
                                                       >
                                                           <FormField className={styles["form-field__section__header"]}>
                                                               <ActionField
                                                                   field={
                                                                       <Heading4>
                                                                           {key}
                                                                       </Heading4>
                                                                   }
                                                                   button={
                                                                       <IconButton
                                                                           onClick={() => {
                                                                               console.log("removing ", key)
                                                                               setCurrentConfiguration(_.omit(getFormValue(), `properties.configurations.${key}`))
                                                                           }}>
                                                                           <TrashIcon></TrashIcon>
                                                                       </IconButton>
                                                                   }
                                                               >

                                                               </ActionField>
                                                           </FormField>
                                                           <FormField
                                                               label={
                                                                   <FormLabel htmlFor={key + ".url"}>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapis.url"}/>
                                                                   </FormLabel>
                                                               }
                                                               description={
                                                                   <Paragraph>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapis.url.description"}/>
                                                                   </Paragraph>
                                                               }
                                                           >
                                                               <TextInput
                                                                   {...register(`properties.configurations.${key}.url`)}
                                                                   id={key + ".url"}
                                                                   placeholder={"https://example.com/documenten/api/v1/"}
                                                                   type="url"
                                                               />
                                                           </FormField>
                                                           <FormField
                                                               label={
                                                                   <FormLabel htmlFor={key + ".client-id"}>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapis.client-id"}/>
                                                                   </FormLabel>
                                                               }
                                                               description={
                                                                   <Paragraph>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapis.client-id.description"}/>
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
                                                                           id={"features.documentenapis.secret"}/>
                                                                   </FormLabel>
                                                               }
                                                               description={
                                                                   <Paragraph>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapis.secret.description"}/>
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
                                                                           id={"features.documentenapis.rsin"}/>
                                                                   </FormLabel>
                                                               }
                                                               description={
                                                                   <Paragraph>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapis.rsin.description"}/>
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
                                                                           id={"features.documentenapis.document-type-url"}/>
                                                                   </FormLabel>
                                                               }
                                                               description={
                                                                   <Paragraph>
                                                                       <FormattedMessage
                                                                           id={"features.documentenapis.document-type-url.description"}/>
                                                                   </Paragraph>
                                                               }
                                                           >
                                                               <TextInput
                                                                   {...register(`properties.configurations.${key}.document-type-url`)}
                                                                   id={key + ".document-type-url"}
                                                                   placeholder={"https://example.com/catalogi/api/v1/informatieobjecttypen/00000000"}
                                                                   type="url"
                                                               />
                                                           </FormField>
                                                       </section>
                                                   )
                                               )
                                           }
                                           <section
                                               className={styles["form-field__section"]}
                                               key={"add-another-section"}
                                           >
                                               <ActionField
                                                   label={
                                                       <FormLabel htmlFor={"add-another"}>
                                                           <FormattedMessage
                                                               id={"features.documentenapis.configurations.add-another"}/>
                                                       </FormLabel>
                                                   }
                                                   description={
                                                       <Paragraph>
                                                           <FormattedMessage
                                                               id={"features.documentenapis.configurations.add-another.description"}/>
                                                       </Paragraph>
                                                   }
                                                   field={
                                                       <TextInput
                                                           id={"add-another"}
                                                           ref={addConfigurationRef}
                                                           placeholder={
                                                               intl.formatMessage({id: "features.documentenapis.configurations.configuration-name"})
                                                           }
                                                       />
                                                   }
                                                   button={
                                                       <IconButton
                                                           onClick={() => {
                                                               if (addConfigurationRef.current) {
                                                                   addConfiguration(addConfigurationRef.current.value)
                                                                   addConfigurationRef.current.value = ""
                                                               }
                                                           }}
                                                           disabled={!addAnotherValid()}>
                                                           <ArrowRightIcon></ArrowRightIcon>
                                                       </IconButton>
                                                   }
                                               >
                                               </ActionField>
                                           </section>
                                           {
                                               configurationEntries.length > 0 &&
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
                                       </Fragment>
                                   )}
                               </Fragment>
                           }>
        </ConfigurationForm>
    )
}

export default DocumentenApisFeatureConfiguration;
