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
import TaakFeatureConfiguration from "../components/features/TaakFeatureConfiguration.tsx";
import ObjectsApiFeatureConfiguration from "../components/features/ObjectsApiFeatureConfiguration.tsx";
import CatalogiApiFeatureConfiguration from "../components/features/CatalogiApiFeatureConfiguration.tsx";
import ProductFeatureConfiguration from "../components/features/ProductFeatureConfiguration.tsx";
import DmnFeatureConfiguration from "../components/features/DmnFeatureConfiguration.tsx";
import PrefillFeatureConfiguration from "../components/features/PrefillFeatureConfiguration.tsx";
import BesluitenApiFeatureConfiguration from "../components/features/BesluitenApiFeatureConfiguration.tsx";
import OpenKlant2FeatureConfiguration from "../components/features/OpenKlant2FeatureConfiguration.tsx";
import FeatureConfiguration from "../interfaces/FeatureConfiguration.ts";

export const features: FeatureConfiguration[] = [
    {
        featureId: 'catalogiapi',
        featureConfigurationPrefix: "nl-portal.config.catalogiapi",
        featureComponent: CatalogiApiFeatureConfiguration,
    },
    {
        featureId: 'besluitenapi',
        featureConfigurationPrefix: "nl-portal.config.besluitenapi",
        featureComponent: BesluitenApiFeatureConfiguration,
    },
    {
        featureId: "objectsapi",
        featureConfigurationPrefix: "nl-portal.config.objectsapi",
        featureComponent: ObjectsApiFeatureConfiguration
    },
    {
        featureId: "openklant2",
        featureConfigurationPrefix: "nl-portal.config.openklant2",
        featureComponent: OpenKlant2FeatureConfiguration
    },
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
        featureId: "product",
        featureConfigurationPrefix: "nl-portal.config.product",
        featureComponent: ProductFeatureConfiguration
    },
    {
        featureId: "dmn",
        featureConfigurationPrefix: "nl-portal.config.dmn",
        featureComponent: DmnFeatureConfiguration
    },
    {
        featureId: "prefill",
        featureConfigurationPrefix: "nl-portal.config.prefill",
        featureComponent: PrefillFeatureConfiguration
    }
]
