import {Fragment} from "react";
import {FormattedMessage} from "react-intl";
import styles from "./FeaturesList.module.scss";
import {Link} from "@gemeente-denhaag/link";
import {Paragraph} from "@gemeente-denhaag/typography";
import {CellObject, PortalLink, Table} from "@nl-portal/nl-portal-user-interface";
import {EditIcon} from "@gemeente-denhaag/icons";

interface FeaturesListProps {
    features: Array<{
        featureId: string;
    }>;
}

const FeaturesList = ({features}: FeaturesListProps) => {

    return (
        <Fragment>
            <Table
                headers={[
                    {
                        key: "features",
                        head: true,
                        children: <Paragraph><b><FormattedMessage id={"features.feature"}/></b></Paragraph>,
                    },
                ]}
                rows={features.map(({featureId}) => (
                        [
                            <span className={styles["features-list__header"]}>
                                <Paragraph><FormattedMessage id={"features." + featureId}/></Paragraph>
                            </span>,
                            <Link
                                href={`/features/${featureId}`}
                                icon={<EditIcon/>}
                                Link={PortalLink}
                                iconAlign="start"
                            >
                                <div className={styles["features-list__value-edit"]}>
                                    <Paragraph><FormattedMessage id={"features.configure"}/></Paragraph>
                                </div>
                            </Link>
                        ]
                    )
                ) as unknown as CellObject[][]
                }
            />
        </Fragment>
    )
}

export default FeaturesList;
