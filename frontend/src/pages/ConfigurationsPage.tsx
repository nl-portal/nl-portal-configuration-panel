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

import {Heading2, Paragraph} from "@gemeente-denhaag/typography";
import {PageGrid} from "@nl-portal/nl-portal-user-interface";
import {PageHeader} from "@gemeente-denhaag/page";
import ConfigurationPropertiesList from "../components/ConfigurationPropertiesList.tsx";
import useConfigurationsQuery from "../hooks/useConfigurationsQuery.tsx"

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
