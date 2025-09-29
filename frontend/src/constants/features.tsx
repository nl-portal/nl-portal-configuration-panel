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
import FeatureConfiguration from "../interfaces/FeatureConfiguration.ts";
import BerichtenFeatureConfiguration from "../components/feature-components/BerichtenFeatureConfiguration.tsx";
import TaakFeatureConfiguration from "../components/feature-components/TaakFeatureConfiguration.tsx";
import ObjectsApiFeatureConfiguration from "../components/feature-components/ObjectsApiFeatureConfiguration.tsx";
import CatalogiApiFeatureConfiguration from "../components/feature-components/CatalogiApiFeatureConfiguration.tsx";
import ProductFeatureConfiguration from "../components/feature-components/ProductFeatureConfiguration.tsx";
import DmnFeatureConfiguration from "../components/feature-components/DmnFeatureConfiguration.tsx";
import PrefillFeatureConfiguration from "../components/feature-components/PrefillFeatureConfiguration.tsx";
import BesluitenApiFeatureConfiguration from "../components/feature-components/BesluitenApiFeatureConfiguration.tsx";
import OpenKlant2FeatureConfiguration from "../components/feature-components/OpenKlant2FeatureConfiguration.tsx";
import HaalCentraalBrpFeatureConfiguration from "../components/feature-components/HaalCentraalBrpFeatureConfiguration.tsx";
import HaalCentraalHrFeatureConfiguration from "../components/feature-components/HaalCentraalHrFeatureConfiguration.tsx";
import ZakenApiFeatureConfiguration from "../components/feature-components/ZakenApiFeatureConfiguration.tsx";
import DocumentenApisFeatureConfiguration from "../components/feature-components/DocumentenApisFeatureConfiguration.tsx";
import OgonePaymentFeatureConfiguration from "../components/feature-components/OgonePaymentFeatureConfiguration.tsx";
import ClamAVFeatureConfiguration from "../components/feature-components/ClamAVFeatureConfiguration.tsx";
import DirectPaymentFeatureConfiguration from "../components/feature-components/DirectPaymentFeatureConfiguration.tsx";
import HaalCentraal2FeatureConfiguration from "../components/feature-components/HaalCentraal2FeatureConfiguration.tsx";

export const features: FeatureConfiguration[] = [
  {
    featureId: "zakenapi",
    featureConfigurationPrefix: "nl-portal.config.zakenapi",
    featureComponent: ZakenApiFeatureConfiguration,
  },
  {
    featureId: "catalogiapi",
    featureConfigurationPrefix: "nl-portal.config.catalogiapi",
    featureComponent: CatalogiApiFeatureConfiguration,
  },
  {
    featureId: "documentenapis",
    featureConfigurationPrefix: "nl-portal.config.documentenapis",
    featureComponent: DocumentenApisFeatureConfiguration,
  },
  {
    featureId: "besluitenapi",
    featureConfigurationPrefix: "nl-portal.config.besluitenapi",
    featureComponent: BesluitenApiFeatureConfiguration,
  },
  {
    featureId: "objectsapi",
    featureConfigurationPrefix: "nl-portal.config.objectsapi",
    featureComponent: ObjectsApiFeatureConfiguration,
  },
  {
    featureId: "openklant2",
    featureConfigurationPrefix: "nl-portal.config.openklant2",
    featureComponent: OpenKlant2FeatureConfiguration,
  },
  {
    featureId: "haalcentraal-brp",
    featureConfigurationPrefix: "nl-portal.config.haalcentraal.brp",
    featureComponent: HaalCentraalBrpFeatureConfiguration,
  },
  {
    featureId: "haalcentraal-hr",
    featureConfigurationPrefix: "nl-portal.config.haalcentraal.hr",
    featureComponent: HaalCentraalHrFeatureConfiguration,
  },
  {
    featureId: "haalcentraal2",
    featureConfigurationPrefix: "nl-portal.config.haalcentraal2",
    featureComponent: HaalCentraal2FeatureConfiguration,
  },
  {
    featureId: "taak",
    featureConfigurationPrefix: "nl-portal.config.taak",
    featureComponent: TaakFeatureConfiguration,
  },
  {
    featureId: "berichten",
    featureConfigurationPrefix: "nl-portal.config.berichten",
    featureComponent: BerichtenFeatureConfiguration,
  },
  {
    featureId: "product",
    featureConfigurationPrefix: "nl-portal.config.product",
    featureComponent: ProductFeatureConfiguration,
  },
  {
    featureId: "dmn",
    featureConfigurationPrefix: "nl-portal.config.dmn",
    featureComponent: DmnFeatureConfiguration,
  },
  {
    featureId: "prefill",
    featureConfigurationPrefix: "nl-portal.config.prefill",
    featureComponent: PrefillFeatureConfiguration,
  },
  {
    featureId: "payment-ogone",
    featureConfigurationPrefix: "nl-portal.config.payment.ogone",
    featureComponent: OgonePaymentFeatureConfiguration,
  },
  {
    featureId: "payment-direct",
    featureConfigurationPrefix: "nl-portal.config.payment.direct",
    featureComponent: DirectPaymentFeatureConfiguration,
  },
  {
    featureId: "virusscan-clamav",
    featureConfigurationPrefix: "nl-portal.config.virusscan.clamav",
    featureComponent: ClamAVFeatureConfiguration,
  },
];
