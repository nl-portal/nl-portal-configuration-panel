import {PageGrid} from "@nl-portal/nl-portal-user-interface";
import {PageHeader} from "@gemeente-denhaag/page";
import {FormattedMessage} from "react-intl";
import {Heading2, Paragraph} from "@gemeente-denhaag/typography";
import styles from "./FeaturesPage.module.scss"
import FeaturesList from "../components/FeaturesList.tsx";

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
                features={[
                    {
                        featureId: 'berichten',
                    },
                    {
                        featureId: 'openklant2',
                    }
                ]}
            />
        </div>
    </PageGrid>
};

export default FeaturesPage;
