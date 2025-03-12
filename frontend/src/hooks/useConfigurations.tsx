import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";

interface useConfigurationProps {
    featureKey?: string;
}

export const useConfigurations = (props?: useConfigurationProps) => {
    const auth = useAuth();

    const allConfigurations = useQuery({
        queryKey: ['allConfigurations'],
        refetchInterval: 5000,
        queryFn: async () => {
            const response = await fetch(
                '/api/v1/configuration/nl-portal-backend-libraries',
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
    });
    const configurationsByFeature = useQuery({
        queryKey: ['configurationsByFeature'],
        queryFn: async () => {
            const response = await fetch(
                `/api/v1/configuration/nl-portal-backend-libraries/features/${props?.featureKey || ''}`,
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

    return {
        allConfigurations,
        configurationsByFeature
    }
}

export default useConfigurations;