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

import { DEFAULT_LOCALES, Messages } from "@nl-portal/nl-portal-localization";

export const EN_GB_MESSAGES: Messages = {
  [DEFAULT_LOCALES.ENGLISH]: {
    // i18n.language.*
    "i18n.language.en-GB": "English",
    "i18n.language.nl-NL": "Dutch",
    // action.*
    "action.save": "Save",
    "action.cancel": "Cancel",
    "action.back": "Back",
    "action.delete": "Delete",
    "action.reset": "Reset",
    // api.*
    "api.error": "Something went wrong. Please try again later.",
    "api.save.success": "Changes were successfully saved.",
    "api.upload.success": "Uploading succeeded.",
    "api.upload.error": "Something went wrong while uploading.",
    // configuration.*
    "configuration.title": "NL Portal Configuration",
    "configuration.subtitle":
      "This is where you can configure the various features of NL Portal.",
    "configuration.configure": "Configure",
    "configuration.features": "Features",
    "configuration.theme": "Theme Configuration",
    // features.config.*
    "features.config.loading-error":
      "Failed to load {featureId} configuration.",
    // features.feature.*
    "features.feature.enabled": "Enabled",
    "features.feature.enabled.description":
      "Enabling or disabling features triggers a quick restart in any NL Portal instances configured in the CONFIG_NOTIFY_LIST environment variable.",
    "features.feature.configuration": "Configuration",
    "features.feature.configuration.properties": "Properties",
    // theme.logo.*
    "theme.logo": "Theme Logo",
    "theme.logo.existing-logos": "Existing Theme Logo",
    "theme.logo.existing-logos.description":
      "This is the existing theme logo configuration for the current NL Portal application",
    "theme.logo.label": "Logo",
    "theme.logo.description":
      "The Logo that is being served to this application",
    "theme.logo.upload-theme-logo.label": "Upload a Logo",
    "theme.logo.upload-theme-logo.description":
      "Upload an image file to use as the logo of the current NL Portal application.",
    "theme.logo.select-file": "Select File",
    "theme.logo.no-existing-logos":
      "No logo found for current NL Portal application",
    // theme.style.*
    "theme.style": "Theme Style",
    "theme.style.add-theme-style.label": "Add Theme Style",
    "theme.style.add-theme-style.description":
      "Add a new theme style configuration for the current NL Portal application",
    "theme.style.add-another": "Add a theme style",
    "theme.style.existing-styles": "Existing Theme Style",
    "theme.style.existing-styles.description":
      "This is the existing theme style configuration for the current NL Portal application",
    "theme.style.stylesheet.label": "Stylesheet",
    "theme.style.stylesheet.description":
      "Define your styles or override style tokens. <linkUrl>Click here</linkUrl> to see a list of all available NLDS tokens.",
    "theme.style.no-existing-styles":
      "No style found for current NL Portal application",
    // features.berichten.*
    "features.berichten": "Messages",
    "features.berichten.bericht-object-type-url": "Message Objecttype Url:",
    "features.berichten.bericht-object-type-url.description":
      "A url towards the Message object type in Objecttypen API",
    // features.openklant2.*
    "features.openklant2": "OpenKlant 2",
    "features.openklant2.configuration": "Module configuration",
    "features.openklant2.klantinteracties-api-url": "Klantinteracties Api Url",
    "features.openklant2.klantinteracties-api-url.description":
      "The base url of the Klantinteracties API",
    "features.openklant2.contactgegevens-api-url": "Contactgegevens Api Url",
    "features.openklant2.contactgegevens-api-url.description":
      "The base url of the Contactgegevens API",
    "features.openklant2.token": "OpenKlant 2 Token",
    "features.openklant2.token.description":
      "The token that should be used for authenticating requests to Objects API",
    // features.haalcentraal-brp.*
    "features.haalcentraal-brp": "HaalCentraal BRP",
    "features.haalcentraal-brp.configuration": "Module configuration",
    "features.haalcentraal-brp.url": "HaalCentraal BRP Api Url",
    "features.haalcentraal-brp.url.description":
      "The base url of the HaalCentraal BRP API",
    "features.haalcentraal-brp.api-key": "HaalCentraal BRP Api Key",
    "features.haalcentraal-brp.api-key.description":
      "The secret that should be used for authenticating requests",
    // features.haalcentraal-hr.*
    "features.haalcentraal-hr": "HaalCentraal HR",
    "features.haalcentraal-hr.configuration": "Module configuration",
    "features.haalcentraal-hr.url": "HaalCentraal HR Api Url",
    "features.haalcentraal-hr.url.description":
      "The base url of the HaalCentraal Handelsregister API",
    "features.haalcentraal-hr.api-key": "HaalCentraal HR Api Key",
    "features.haalcentraal-hr.api-key.description":
      "The secret that should be used for authenticating requests",
    // features.haalcentraal2.*
    "features.haalcentraal2": "HaalCentraal 2",
    "features.haalcentraal2.configuration": "Module configuration",
    "features.haalcentraal2.brp-api-url": "HaalCentraal 2 BRP Api Url",
    "features.haalcentraal2.brp-api-url.description":
      "The base url of the HaalCentraal 2 BRP API",
    "features.haalcentraal2.bewoning-api-url":
      "HaalCentraal 2 Bewoning Api Url",
    "features.haalcentraal2.bewoning-api-url.description":
      "The base url of the HaalCentraal 2 Bewoning API",
    "features.haalcentraal2.api-key": "HaalCentraal 2 Api Key",
    "features.haalcentraal2.api-key.description":
      "The secret that should be used for authenticating requests",
    // features.taak.*
    "features.taak": "Task",
    "features.taak.object-type-url": "External User Task Object Type Url",
    "features.taak.object-type-url.description":
      "The url pointing towards the external user task object type in Objecttypen API",
    // features.objectsapi.*
    "features.objectsapi": "Objects API",
    "features.objectsapi.url": "Objects Api Url",
    "features.objectsapi.url.description": "The base url of Objects API",
    "features.objectsapi.token": "Objects Api Token",
    "features.objectsapi.token.description":
      "The token that should be used for authenticating requests to Objects API",
    // features.catalogiapi.*
    "features.catalogiapi": "Catalogi API",
    "features.catalogiapi.url": "Catalogi API Url",
    "features.catalogiapi.url.description": "The base url of the Catalogi API",
    "features.catalogiapi.client-id": "Catalogi Api Client Id",
    "features.catalogiapi.client-id.description":
      "The client id that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.catalogiapi.secret": "Catalogi Api Secret",
    "features.catalogiapi.secret.description":
      "The secret that should be used for authenticating requests (in case of Access Token Authentication)",
    // features.besluitenapi.*
    "features.besluitenapi": "Besluiten API",
    "features.besluitenapi.url": "Besluiten API Url",
    "features.besluitenapi.url.description":
      "The base url of the Besluiten API",
    "features.besluitenapi.client-id": "Besluiten API Client Id",
    "features.besluitenapi.client-id.description":
      "The client id that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.besluitenapi.secret": "Besluiten API Secret",
    "features.besluitenapi.secret.description":
      "The secret that should be used for authenticating requests (in case of Access Token Authentication)",
    // features.product.*
    "features.product": "Product",
    "features.product.product-type-url": "Product type Url",
    "features.product.product-type-url.description":
      "The Url towards the Product object type in Objecttypen API",
    "features.product.product-instantie-type-url":
      "Product instance object type Url",
    "features.product.product-instantie-type-url.description":
      "The Url towards the Product instance object type in Objecttypen API",
    "features.product.product-details-type-url":
      "Product details object type Url",
    "features.product.product-details-type-url.description":
      "The Url towards the Product details object type in Objecttypen API",
    "features.product.product-verbruiks-object-type-url":
      "Product consumable object type Url",
    "features.product.product-verbruiks-object-type-url.description":
      "The Url towards the Product consumable object type in Objecttypen API",
    // features.openproduct.*
    "features.openproduct": "OpenProduct API",
    "features.openproduct.configuration": "Module configuration",
    "features.openproduct.token": "OpenProduct Token",
    "features.openproduct.token.description":
      "The token that should be used to authorize with the OpenProduct service",
    "features.openproduct.product-api-url": "OpenProduct API Url",
    "features.openproduct.product-api-url.description":
      "The base url of the OpenProduct API",
    "features.openproduct.product-type-api-url":
      "OpenProduct product type API Url",
    "features.openproduct.product-type-api-url.description":
      "The base url of the OpenProduct product type API",
    // features.openproduct.dmn.*
    "features.openproduct.dmn": "DMN",
    "features.openproduct.dmn.clientId": "Client Id",
    "features.openproduct.dmn.clientId.description":
      "The client id that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.openproduct.dmn.secret": "Secret",
    "features.openproduct.dmn.secret.description":
      "The secret that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.openproduct.dmn.username": "Username",
    "features.openproduct.dmn.username.description":
      "The username that should be used for authenticating request (in case of Basic Authentication)",
    "features.openproduct.dmn.password": "Password",
    "features.openproduct.dmn.password.description":
      "The password that should be used for authenticating request (in case of Basic Authentication)",
    // features.dmn.*
    "features.dmn": "DMN",
    "features.dmn.configuration": "Module Configuration",
    "features.dmn.url": "Camunda DMN API base Url",
    "features.dmn.url.description":
      "The base url of the Camunda DMN API that will be used to execute decisions",
    "features.dmn.client-id": "Client Id",
    "features.dmn.client-id.description":
      "The client id that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.dmn.secret": "Secret",
    "features.dmn.secret.description":
      "The secret that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.dmn.username": "Username",
    "features.dmn.username.description":
      "The username that should be used for authenticating request (in case of Basic Authentication)",
    "features.dmn.password": "Password",
    "features.dmn.password.description":
      "The password that should be used for authenticating request (in case of Basic Authentication)",
    // features.prefill.*
    "features.prefill": "Prefill",
    "features.prefill.configuration": "Module Configuration",
    "features.prefill.type-url": "Prefill objecttype Url",
    "features.prefill.type-url.description":
      "The Url towards the Prefill object type in Objecttypen API",
    "features.prefill.prefill-sha-version": "Prefill object SHA hash version",
    "features.prefill.prefill-sha-version.description":
      "The SHA hash version that is used to hash the prefill object",
    // features.zakenapi.*
    "features.zakenapi": "Zaken API",
    "features.zakenapi.url": "Zaken API Url",
    "features.zakenapi.url.description": "The base url of the Zaken API",
    "features.zakenapi.client-id": "Zaken Api Client Id",
    "features.zakenapi.client-id.description":
      "The client id that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.zakenapi.secret": "Zaken Api Secret",
    "features.zakenapi.secret.description":
      "The secret that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.zakenapi.use-nnp-kvk-query-identificators":
      "Use NNP KVK Query Identificators",
    "features.zakenapi.use-nnp-kvk-query-identificators.description":
      "Use NNP KVK number as query identificator when retrieving zaken",
    // features.zakenapi.zaak-documenten-config.*
    "features.zakenapi.zaak-documenten-config.vertrouwelijkheidsaanduiding-whitelist":
      "Case information object confidentiality whitelist",
    "features.zakenapi.zaak-documenten-config.vertrouwelijkheidsaanduiding-whitelist.description":
      "Limit which information objects are allowed to be shown to the end user by their confidentiality indication. If none are selected, all information objects will be shown.",
    "features.zakenapi.zaak-documenten-config.status-whitelist":
      "Case information object status whitelist",
    "features.zakenapi.zaak-documenten-config.status-whitelist.description":
      "Limit which information objects are allowed to be shown to the end user by their status. If no statuses are whitelisted, all information objects will be shown.",
    "features.zakenapi.zaak-types-ids-excluded": "Exclude zaaktype uuids",
    "features.zakenapi.zaak-types-ids-excluded.description":
      "Exclude zaaktype uuid's as extra filter on the get zaken query.",
    // features.documentenapis.*
    "features.documentenapis": "Documenten APIs",
    "features.documentenapis.configurations.add-another":
      "Add another configuration",
    "features.documentenapis.configurations.add-another.description":
      "Add another Documenten API configuration.",
    "features.documentenapis.configurations.configuration-name":
      "example-documenten-api-configuration",
    "features.documentenapis.url": "Documenten API Url",
    "features.documentenapis.url.description":
      "The base url of the Documenten API",
    "features.documentenapis.client-id": "Documenten Api Client Id",
    "features.documentenapis.client-id.description":
      "The client id that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.documentenapis.secret": "Documenten Api Secret",
    "features.documentenapis.secret.description":
      "The secret that should be used for authenticating requests (in case of Access Token Authentication)",
    "features.documentenapis.rsin": "RSIN",
    "features.documentenapis.rsin.description":
      "The RSIN of the company responsible for the Catalogue that contains the information object type",
    "features.documentenapis.document-type-url": "Information object type Url",
    "features.documentenapis.document-type-url.description":
      "A url towards the default information object type in the Catalogi API for this configuration",
    "features.documentenapis.default-document-api":
      "Default Documenten API configuration",
    "features.documentenapis.default-document-api.description":
      "The configuration that should be used by default",
    // features.payment.ogone.*
    "features.payment-ogone": "Ogone Payment",
    "features.payment.ogone.profile": "Profile",
    "features.payment.ogone.url": "Payment API URL",
    "features.payment.ogone.url.description":
      "The baseurl of the to use Ogone Payment API",
    "features.payment.ogone.sha-out-parameters": "SHA-OUT parameters",
    "features.payment.ogone.sha-out-parameters.description":
      "The payment return parameters that should be validated",
    "features.payment.ogone.title": "Title",
    "features.payment.ogone.title.description":
      "A human readable title for the payment requests",
    "features.payment.ogone.psp-id": "PSPID",
    "features.payment.ogone.psp-id.description":
      "The payment service provider ID for your Ogone account",
    "features.payment.ogone.language": "Language",
    "features.payment.ogone.language.description":
      "The Language that should be used for the Checkout",
    "features.payment.ogone.sha-in-key": "SHA-IN Key",
    "features.payment.ogone.sha-in-key.description":
      "The secret key used to encrypt the fields in the payment request",
    "features.payment.ogone.sha-out-key": "SHA-OUT Key",
    "features.payment.ogone.sha-out-key.description":
      "The secret key used to validate payment fields in a payment callback",
    "features.payment.ogone.sha-version": "SHA Version",
    "features.payment.ogone.sha-version.description":
      "Which SHA version to use for encoding and validating payments",
    "features.payment.ogone.failure-url": "Failure URL",
    "features.payment.ogone.failure-url.description":
      "The URL Ogone should redirect to in case of a negative result (decline, cancel, exception...)",
    "features.payment.ogone.success-url": "Success URL",
    "features.payment.ogone.success-url.description":
      "The URL Ogone should redirect to in case of a positive result (accept)",
    "features.payment.ogone.profiles.add-another": "Add another",
    "features.payment.ogone.profiles.add-another.description":
      "Add another payment profile",
    "features.payment.ogone.profiles.profile-name":
      "example-ogone-payment-profile",
    // features.payment.direct.*
    "features.payment-direct": "Direct Payment",
    "features.payment.direct.profile": "Profile",
    "features.payment.direct.url": "Payment API URL",
    "features.payment.direct.url.description":
      "The Online Payments platform API endpoint",
    "features.payment.direct.sha-out-parameters": "SHA-OUT parameters",
    "features.payment.direct.sha-out-parameters.description":
      "The payment return parameters that should be validated",
    "features.payment.direct.webhook-url": "Webhook URL",
    "features.payment.direct.webhook-url.description":
      "The URL where the webhook will be dispatched for all status change events related to this payment",
    "features.payment.direct.title": "Title",
    "features.payment.direct.title.description":
      "A human readable title for the payment requests",
    "features.payment.direct.psp-id": "PSPID",
    "features.payment.direct.psp-id.description":
      "The payment service provider ID (merchant ID) for your Direct account",
    "features.payment.direct.language": "Language",
    "features.payment.direct.language.description":
      "The Language that should be used for the Checkout",
    "features.payment.direct.currency": "Currency",
    "features.payment.direct.currency.description":
      "The currency that should be used for this payment profile denoted in the ISO 4217 standard",
    "features.payment.direct.return-url": "Return URL",
    "features.payment.direct.return-url.description":
      "The URL Direct should redirect to after checkout",
    "features.payment.direct.api-key": "API Key Id",
    "features.payment.direct.api-key.description":
      "The id used for authorization",
    "features.payment.direct.api-secret": "API Secret",
    "features.payment.direct.api-secret.description":
      "The secret used for authorization",
    "features.payment.direct.webhook-api-key": "Webhook API Key ID",
    "features.payment.direct.webhook-api-key.description":
      "The ID of the Webhook Key used to validate messages sent from Direct Webhooks",
    "features.payment.direct.webhook-api-secret": "Webhook API Secret",
    "features.payment.direct.webhook-api-secret.description":
      "The Webhook Key Secret used to validate messages sent from Direct Webhooks",
    "features.payment.direct.profiles.add-another": "Add another",
    "features.payment.direct.profiles.add-another.description":
      "Add another payment profile",
    "features.payment.direct.profiles.profile-name":
      "example-direct-payment-profile",
    // features.virusscan.*
    "features.virusscan-clamav": "Clam AV Virus Scanner",
    "features.virusscan.clamav.hostname": "Hostname",
    "features.virusscan.clamav.hostname.description":
      "The hostname of the ClamAV service",
    "features.virusscan.clamav.port": "Port",
    "features.virusscan.clamav.port.description":
      "The port the ClamAV service listens on",
    // zaakdocument.vertrouwelijkheidsaanduiding.*
    "zaakdocument.vertrouwelijkheidsaanduiding.openbaar": "Public",
    "zaakdocument.vertrouwelijkheidsaanduiding.beperkt_openbaar":
      "Restricted public",
    "zaakdocument.vertrouwelijkheidsaanduiding.intern": "Internal",
    "zaakdocument.vertrouwelijkheidsaanduiding.zaakvertrouwelijk":
      "Case confidential",
    "zaakdocument.vertrouwelijkheidsaanduiding.vertrouwelijk": "Private",
    "zaakdocument.vertrouwelijkheidsaanduiding.confidentieel": "Confidential",
    "zaakdocument.vertrouwelijkheidsaanduiding.geheim": "Secret",
    "zaakdocument.vertrouwelijkheidsaanduiding.zeer_geheim": "Very secret",
    // zaakdocument.status.*
    "zaakdocument.status.ter_vaststelling": "In editing",
    "zaakdocument.status.in_bewerking": "To be confirmed",
    "zaakdocument.status.definitief": "Definitive",
    "zaakdocument.status.gearchiveerd": "Archived",
  },
};
