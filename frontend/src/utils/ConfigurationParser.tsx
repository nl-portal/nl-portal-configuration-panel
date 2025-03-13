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
import ConfigurationEntry from "../interfaces/ConfigurationEntry.ts";
import _ from "lodash";

const ConfigurationParser = (entries: ConfigurationEntry[]) => {
    function fromRoot() {
        const constructedConfig = {}

        entries.map((entry): ConfigurationEntry => {
            return {
                propertyKey: entry.propertyKey,
                propertyValue: entry.propertyValue
            }
        }).forEach(({propertyKey, propertyValue}) => {
            _.set(constructedConfig, propertyKey, propertyValue)
        })

        return constructedConfig
    }

    const fromPrefix = (prefix: string): object => {
        const configuration = fromRoot();
        return _.get(configuration, prefix)
    }

    return {
        fromRoot,
        fromPrefix
    }
}

export default ConfigurationParser;