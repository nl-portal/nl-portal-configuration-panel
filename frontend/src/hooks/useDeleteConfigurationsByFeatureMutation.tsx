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

import {useMutation} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import ConfigPanelSettingsContext from "../contexts/ConfigPanelSettingsProvider.tsx";
import {useContext} from "react";

interface UseDeleteConfigurationsByFeatureMutationProps {
    applicationName?: string;
    featurePrefix?: string;
    refetchInterval?: number | false | undefined;
}

export const useDeleteConfigurationsByFeatureMutation = (options: UseDeleteConfigurationsByFeatureMutationProps) => {
    const auth = useAuth();
    const {clientSettings} = useContext(ConfigPanelSettingsContext);
    const defaultVariables =
        {
            applicationName: clientSettings.applicationName,
            refetchInterval: false
        }
    const variables = {...defaultVariables, ...options}

    return useMutation({
        mutationKey: ['deleteConfigurations'],
        retryDelay: 500,
        mutationFn: async (): Promise<void> => {
            await fetch(
                `/api/v1/configurations/${variables.applicationName}/features/${variables.featurePrefix}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + auth.user?.access_token,
                    }
                }
            )
        }
    })
}

export default useDeleteConfigurationsByFeatureMutation;
