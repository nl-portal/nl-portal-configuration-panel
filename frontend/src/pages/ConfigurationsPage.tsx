import {Heading2, Paragraph} from "@gemeente-denhaag/typography";
import {PageGrid} from "@nl-portal/nl-portal-user-interface";
import {PageHeader} from "@gemeente-denhaag/page";
import ConfigurationPropertiesList from "../components/ConfigurationPropertiesList.tsx";
import useConfigurationsQuery from "../queries/useConfigurationsQuery.tsx"

const ConfigurationsPage = () => {
    const configurations = useConfigurationsQuery();

    return (
        <PageGrid>
            <PageHeader>
                <Heading2>Configurations</Heading2>
            </PageHeader>
            <Paragraph>
                These are the currently configured Spring Properties.
            </Paragraph>
            <ConfigurationPropertiesList
                error={configurations.isError}
                loading={configurations.isLoading}
                configurationProperties={configurations.data}
            ></ConfigurationPropertiesList>
        </PageGrid>
    );
};

export default ConfigurationsPage;
