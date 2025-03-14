import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";

interface UseConfigurationsQueryProps {
    applicationName?: string;
    refetchInterval?: number | false | undefined;
}

export const useConfigurationsQuery = (
    options: UseConfigurationsQueryProps = {}
) => {
    const auth = useAuth();
    const defaultVariables: UseConfigurationsQueryProps =
        {
            applicationName: 'nl-portal-backend-libraries',
            refetchInterval: false
        }
    const variables = {...defaultVariables, ...options}

    return useQuery({
        queryKey: ['configurations'],
        refetchInterval: variables.refetchInterval,
        queryFn: async () => {
            const response = await fetch(
                `/api/v1/configurations/${variables.applicationName}`,
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

export default useConfigurationsQuery;