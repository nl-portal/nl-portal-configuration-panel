import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";
import ConfigurationEntry from "../interfaces/ConfigurationEntry.ts";

interface UseConfigurationsByFeatureQueryProps {
    applicationName?: string;
    featureKey?: string;
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

    return useQuery<ConfigurationEntry[]>({
        queryKey: ['configurationsByFeature'],
        refetchInterval: variables.refetchInterval,
        enabled: () => !!variables.featureKey,
        queryFn: async () => {
            const response = await fetch(
                `/api/v1/configuration/${variables.applicationName}/features/${variables.featureKey || ''}`,
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
        select: (configurationEntries): ConfigurationEntry[] => {
            return configurationEntries.map(({propertyKey, propertyValue}) => {
                return {
                    propertyKey: propertyKey,
                    propertyValue: propertyValue
                }
            })
        }
    })
}

export default useConfigurationsByFeatureQuery;