/*
 * Copyright 2025 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Fragment, useEffect, useState} from "react";
import FeatureConfigurationProps from "../../interfaces/FeatureConfigurationProps.ts";
import Fieldset, {FieldsetLegend} from "@gemeente-denhaag/form-fieldset";
import {Heading3, Paragraph} from "@gemeente-denhaag/typography";
import {FormattedMessage} from "react-intl";
import {FormField} from "@gemeente-denhaag/form-field";
import {RadioButton} from "@gemeente-denhaag/radio-button";
import {FormLabel} from "@gemeente-denhaag/form-label";
import {ConfigurationForm} from "../ConfigurationForm.tsx";
import {useForm} from "react-hook-form";
import styles from "../../styles/Configuration.module.scss"
import TextInput from "@gemeente-denhaag/text-input";

interface BerichtenConfiguration {
    enabled?: string;
    properties?: {
        "bericht-object-type-url"?: string
    }
}

interface BerichtenFeatureConfigurationProps extends FeatureConfigurationProps {
    prefillConfiguration?: BerichtenConfiguration
}

const BerichtenFeatureConfiguration = ({
                                           prefillConfiguration,
                                           onChange,
                                           onSubmit
                                       }: BerichtenFeatureConfigurationProps) => {
    const [currentConfiguration, setCurrentConfiguration] = useState<BerichtenConfiguration>(prefillConfiguration || {})
    const {
        register,
        watch,
        reset,
        formState,
        handleSubmit,
        getValues: getFormValue
    } = useForm<BerichtenConfiguration>({defaultValues: {...prefillConfiguration, enabled: "false"}})

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
                           onSubmit={handleSubmit(()=> onSubmit)}
                           children={
                               <Fragment>
                                   <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
                                       <Heading3><FormattedMessage
                                           id={"features.berichten.configuration"}></FormattedMessage></Heading3>
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
                                       <FormField
                                           label={
                                               <FormLabel htmlFor={"bericht-object-type-url"}>
                                                   <FormattedMessage id={"features.berichten.bericht-object-type-url"}/>
                                               </FormLabel>
                                           }
                                           description={
                                               <Paragraph>
                                                   <FormattedMessage
                                                       id={"features.berichten.bericht-object-type-url.description"}/>
                                               </Paragraph>
                                           }
                                       >
                                           <TextInput
                                               {...register("properties.bericht-object-type-url")}
                                               id="bericht-object-type-url"
                                               type="url"
                                           />
                                       </FormField>)}
                               </Fragment>
                           }>
        </ConfigurationForm>
    )
}

export default BerichtenFeatureConfiguration;
