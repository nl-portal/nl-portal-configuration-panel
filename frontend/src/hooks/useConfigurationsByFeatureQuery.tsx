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
        queryKey: ['configurationsByFeature'],
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