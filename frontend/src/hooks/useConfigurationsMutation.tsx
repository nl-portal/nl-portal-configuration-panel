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
import ConfigurationProperty from "../interfaces/ConfigurationProperty.ts";

export const useConfigurationsMutation = () => {
    const auth = useAuth();
    return useMutation({
        mutationKey: ['mutateConfigurations'],
        retryDelay: 500,
        mutationFn: async (
            configurations: ConfigurationProperty[] = []
        ) => {
            console.log("payload", configurations)
            const response = await fetch(
                `/api/v1/configurations`,
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
    })
}

export default useConfigurationsMutation