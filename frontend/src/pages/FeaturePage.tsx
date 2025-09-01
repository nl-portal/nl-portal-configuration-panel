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
import {PageHeader} from "@gemeente-denhaag/page";
import {Heading2, Heading3, Heading4} from "@gemeente-denhaag/typography";
import styles from './FeaturePage.module.scss'
import {FormattedMessage} from "react-intl";
import {features} from "../constants/features.tsx";
import {createElement, useCallback, useEffect, useState} from "react";
import useConfigurationPropertyMapper from "../hooks/useConfigurationPropertyMapperHook.tsx";
import useConfigurationsByFeature from "../hooks/useConfigurationsByFeatureQuery.tsx";
import Skeleton from "react-loading-skeleton";
import PageGrid from "../components/PageGrid.tsx";
import useConfigurationsMutation from "../hooks/useConfigurationsMutation.tsx";
import {toast} from "react-toastify";
import _ from "lodash";
import useDeleteConfigurationsByFeatureMutation from "../hooks/useDeleteConfigurationsByFeatureMutation.tsx";
import BackLink from "../components/BackLink.tsx";

const FeaturePage = () => {
    const {featureId} = useParams();
    const navigate = useNavigate();
    const feature = features.find(it => it.featureId == featureId);
    const {parseProperties, toProperties} = useConfigurationPropertyMapper();
    const {
        data: featureConfigurations,
        isLoading: featureConfigurationsLoading,
        isError: featureConfigurationsError
    } = useConfigurationsByFeature({featurePrefix: feature?.featureConfigurationPrefix});
    const {
        mutate: mutateConfigurations,
        isSuccess: mutateConfigurationsSuccess,
        isError: mutateConfigurationsError
    } = useConfigurationsMutation();
    const {
        mutate: deleteConfigurations,
        isError: deleteConfigurationsError
    } = useDeleteConfigurationsByFeatureMutation({featurePrefix: feature?.featureConfigurationPrefix});
    const [prefilledConfig, setPrefilledConfig] = useState<object | undefined>(undefined);
    const [modifiedConfig, setModifiedConfig] = useState<object>({});
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(true);

    const handleChange = useCallback((configuration: object) => {
        const configHasChanged = !_.isEqual(prefilledConfig, configuration)
        if (configHasChanged) {
            setModifiedConfig(configuration)
            setIsDirty(true)
        }
    }, [prefilledConfig]);

    const handleValid = (isValid: boolean) => {
        setIsValid(isValid)
    };

    const handleSubmit = () => {
        if (isDirty) {
            setIsDirty(false)
            const configurationProperties =
                toProperties(modifiedConfig, feature?.featureConfigurationPrefix);
            if (configurationProperties.length > 0) {
                deleteConfigurations(undefined, {
                    onSuccess: () => {
                        mutateConfigurations(configurationProperties);
                    }
                });
            }
        }
    };

    useEffect(() => {
        if (mutateConfigurationsSuccess) {
            toast(
                <>
                    <Heading4>
                        <FormattedMessage id={"api.save.success"}/>
                    </Heading4>
                </>
            )
            setPrefilledConfig(modifiedConfig)
        }
        if (mutateConfigurationsError || deleteConfigurationsError) {
            toast(<FormattedMessage id={"api.save.error"}/>)
            setIsDirty(true)
        }
    }, [mutateConfigurationsSuccess, mutateConfigurationsError, deleteConfigurationsError])

    useEffect(() => {
        if (featureConfigurations) {
            const prefillData
                = parseProperties(featureConfigurations, feature?.featureConfigurationPrefix)
            setPrefilledConfig(prefillData);
        }
    }, [featureConfigurations])

    if (featureConfigurationsLoading) {
        return (
            <section>
                <Skeleton height={60}/>
            </section>
        );
    }

    if (featureConfigurationsError)
        return (
            <section>
                <BackLink href={paths.configuration} children={
                    <Heading4>
                        <FormattedMessage id={"features.config.back"}></FormattedMessage>
                    </Heading4>
                }>
                </BackLink>
                <Heading3>
                    <FormattedMessage
                        id={"features.config.loading-error"}
                        values={{featureId: feature?.featureId}}
                    />
                </Heading3>
            </section>
        );

    return (
        <PageGrid>
            <PageHeader>
                <BackLink href={paths.configuration} children={
                    <Heading4>
                        <FormattedMessage id={"action.back"}></FormattedMessage>
                    </Heading4>
                }>
                </BackLink>
                <Heading2><FormattedMessage id={"features." + featureId}/></Heading2>
            </PageHeader>
            <div className={styles["feature-config__content"]}>
                {(
                    feature?.featureComponent &&
                    featureConfigurations &&
                    createElement(feature?.featureComponent, {
                        prefillConfiguration: prefilledConfig,
                        onChange: (formData: object) => {
                            handleChange(formData)
                        },
                        onValid: (isValid) => handleValid(isValid),
                        onSubmit: () => handleSubmit()
                    })
                )}
            </div>
            <div>
                <div className={styles["feature-config__buttons"]}>
                    <Button
                        className={styles["feature-config__button"]}
                        onClick={() => {
                            handleSubmit()
                        }}
                        disabled={!isDirty || !isValid}
                        type={"submit"}
                        form={"configuration-form"}
                    >
                        <FormattedMessage id={"action.save"}></FormattedMessage>
                    </Button>
                    <Button
                        variant="secondary-action"
                        className={styles["feature-config__button"]}
                        onClick={() => navigate(paths.configuration)}
                        disabled={false}
                    >
                        <FormattedMessage id={isDirty
                            ? "action.cancel"
                            : "action.back"}></FormattedMessage>
                    </Button>
                </div>
            </div>
        </PageGrid>
    );
};

export default FeaturePage;
