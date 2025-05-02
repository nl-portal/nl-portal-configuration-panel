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

interface ProductConfiguration {
    enabled?: string;
    properties?: {
        "product-type-url"?: string,
        "product-instantie-type-url"?: string
        "product-details-type-url"?: string
        "product-verbruiks-object-type-url"?: string
    }
}

interface ProductFeatureConfigurationProps extends FeatureConfigurationProps {
    prefillConfiguration?: ProductConfiguration | undefined
}

const ProductFeatureConfiguration = ({
                                         prefillConfiguration,
                                         onSubmit,
                                         onChange
                                     }: ProductFeatureConfigurationProps) => {
    const [currentConfiguration, setCurrentConfiguration] = useState<ProductConfiguration>(prefillConfiguration || {})
    const {
        register,
        watch,
        reset,
        formState,
        handleSubmit,
        getValues: getFormValue
    } = useForm<ProductConfiguration>({
        defaultValues: {...prefillConfiguration, enabled: "false"},
    })

    useEffect(() => {
        if (prefillConfiguration) reset(prefillConfiguration)

    }, [prefillConfiguration])

    useEffect(() => {
        if (onChange && currentConfiguration && formState.isDirty && formState.isValid) {
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
                                           id={"features.product.configuration"}></FormattedMessage></Heading3>
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
                                                   <FormLabel htmlFor={"product-type-url"}>
                                                       <FormattedMessage id={"features.product.product-type-url"}/>
                                                   </FormLabel>
                                               }
                                               description={
                                                   <Paragraph>
                                                       <FormattedMessage
                                                           id={"features.product.product-type-url.description"}/>
                                                   </Paragraph>
                                               }
                                           >
                                               <TextInput
                                                   {...register("properties.product-type-url")}
                                                   id="product-type-url"
                                                   type="url"
                                               />
                                           </FormField>
                                           <FormField
                                               label={
                                                   <FormLabel htmlFor={"product-instantie-type-url"}>
                                                       <FormattedMessage
                                                           id={"features.product.product-instantie-type-url"}/>
                                                   </FormLabel>
                                               }
                                               description={
                                                   <Paragraph>
                                                       <FormattedMessage
                                                           id={"features.product.product-instantie-type-url.description"}/>
                                                   </Paragraph>
                                               }
                                           >
                                               <TextInput
                                                   {...register("properties.product-instantie-type-url")}
                                                   id="product-instantie-type-url"
                                                   type="url"
                                               />
                                           </FormField>
                                           <FormField
                                               label={
                                                   <FormLabel htmlFor={"product-details-type-url"}>
                                                       <FormattedMessage
                                                           id={"features.product.product-details-type-url"}/>
                                                   </FormLabel>
                                               }
                                               description={
                                                   <Paragraph>
                                                       <FormattedMessage
                                                           id={"features.product.product-details-type-url.description"}/>
                                                   </Paragraph>
                                               }
                                           >
                                               <TextInput
                                                   {...register("properties.product-details-type-url")}
                                                   id="product-details-type-url"
                                                   type="url"
                                               />
                                           </FormField>
                                           <FormField
                                               label={
                                                   <FormLabel htmlFor={"product-verbruiks-object-type-url"}>
                                                       <FormattedMessage
                                                           id={"features.product.product-verbruiks-object-type-url"}/>
                                                   </FormLabel>
                                               }
                                               description={
                                                   <Paragraph>
                                                       <FormattedMessage
                                                           id={"features.product.product-verbruiks-object-type-url.description"}/>
                                                   </Paragraph>
                                               }
                                           >
                                               <TextInput
                                                   {...register("properties.product-verbruiks-object-type-url")}
                                                   id="product-verbruiks-object-type-url"
                                                   type="url"
                                               />
                                           </FormField>
                                       </Fragment>
                                   )}
                               </Fragment>
                           }>
        </ConfigurationForm>
    )
}

export default ProductFeatureConfiguration;
