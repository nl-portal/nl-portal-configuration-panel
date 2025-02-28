import {Heading2, Paragraph} from "@gemeente-denhaag/typography";
import {PageGrid} from "@nl-portal/nl-portal-user-interface";
import {PageHeader} from "@gemeente-denhaag/page";
import styles from './ConfigurationPage.module.scss'
import ConfigurationPropertiesList from "../components/ConfigurationPropertiesList.tsx";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "react-oidc-context";

const ConfigurationPage = () => {
    const auth = useAuth();
    const configurationsQuery = useQuery({
        queryKey: ['configurations'],
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


    return (
        <div className={styles["configurations-page"]}>
            <PageGrid>
                <PageHeader className={styles["configurations-page__title"]}>
                    <Heading2>Configuration</Heading2>
                </PageHeader>
                <Paragraph>
                    Configure your desired Spring Properties here.
                </Paragraph>
                <ConfigurationPropertiesList
                    error={configurationsQuery.isError}
                    loading={configurationsQuery.isLoading}
                    configurationProperties={configurationsQuery.data}
                ></ConfigurationPropertiesList>
            </PageGrid>
        </div>
    );
};

export default ConfigurationPage;
