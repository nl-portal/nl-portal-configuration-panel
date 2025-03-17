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
import Fieldset, {FieldsetLegend} from "@gemeente-denhaag/form-fieldset";
import {FormField} from "@gemeente-denhaag/form-field";
import {FormLabel} from "@gemeente-denhaag/form-label";
import {Heading3, Paragraph} from "@gemeente-denhaag/typography";
import {Checkbox} from "@gemeente-denhaag/checkbox";
import {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import FeatureConfigurationProps from "../interfaces/FeatureConfigurationProps.ts";
import TextInput from "@gemeente-denhaag/text-input";
import styles from '../pages/FeatureConfigurationPage.module.scss'

interface BerichtenConfiguration {
    enabled?: string;
    properties?: {
        "bericht-object-type-url"?: string
    }
}

interface BerichtenFeatureConfigurationProps extends FeatureConfigurationProps {
    featureConfiguration: BerichtenConfiguration | undefined
}

const BerichtenFeatureConfiguration = ({
                                           featureConfiguration,
                                           onValid,
                                           onChange
                                       }: BerichtenFeatureConfigurationProps) => {
    const [berichtenConfiguration, setBerichtenConfiguration] = useState<BerichtenConfiguration | undefined>()

    useEffect(() => {
        if (featureConfiguration) setBerichtenConfiguration(featureConfiguration)
    }, [featureConfiguration])

    useEffect(() => {
        if (onChange) {
            onChange(berichtenConfiguration)
        }
    }, [berichtenConfiguration, onChange])

    useEffect(() => {
        if (onValid) onValid(true);
    }, [onValid])

    return (
        <Fieldset className={styles["feature-config__form"]}>
            <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
                <Heading3><FormattedMessage id={"features.berichten.configuration"}></FormattedMessage></Heading3>
            </FieldsetLegend>
            <FormField type="checkbox">
                <Paragraph className="utrecht-form-field__label">
                    <Checkbox
                        id="berichten.enabled"
                        className="utrecht-form-field__input"
                        name={"enabled"}
                        checked={berichtenConfiguration?.enabled == "true"}
                        onChange={(e) => {
                            setBerichtenConfiguration({
                                ...berichtenConfiguration,
                                enabled: e.target.checked.toString(),
                            })
                        }}
                    />
                    <FormLabel htmlFor="true" type="checkbox">
                        <FormattedMessage id={"features.berichten.enable"}></FormattedMessage>
                    </FormLabel>
                </Paragraph>
            </FormField>
            {berichtenConfiguration?.enabled == "true" && (
                <FormField type="text">
                    <Paragraph>
                        <FormattedMessage id={"features.berichten.berichtObjectTypeUrl"}>
                        </FormattedMessage>
                        <TextInput
                            id="berichten.berichtObjectTypeUrl"
                            name={"berichtObjectTypeUrl"}
                            defaultValue={berichtenConfiguration?.properties?.["bericht-object-type-url"]}
                            onChange={(e) => {
                                setBerichtenConfiguration({
                                    ...berichtenConfiguration,
                                    ...{properties: {'bericht-object-type-url': e.target.value}},
                                })
                            }}
                        />
                    </Paragraph>
                </FormField>
            )}
        </Fieldset>
    )
}

export default BerichtenFeatureConfiguration