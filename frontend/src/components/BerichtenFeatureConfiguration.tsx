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
import {Heading4, Paragraph} from "@gemeente-denhaag/typography";
import {Checkbox} from "@gemeente-denhaag/checkbox";
import {useEffect, useState} from "react";
import {Skeleton} from "@nl-portal/nl-portal-user-interface";
import useConfigurationsByFeature from "../queries/useConfigurationsByFeatureQuery.tsx";
import {FormattedMessage} from "react-intl";
import ConfigurationParser from "../utils/ConfigurationParser.tsx";
import _ from "lodash";

interface BerichtenConfiguration {
    enabled?: string;
    properties?: {
        berichtObjectTypeUrl?: string
    }
}

interface BerichtenFeatureConfigurationProps {
    onValid?: (valid: boolean) => void
    onSave?: (json: JSON) => void
}

const BerichtenFeatureConfiguration = (props: BerichtenFeatureConfigurationProps) => {
    const prefix = 'nl-portal.config.berichten'
    const configurations = useConfigurationsByFeature({featureKey: prefix})
    const [berichtenConfiguration, setBerichtenConfiguration] = useState<BerichtenConfiguration | undefined>()

    useEffect(() => {
        if (configurations.data) {
            const berichtenConfig: BerichtenConfiguration = ConfigurationParser(configurations.data).fromPrefix(prefix)
            setBerichtenConfiguration(
                berichtenConfig
            )
        }

    }, [configurations.data])

    useEffect(() => {
        if (props.onValid) props.onValid(true);
    }, [props])

    if (configurations.isLoading) {
        return (
            <section>
                <Skeleton height={60}/>
            </section>
        );
    }

    if (configurations.isError)
        return (
            <section>
                <Paragraph>Failed to load Configuration Properties</Paragraph>
            </section>
        );

    return (<div className={"edit-feature__text-field-container"}>
            <Fieldset>
                <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
                    <Heading4><FormattedMessage id={"features.berichten.configuration"}></FormattedMessage></Heading4>
                </FieldsetLegend>
                <FormField type="checkbox">
                    <Paragraph className="utrecht-form-field__label">
                        <Checkbox
                            id="berichten.enabled"
                            className="utrecht-form-field__input"
                            name={"enabled"}
                            checked={berichtenConfiguration?.enabled == "true"}
                            onChange={(e) => {
                                if (berichtenConfiguration) {
                                    setBerichtenConfiguration({
                                        ...berichtenConfiguration,
                                        enabled: e.target.checked.toString(),
                                    })
                                } else {
                                    setBerichtenConfiguration(
                                        {enabled: e.target.checked.toString()}
                                    )
                                }
                            }}
                        />
                        <FormLabel htmlFor="true" type="checkbox">
                            <FormattedMessage id={"features.berichten.enable"}></FormattedMessage>
                        </FormLabel>
                    </Paragraph>
                </FormField>
            </Fieldset>
        </div>
    )
}

export default BerichtenFeatureConfiguration