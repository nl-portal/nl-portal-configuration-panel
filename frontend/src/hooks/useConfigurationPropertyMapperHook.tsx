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
import ConfigurationProperty from "../interfaces/ConfigurationProperty.ts";
import _ from "lodash";
import {flatten} from "flat";

const useConfigurationPropertyMapperHook = () => {
    const parseProperties = (
        properties: ConfigurationProperty[],
        prefix?: string
    ): object => {
        const constructedConfig = {}

        properties.forEach(({propertyKey, propertyValue}) => {
            _.set(constructedConfig, propertyKey, propertyValue)
        })

        return prefix ? _.get(constructedConfig, prefix) : constructedConfig
    }

    const toProperties = (
        configuration: object = {},
        prefix?: string,
        application: string = 'nl-portal-backend-libraries',
    ): ConfigurationProperty[] => {
        const configurationProperties: ConfigurationProperty[] = []
        const flattenedProperties: object = flatten(configuration, {safe: true});

        console.log("parsing object: ", configuration)
        console.log("parsed object: ", flattenedProperties)

        Object.entries(flattenedProperties).map(([key, value]) => {
                if (value !== undefined && Array.isArray(value)) {
                    console.log("Array value: ",value)
                    configurationProperties.push(
                        {
                            propertyKey: prefix ? `${prefix}.${key}` : key,
                            propertyValue: value.join(", "),
                            application: application
                        }
                    )
                }
                else if (value !== undefined && typeof value !== "object") {
                    configurationProperties.push(
                        {
                            propertyKey: prefix ? `${prefix}.${key}` : key,
                            propertyValue: value.toString(),
                            application: application
                        }
                    )
                }
            }
        )

        return configurationProperties
    }

    return {
        parseProperties,
        toProperties
    }
}

export default useConfigurationPropertyMapperHook;