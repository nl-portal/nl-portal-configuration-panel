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

import {PageGrid} from "@nl-portal/nl-portal-user-interface";
import {PageHeader} from "@gemeente-denhaag/page";
import {FormattedMessage} from "react-intl";
import {Heading2, Paragraph} from "@gemeente-denhaag/typography";
import styles from "./FeaturesPage.module.scss"
import FeaturesList from "../components/FeaturesList.tsx";
import {features} from "../constants/features.tsx";

const FeaturesPage = () => {

    return <PageGrid>
        <PageHeader>
            <Heading2><FormattedMessage id="featuresPage.title"/></Heading2>
        </PageHeader>
        <div>
            <Paragraph className={styles["features__sub-header"]}>
                <FormattedMessage id="featuresPage.subtitle"/>
            </Paragraph>
            <FeaturesList
                features={features.map(feat => feat.featureId)}
            />
        </div>
    </PageGrid>
};

export default FeaturesPage;
