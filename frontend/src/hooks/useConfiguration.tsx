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

import {useContext} from "react";
import {useAuth} from "react-oidc-context";
import ConfigPanelSettingsContext from "../contexts/ConfigPanelSettingsContext.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";

export type ConfigurationProperty = {
    propertyKey: string
    propertyValue: string
    application: string
}

export interface UseConfigurationProps {
    applicationName?: string;
    featurePrefix?: string;
    refetchInterval?: number | false | undefined;
}

const useConfiguration = (props: UseConfigurationProps) => {
    const auth = useAuth();
    const {configPanelSettings, clientSettings} = useContext(ConfigPanelSettingsContext);

    const getConfigurations = async (): Promise<ConfigurationProperty[]> => {
        const response = await fetch(
            `${configPanelSettings.restApiUrl || ""}/v1/configurations/${clientSettings.applicationName || ""}/features/${props.featurePrefix}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + auth.user?.access_token,
                }
            }
        )
        return await response.json()
    };
    const storeConfigrations = async (
        configurations: ConfigurationProperty[] = []
    ): Promise<ConfigurationProperty[]> => {
        const response = await fetch(
            `${configPanelSettings.restApiUrl || ""}/v1/configurations`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + auth.user?.access_token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(configurations)
            }
        )

        return await response.json()
    }
    const deleteConfigurations = async (featurePrefix: string): Promise<void> => {
        await fetch(
            `${configPanelSettings.restApiUrl || ""}/v1/configurations/${clientSettings.applicationName || ""}/features/${featurePrefix}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + auth.user?.access_token,
                }
            }
        )
    }

    return {
        getConfigurations: useQuery({
            queryKey: ['getConfigurations',],
            queryFn: getConfigurations,
            select: (configurations: ConfigurationProperty[]): ConfigurationProperty[] => {
                return configurations.map(({propertyKey, propertyValue, application}) => {
                    return {
                        propertyKey: propertyKey,
                        propertyValue: propertyValue,
                        application: application,
                    }
                })
            },
        }),
        storeConfigrations: useMutation({
            mutationKey: ['storeConfigrations'],
            mutationFn: storeConfigrations,
        }),
        deleteConfigurations: useMutation({
            mutationKey: ['deleteConfigurations'],
            mutationFn: deleteConfigurations,
        })
    }
}

export default useConfiguration;
