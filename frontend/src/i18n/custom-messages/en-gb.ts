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

import {DEFAULT_LOCALES, Messages} from "@nl-portal/nl-portal-localization";

export const EN_GB_MESSAGES: Messages = {
  [DEFAULT_LOCALES.ENGLISH]: {
    "api.save.error": "Something went wrong. Please try again later.",
    "api.save.success": "Changes were successfully saved. 🎉",
    "featuresPage.title": "Features",
    "featuresPage.subtitle": "This is where you can configure the various features of NL Portal.",
    "features.feature": "Feature",
    "features.feature.enabled.true": "Enabled",
    "features.feature.enabled.false": "Disabled",
    "features.configure": "Configure",
    "features.config.configurations-error": "Failed to load {featureId} configuration.",
    "features.config.save": "Save",
    "features.config.cancel": "Cancel",
    "features.config.back": "Back",
    "features.berichten": "Messages",
    "features.berichten.configuration": "Configuration",
    "features.berichten.bericht-object-type-url": "Message Objecttype Url:",
    "features.berichten.bericht-object-type-url.description": "A url towards the Message object type in Objecttypen API",
    "features.openklant2": "OpenKlant 2",
    "features.taak": "Task",
    "features.taak.configuration": "Configuration",
    "features.taak.type-url": "Task Object Type Url",
    "features.taak.type-url.description": "The url pointing towards the task object type in Objecttypen API",
    "features.taak.type-url-v2": "External User Task Object Type Url",
    "features.taak.type-url-v2.description": "The url pointing towards the external user task object type in Objecttypen API",
    "features.objectsapi": "Objects API",
    "features.objectsapi.configuration": "Configuration",
    "features.objectsapi.url": "Objects Api Url",
    "features.objectsapi.url.description": "The base url of Objects API",
    "features.objectsapi.token": "Objects Api Token",
    "features.objectsapi.token.description": "The token that should be used for authenticating requests to Objects API",
    "features.catalogiapi": "Catalogi API",
    "features.catalogiapi.configuration": "Feature Configuration",
    "features.catalogiapi.url": "Catalogi API Url",
    "features.catalogiapi.url.description": "The base url of the Catalogi API",
    "features.catalogiapi.client-id": "Catalogi Api Client Id",
    "features.catalogiapi.client-id.description": "The client id that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.catalogiapi.secret": "Catalogi Api Secret",
    "features.catalogiapi.secret.description": "The secret that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.product": "Product",
    "features.product.configuration": "Configuration",
    "features.product.product-type-url": "Product type Url",
    "features.product.product-type-url.description": "The Url towards the Product object type in Objecttypen API",
    "features.product.product-instantie-type-url": "Product instance object type Url",
    "features.product.product-instantie-type-url.description": "The Url towards the Product instance object type in Objecttypen API",
    "features.product.product-details-type-url": "Product details object type Url",
    "features.product.product-details-type-url.description": "The Url towards the Product details object type in Objecttypen API",
    "features.product.product-verbruiks-object-type-url": "Product consumable object type Url",
    "features.product.product-verbruiks-object-type-url.description": "The Url towards the Product consumable object type in Objecttypen API",
    "features.dmn": "DMN",
    "features.dmn.configuration": "Module Configuration",
    "features.dmn.url": "Camunda DMN API base Url",
    "features.dmn.url.description": "The base url of the Camunda DMN API that will be used to execute decisions",
    "features.dmn.client-id": "Client Id",
    "features.dmn.client-id.description": "The client id that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.dmn.secret": "Secret",
    "features.dmn.secret.description": "The secret that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.dmn.username": "Username",
    "features.dmn.username.description": "The username that should be used for authenticating request (in case of Basic Authentication)",
    "features.dmn.password": "Password",
    "features.dmn.password.description": "The password that should be used for authenticating request (in case of Basic Authentication)",
    "features.prefill": "Prefill",
    "features.prefill.configuration": "Module Configuration",
    "features.prefill.type-url":"Prefill objecttype Url",
    "features.prefill.type-url.description":"The Url towards the Prefill object type in Objecttypen API",
    "features.prefill.prefill-sha-version":"Prefill object SHA hash version",
    "features.prefill.prefill-sha-version.description":"The SHA hash version that is used to hash the prefill object",
  },
};
