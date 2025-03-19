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
import BerichtenFeatureConfiguration from "../components/features/BerichtenFeatureConfiguration.tsx";
import {FC} from "react";
import FeatureConfigurationProps from "../interfaces/FeatureConfigurationProps.ts";
import TaakFeatureConfiguration from "../components/features/TaakFeatureConfiguration.tsx";
import ObjectsApiFeatureConfiguration from "../components/features/ObjectsApiFeatureConfiguration.tsx";

interface FeatureConfiguration {
    featureId: string;
    featureConfigurationPrefix: string;
    featureComponent: FC<FeatureConfigurationProps>;
}

export const features: FeatureConfiguration[] = [
    {
        featureId: "taak",
        featureConfigurationPrefix: "nl-portal.config.taak",
        featureComponent: TaakFeatureConfiguration
    },
    {
        featureId: "berichten",
        featureConfigurationPrefix: "nl-portal.config.berichten",
        featureComponent: BerichtenFeatureConfiguration
    },
    {
        featureId: "objectsapi",
        featureConfigurationPrefix: "nl-portal-config.objectsapi",
        featureComponent: ObjectsApiFeatureConfiguration
    }
]
