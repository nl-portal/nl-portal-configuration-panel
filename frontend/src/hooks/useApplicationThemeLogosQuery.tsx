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
import {useContext} from "react";
import ConfigPanelSettingsContext from "../contexts/ConfigPanelSettingsContext.tsx";

interface UseApplicationThemeLogosQueryProps {
    applicationName?: string;
    refetchInterval?: number | false | undefined;
}

export type ThemeLogo = {
    logoId: string;
    filename: string;
    size: number;
    contentType: string;
    application: string;
    profile?: string;
    label?: string;
}

export const useApplicationThemeLogosQuery = (
    options: UseApplicationThemeLogosQueryProps = {}
) => {
    const auth = useAuth();
    const {clientSettings} = useContext(ConfigPanelSettingsContext);
    const defaultVariables: UseApplicationThemeLogosQueryProps =
        {
            applicationName: clientSettings.applicationName,
            refetchInterval: false
        }
    const variables = {...defaultVariables, ...options}

    return useQuery({
        queryKey: ['queryThemeLogos'],
        refetchInterval: variables.refetchInterval,
        queryFn: async (): Promise<ThemeLogo[]> => {
            const response = await fetch(
                `/api/v1/theme/${variables.applicationName}/logo`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + auth.user?.access_token,
                    }
                }
            )
            return await response.json()
        }
    })
}

export default useApplicationThemeLogosQuery;
