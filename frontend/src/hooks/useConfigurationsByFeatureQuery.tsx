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

import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import ConfigurationProperty from "../interfaces/ConfigurationProperty.ts";

interface UseConfigurationsByFeatureQueryProps {
    applicationName?: string;
    featurePrefix?: string;
    refetchInterval?: number | false | undefined;
}

export const useConfigurationsByFeatureQuery = (
    options: UseConfigurationsByFeatureQueryProps = {}
) => {
    const auth = useAuth();
    const defaultVariables: UseConfigurationsByFeatureQueryProps =
        {
            applicationName: 'nl-portal-backend-libraries',
            refetchInterval: false
        }
    const variables = {...defaultVariables, ...options}

    return useQuery<ConfigurationProperty[]>({
        queryKey: ['queryConfigurationsByFeature'],
        refetchInterval: variables.refetchInterval,
        enabled: () => !!variables.featurePrefix,
        queryFn: async () => {
            const response = await fetch(
                `/api/v1/configurations/${variables.applicationName}/features/${variables.featurePrefix || ''}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + auth.user?.access_token,
                    }
                }
            )
            return await response.json()
        },
        select: (configurations): ConfigurationProperty[] => {
            return configurations.map(({propertyKey, propertyValue, application}) => {
                return {
                    propertyKey: propertyKey,
                    propertyValue: propertyValue,
                    application: application,
                }
            })
        }
    })
}

export default useConfigurationsByFeatureQuery;