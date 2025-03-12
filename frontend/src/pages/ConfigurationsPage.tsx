import {Heading2, Paragraph} from "@gemeente-denhaag/typography";
import {PageGrid} from "@nl-portal/nl-portal-user-interface";
import {PageHeader} from "@gemeente-denhaag/page";
import ConfigurationPropertiesList from "../components/ConfigurationPropertiesList.tsx";
import useConfigurations from "../hooks/useConfigurations.tsx"

const ConfigurationsPage = () => {
    const {allConfigurations} = useConfigurations();

    return (
        <PageGrid>
            <PageHeader>
                <Heading2>Configurations</Heading2>
            </PageHeader>
            <Paragraph>
                These are the currently configured Spring Properties.
            </Paragraph>
            <ConfigurationPropertiesList
                error={allConfigurations.isError}
                loading={allConfigurations.isLoading}
                configurationProperties={allConfigurations.data}
            ></ConfigurationPropertiesList>
        </PageGrid>
    );
};

export default ConfigurationsPage;
