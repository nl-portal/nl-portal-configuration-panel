import {Button} from "@gemeente-denhaag/button";
import {useNavigate, useParams} from "react-router-dom";
import {paths} from "../constants/paths";
import {PageGrid} from "@nl-portal/nl-portal-user-interface";
import {PageHeader} from "@gemeente-denhaag/page";
import {Heading2} from "@gemeente-denhaag/typography";
import styles from './FeatureConfigurationPage.module.scss'
import {FormattedMessage} from "react-intl";
import {features} from "../constants/features.tsx";
import {cloneElement, useEffect, useState} from "react";

const FeatureConfigurationPage = () => {
    const {featureId} = useParams();
    const navigate = useNavigate();
    const feature = features.find(it => it.featureId == featureId)
    const [valid, setValid] = useState<boolean>(false)
    const onSave = (): void => {
    };

    useEffect(() => {
            if (!feature) {
                navigate(paths.features)
            }
        }
        , [feature, navigate])

    return (
        <PageGrid>
            <PageHeader>
                <Heading2><FormattedMessage id={"features." + featureId}/></Heading2>
            </PageHeader>
            <div className={styles["feature-config__content"]}>
                {(
                    feature?.featureComponent && cloneElement(feature?.featureComponent, {onValid: setValid, onSave: onSave})
                )}
            </div>
            <div>
                <div className={styles["feature-config__buttons"]}>
                    <Button
                        className={styles["feature-config__button"]}
                        onClick={onSave}
                        disabled={!valid}
                    >
                        Save
                    </Button>
                    <Button
                        variant="secondary-action"
                        className={styles["feature-config__button"]}
                        onClick={() => navigate(paths.features)}
                        disabled={false}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </PageGrid>
    );
};

export default FeatureConfigurationPage;
