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

import {Button} from "@gemeente-denhaag/button";
import {useNavigate, useParams} from "react-router-dom";
import {paths} from "../constants/paths";
import {PageGrid, Skeleton} from "@nl-portal/nl-portal-user-interface";
import {PageHeader} from "@gemeente-denhaag/page";
import {Heading2, Heading3} from "@gemeente-denhaag/typography";
import styles from './FeatureConfigurationPage.module.scss'
import {FormattedMessage} from "react-intl";
import {features} from "../constants/features.tsx";
import {createElement, useEffect, useState} from "react";
import useConfigurationPropertyMapper from "../hooks/useConfigurationPropertyMapperHook.tsx";
import useConfigurationsByFeature from "../hooks/useConfigurationsByFeatureQuery.tsx";
import useConfigurations from "../hooks/useConfigurationsMutation.tsx";

const FeatureConfigurationPage = () => {
    const {featureId} = useParams();
    const navigate = useNavigate();
    const feature = features.find(it => it.featureId == featureId);
    const configurationMapper = useConfigurationPropertyMapper();
    const configurations = useConfigurationsByFeature({featurePrefix: feature?.featureConfigurationPrefix});
    const {mutate: mutateConfigurations, isSuccess: mutateConfigurationsSuccess} = useConfigurations();
    const [prefillFeatureConfig, setPrefillFeatureConfig] = useState<object | undefined>();
    const [featureConfig, setFeatureConfig] = useState<object | undefined>();
    const [isValid, setIsValid] = useState<boolean>(false);
    const handleChange = (configuration: object | undefined) => {
        setFeatureConfig(configuration)
    };
    const handleValid = (isValid: boolean) => {
        setIsValid(prefillFeatureConfig != featureConfig ? isValid : false);
    };
    const saveFeatureConfiguration = () => {
        if (featureConfig) {
            const configurationProperties =
                configurationMapper.toProperties(featureConfig, feature?.featureConfigurationPrefix);
            if (configurationProperties.length > 0) {
                mutateConfigurations(configurationProperties);
            }
        }
    };

    useEffect(() => {
        if (mutateConfigurationsSuccess) {
            setPrefillFeatureConfig(featureConfig)
        }
    }, [mutateConfigurationsSuccess])

    useEffect(() => {
        if (configurations.data) {
            const config: object =
                configurationMapper.parseProperties(configurations.data, feature?.featureConfigurationPrefix);
            setPrefillFeatureConfig(config);
        }
    }, [configurations.data])

    if (configurations.isLoading) {
        return (
            <section>
                <Skeleton height={60}/>
            </section>
        );
    }

    if (configurations.isError)
        return (
            <section>
                <Heading3>
                    <FormattedMessage
                        id={"features.config.configurationsError"}
                        values={{featureId: feature?.featureId}}
                    />
                </Heading3>
            </section>
        );

    return (
        <PageGrid>
            <PageHeader>
                <Heading2><FormattedMessage id={"features." + featureId}/></Heading2>
            </PageHeader>
            <div className={styles["feature-config__content"]}>
                {(
                    feature?.featureComponent &&
                    configurations &&
                    createElement(feature?.featureComponent, {
                        featureConfiguration: prefillFeatureConfig,
                        onValid: handleValid,
                        onChange: handleChange
                    })
                )}
            </div>
            <div>
                <div className={styles["feature-config__buttons"]}>
                    <Button
                        className={styles["feature-config__button"]}
                        onClick={saveFeatureConfiguration}
                        disabled={!isValid}
                    >
                        <FormattedMessage id={"features.config.save"}></FormattedMessage>
                    </Button>
                    <Button
                        variant="secondary-action"
                        className={styles["feature-config__button"]}
                        onClick={() => navigate(paths.features)}
                        disabled={false}
                    >
                        <FormattedMessage id={"features.config.cancel"}></FormattedMessage>
                    </Button>
                </div>
            </div>
        </PageGrid>
    );
};

export default FeatureConfigurationPage;
