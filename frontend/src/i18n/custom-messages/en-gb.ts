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

import { DEFAULT_LOCALES, Messages } from "../locales.ts";

export const EN_GB_MESSAGES: Messages = {
  [DEFAULT_LOCALES.ENGLISH]: {
    // i18n.language.*
    "i18n.language.nl_NL": "Dutch",
    "i18n.language.en_GB": "English",
    // locales.*
    "locales.nl-NL": "Nederlands",
    "locales.en-GB": "English",
    // backlink.*
    "backlink.back": "Back",
    // action.*
    "action.save": "Save",
    "action.cancel": "Cancel",
    "action.back": "Back",
    "action.add": "Add",
    "action.delete": "Delete",
    "action.reset": "Reset",
    // api.*
    "api.error": "Something went wrong. Please try again later.",
    "api.save.success": "Changes were successfully saved.",
    "api.delete.success": "Deleted successfully.",
    "api.upload.success": "Uploading succeeded.",
    "api.upload.error": "Something went wrong while uploading.",
    // configuration.*
    "configuration.title": "NL Portal Configuration",
    "configuration.subtitle":
      "This is where you can configure the various features of NL Portal.",
    "configuration.configure": "Configure",
    "configuration.portal-interface": "Portal Interface Configuration",
    "configuration.features": "Features",
    // defaults.*
    "defaults.label": "Default: {value}",
    "defaults.not-set": "not set",
    "defaults.empty-list": "none",
    "defaults.on": "on",
    "defaults.off": "off",
    "defaults.use-default": "(NL Portal default)",
    // fields.*
    "fields.client-id.description":
      "The client id used to authenticate requests (in case of Access Token Authentication).",
    "fields.secret.description":
      "The secret used to authenticate requests (in case of Access Token Authentication).",
    "fields.zgw-url.server-root.description":
      "Server url, without the API path.",
    "fields.zgw-url.full-api.description":
      "Full API url, including the API path.",
    "fields.ssl": "SSL",
    "fields.ssl.description":
      "Client certificate and trusted certificate for this connection. Values are Spring resource locations (for example file: or classpath:), not the certificates themselves. NL Portal only applies them when Documenten APIs or HaalCentraal HR is enabled.",
    "fields.ssl.key.cert-chain": "Client certificate chain",
    "fields.ssl.key.cert-chain.description":
      "Location of the client certificate chain (PEM). Required when a client key is set.",
    "fields.ssl.key.key": "Client key",
    "fields.ssl.key.key.description":
      "Location of the client private key (PEM). Required when a certificate chain is set.",
    "fields.ssl.key.key-password": "Client key password",
    "fields.ssl.key.key-password.description":
      "Password of the client key, if it is encrypted.",
    "fields.ssl.trusted-certificate": "Trusted certificate",
    "fields.ssl.trusted-certificate.description":
      "Location of the certificate (PEM) used to verify the server.",
    "fields.profile-name.rule": "Use lowercase letters, digits, - and / only.",
    "fields.map-key.rule": "Add a name: letters, digits, - and _ only.",
    "fields.error.json":
      'Enter a valid JSON object, for example { "key": true }.',
    // upgrade-notice.*
    "upgrade-notice.title": "Configuration kept for older NL Portal versions",
    "upgrade-notice.body":
      "The following keys are no longer used by NL Portal {version}, but are kept for NL Portal instances older than {version} that are connected to this configuration panel. Delete them after all those instances have been upgraded to {version}.",
    "upgrade-notice.delete-key": "Delete {propertyKey}",
    "upgrade-notice.delete-all": "Delete all",
    "upgrade-notice.confirm-delete": "Confirm delete",
    // features.config.*
    "features.config.loading-error":
      "Failed to load {featureId} configuration.",
    // features.feature.*
    "features.feature.enabled": "Enabled",
    "features.feature.enabled.description":
      "Enabling or disabling features triggers a quick restart in any NL Portal instances configured in the CONFIG_NOTIFY_LIST environment variable.",
    "features.feature.configuration": "Configuration",
    "features.feature.configuration.properties": "Properties",
    "features.feature.requires.title": "Other features needed",
    "features.feature.requires":
      "Enabling this feature requires these features to be enabled too: {sections}",
    // features.deprecated.*
    "features.deprecated.title": "Deprecated",
    "features.deprecated.description":
      "This feature is deprecated and will be removed in a future version of NL Portal.",
    "features.deprecated.use-openproduct":
      "This feature is deprecated in NL Portal. Use Open Product instead.",
    "features.deprecated.hint": "deprecated",
    // frontend.*
    "frontend.title": "Portal interface",
    "frontend.group.account": "My details",
    "frontend.group.overview": "Overview",
    "frontend.group.cases": "Cases",
    "frontend.group.messages": "Messages",
    "frontend.group.products": "Products",
    "frontend.group.theme": "Theme",
    "frontend.group.other": "Other",
    "frontend.myInhabitantCountEnabled": "Show number of inhabitants",
    "frontend.myInhabitantCountEnabled.description":
      "Shows the number of inhabitants at the address on the My details page.",
    "frontend.myNameChangeUrl": "Name change link",
    "frontend.myNameChangeUrl.description":
      "Link to the page where residents request a name change. Hidden when not set.",
    "frontend.myGenderChangeUrl": "Gender change link",
    "frontend.myGenderChangeUrl.description":
      "Link to the page where residents request a change of gender registration. Hidden when not set.",
    "frontend.myAddressChangeUrl": "Address change link",
    "frontend.myAddressChangeUrl.description":
      "Link to the page where residents report a move. Hidden when not set.",
    "frontend.myAddressResearchUrl": "Address investigation link",
    "frontend.myAddressResearchUrl.description":
      "Link to the page where residents report someone who doesn't live at their address. Hidden when not set.",
    "frontend.myAddressResearchMoreInfoUrl":
      "Address investigation information link",
    "frontend.myAddressResearchMoreInfoUrl.description":
      "Link to more information about address investigations. Hidden when not set.",
    "frontend.myBrpChangeUrl": "BRP change link",
    "frontend.myBrpChangeUrl.description":
      "Link to the page where residents request a change to their BRP registration. Hidden when not set.",
    "frontend.myBrpConfidentiallyChangeUrl": "BRP confidentiality link",
    "frontend.myBrpConfidentiallyChangeUrl.description":
      "Link to the page where residents request confidentiality of their BRP details. Hidden when not set.",
    "frontend.overviewIntroEnabled": "Show introduction",
    "frontend.overviewIntroEnabled.description":
      "Shows the welcome title and introduction on the overview page.",
    "frontend.overviewCurrentCasesPreviewLength": "Number of current cases",
    "frontend.overviewCurrentCasesPreviewLength.description":
      "How many current cases the overview page shows. 0 hides the list.",
    "frontend.overviewCurrentTasksPreviewLength": "Number of open tasks",
    "frontend.overviewCurrentTasksPreviewLength.description":
      "How many open tasks the overview page shows.",
    "frontend.overviewCurrentTasksPreviewLength.default":
      "5 (NL Portal doesn't use this setting yet)",
    "frontend.overviewMaintenanceAlertEnabled": "Show maintenance alert",
    "frontend.overviewMaintenanceAlertEnabled.description":
      "Shows a warning on the overview page, with the title and text below.",
    "frontend.overviewMaintenanceAlertTitleNl":
      "Maintenance alert title (Dutch)",
    "frontend.overviewMaintenanceAlertTitleNl.description":
      "Shown for every language except English. Fill in both languages: there is no fallback.",
    "frontend.overviewMaintenanceAlertTextNl": "Maintenance alert text (Dutch)",
    "frontend.overviewMaintenanceAlertTextNl.description":
      "Shown for every language except English. Fill in both languages: there is no fallback.",
    "frontend.overviewMaintenanceAlertTitleEn":
      "Maintenance alert title (English)",
    "frontend.overviewMaintenanceAlertTitleEn.description":
      "Shown only when the portal is in English (en-GB). Fill in both languages: there is no fallback.",
    "frontend.overviewMaintenanceAlertTextEn":
      "Maintenance alert text (English)",
    "frontend.overviewMaintenanceAlertTextEn.description":
      "Shown only when the portal is in English (en-GB). Fill in both languages: there is no fallback.",
    "frontend.casesPartialSearchEnabled": "Partial case number search",
    "frontend.casesPartialSearchEnabled.description":
      "Finds cases whose number contains the search term, instead of an exact match.",
    "frontend.casesResultExplanationEnabled": "Show result explanation",
    "frontend.casesResultExplanationEnabled.description":
      "Shows the explanation of a case's result on the case details page.",
    "frontend.casesContactMomentsEnabled": "Show contact moments",
    "frontend.casesContactMomentsEnabled.description":
      "Shows the contact moments of a case (from OpenKlant) on the case details page.",
    "frontend.messageCountEnabled": "Show unread message count",
    "frontend.messageCountEnabled.description":
      "Periodically fetches the number of unread messages and shows it in the menu.",
    "frontend.messageCountPollingInterval": "Message count interval (ms)",
    "frontend.messageCountPollingInterval.description":
      "How often the unread message count is fetched, in milliseconds. 0 also means the default.",
    "frontend.openProductEnabled": "Open Product",
    "frontend.openProductEnabled.description":
      "Shows products from Open Product on the overview page and uses its themes in the menu.",
    "frontend.themeClass": "Theme class",
    "frontend.themeClass.description":
      "CSS class added to the page's html element, for example to select a theme in the stylesheet.",
    "frontend.toggles.custom": "Custom toggles (advanced)",
    "frontend.toggles.custom.description":
      "A JSON object of extra toggles for a customised portal, stored as is. Invalid JSON makes the portal ignore all portal interface settings, so the panel won't save it.",
    "frontend.properties.custom": "Custom properties (advanced)",
    "frontend.properties.custom.description":
      "A JSON object of extra properties for a customised portal, stored as is. Invalid JSON makes the portal ignore all portal interface settings, so the panel won't save it.",
    // theme.logo.*
    "theme.logo": "Logo",
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
    "theme.logo.replace-file": "Replace",
    "theme.logo.no-existing-logos":
      "No logo found for current NL Portal application",
    // theme.style.*
    "theme.style": "Style",
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
    // features.zakenapi.*
    "features.zakenapi.url": "Zaken API Url",
    "features.zakenapi.client-id": "Zaken API Client Id",
    "features.zakenapi.secret": "Zaken API Secret",
    "features.zakenapi.zaak-types-ids-excluded": "Excluded case type uuids",
    "features.zakenapi.zaak-types-ids-excluded.description":
      "Comma-separated case type uuids. Cases of these types are not shown.",
    "features.zakenapi.use-nnp-kvk-query-identificators":
      "Use NNP KVK Query Identificators",
    "features.zakenapi.use-nnp-kvk-query-identificators.description":
      "Use the NNP KVK number as query identificator when retrieving cases",
    // features.catalogiapi.*
    "features.catalogiapi.url": "Catalogi API Url",
    "features.catalogiapi.client-id": "Catalogi API Client Id",
    "features.catalogiapi.secret": "Catalogi API Secret",
    // features.documentenapis.*
    "features.documentenapis.configurations": "Documenten API configurations",
    "features.documentenapis.configuration": "Configuration",
    "features.documentenapis.configurations.add-another":
      "Add another configuration",
    "features.documentenapis.configurations.add-another.description":
      "Add another Documenten API configuration.",
    "features.documentenapis.url": "Documenten API Url",
    "features.documentenapis.client-id": "Documenten API Client Id",
    "features.documentenapis.secret": "Documenten API Secret",
    "features.documentenapis.rsin": "RSIN",
    "features.documentenapis.rsin.description":
      "The RSIN of the organisation responsible for the documents. Needed for uploads.",
    "features.documentenapis.document-type-url": "Information object type Url",
    "features.documentenapis.document-type-url.description":
      "The default information object type in the Catalogi API for uploads with this configuration. Needed for uploads that don't specify a type.",
    "features.documentenapis.default-document-api":
      "Default Documenten API configuration",
    "features.documentenapis.default-document-api.description":
      "The configuration that is used by default.",
    "features.documentenapis.allowed-mime-types": "Allowed file types",
    "features.documentenapis.allowed-mime-types.description":
      "Comma-separated MIME types residents may upload.",
    "features.documentenapis.allowed-mime-types.default": "all types allowed",
    "features.documentenapis.vertrouwelijkheidsaanduiding-whitelist":
      "Document confidentiality whitelist",
    "features.documentenapis.vertrouwelijkheidsaanduiding-whitelist.description":
      "Only documents with one of these confidentiality levels are shown to residents. Select none to use the default.",
    "features.documentenapis.status-whitelist": "Document status whitelist",
    "features.documentenapis.status-whitelist.description":
      "Only documents with one of these statuses are shown to residents. Select none to use the default.",
    // features.besluitenapi.*
    "features.besluitenapi.url": "Besluiten API Url",
    "features.besluitenapi.client-id": "Besluiten API Client Id",
    "features.besluitenapi.secret": "Besluiten API Secret",
    // features.objectsapi.*
    "features.objectsapi.url": "Objecten API Url",
    "features.objectsapi.token": "Objecten API Token",
    "features.objectsapi.token.description":
      "The token used to authenticate requests to the Objecten API",
    // features.openklant2.*
    "features.openklant2.klantinteracties-api-url": "Klantinteracties API Url",
    "features.openklant2.klantinteracties-api-url.description":
      "The url of the Klantinteracties API",
    "features.openklant2.contactgegevens-api-url": "Contactgegevens API Url",
    "features.openklant2.contactgegevens-api-url.description":
      "The url of the Contactgegevens API",
    "features.openklant2.token": "OpenKlant 2 Token",
    "features.openklant2.token.description":
      "The token used to authenticate requests to OpenKlant 2",
    "features.openklant2.digital-adressen-referentie":
      "Digital address reference",
    "features.openklant2.digital-adressen-referentie.description":
      "Reference stored with the digital addresses residents add in the portal.",
    "features.openklant2.klant-contact-code-register":
      "Contact moment code register",
    "features.openklant2.klant-contact-code-register.description":
      "Values are used as is to filter contact moments. When not set, the filter isn't applied.",
    "features.openklant2.klant-contact-code-register.zaak": "Cases",
    "features.openklant2.klant-contact-code-register.zaak.description":
      "Code register of contact moments about cases.",
    "features.openklant2.klant-contact-code-register.product": "Products",
    "features.openklant2.klant-contact-code-register.product.description":
      "Code register of contact moments about products.",
    // features.haalcentraal-hr.*
    "features.haalcentraal-hr.url": "HaalCentraal HR API Url",
    "features.haalcentraal-hr.url.description":
      "The url of the HaalCentraal Handelsregister API",
    "features.haalcentraal-hr.api-key": "HaalCentraal HR API Key",
    "features.haalcentraal-hr.api-key.description":
      "Sent as the X-API-KEY header",
    // features.haalcentraal2.*
    "features.haalcentraal2.brp-api-url": "HaalCentraal 2 BRP API Url",
    "features.haalcentraal2.brp-api-url.description":
      "The url of the HaalCentraal 2 BRP API",
    "features.haalcentraal2.bewoning-api-url":
      "HaalCentraal 2 Bewoning API Url",
    "features.haalcentraal2.bewoning-api-url.description":
      "The url of the HaalCentraal 2 Bewoning API",
    "features.haalcentraal2.api-key": "HaalCentraal 2 API Key",
    "features.haalcentraal2.api-key.description":
      "Sent as the X-API-KEY header to both APIs",
    "features.haalcentraal2.additional-headers": "Additional headers",
    "features.haalcentraal2.additional-headers.description":
      "Headers sent with every request to both APIs.",
    "features.haalcentraal2.allowed-cities-for-bewoning":
      "Cities for inhabitants",
    "features.haalcentraal2.allowed-cities-for-bewoning.description":
      "Comma-separated city names. The number of inhabitants is only fetched for addresses in these cities.",
    "features.haalcentraal2.allowed-cities-for-bewoning.default": "all cities",
    "features.haalcentraal2.brp-fields": "BRP fields",
    "features.haalcentraal2.brp-fields.description":
      "Comma-separated fields requested from the BRP API. Replaces the default list.",
    "features.haalcentraal2.brp-fields.default":
      "aNummer, adressering, burgerservicenummer, datumEersteInschrijvingGBA, datumInschrijvingInGemeente, europeesKiesrecht, geboorte, gemeenteVanInschrijving, geslacht, gezag, immigratie, indicatieCurateleRegister, kinderen, leeftijd, naam, nationaliteiten, ouders, overlijden, partners, uitsluitingKiesrecht, verblijfplaats, verblijfstitel, verblijfplaatsBinnenland, adresseringBinnenland",
    // features.taak.*
    "features.taak.object-type-url": "External User Task Object Type Url",
    "features.taak.object-type-url.description":
      "The url of the external user task object type in Open Object",
    // features.berichten.*
    "features.berichten.bericht-object-type-url": "Message Object Type Url",
    "features.berichten.bericht-object-type-url.description":
      "The url of the message object type in Open Object",
    // features.verificatie.*
    "features.verificatie.url": "Verification API Url",
    "features.verificatie.url.description":
      "The url of the verification service that sends codes to phone numbers and email addresses",
    "features.verificatie.client-id": "Client Id",
    "features.verificatie.secret": "Secret",
    "features.verificatie.api-key": "API Key",
    "features.verificatie.api-key.description":
      "The API key of the verification service",
    "features.verificatie.template-id-phone-number": "Phone number template id",
    "features.verificatie.template-id-phone-number.description":
      "Id of the message template used to verify phone numbers",
    "features.verificatie.template-id-email": "Email template id",
    "features.verificatie.template-id-email.description":
      "Id of the message template used to verify email addresses",
    "features.verificatie.types-need-verification":
      "Types that need verification",
    "features.verificatie.types-need-verification.description":
      "Digital addresses of these types must be verified before they are saved.",
    // features.form.*
    "features.form.form-definition-object-type-url":
      "Form definition object type Url",
    "features.form.form-definition-object-type-url.description":
      "The url of the form definition object type in Open Object. Forms are available whenever Open Object is enabled.",
    "features.form.form-definition-object-type-url.default":
      "not set: the object type isn't checked",
    // features.product.*
    "features.product.product-type-url": "Product type Url",
    "features.product.product-type-url.description":
      "The url of the product object type in Open Object",
    "features.product.product-instantie-type-url":
      "Product instance object type Url",
    "features.product.product-instantie-type-url.description":
      "The url of the product instance object type in Open Object",
    "features.product.product-verbruiks-object-type-url":
      "Product consumable object type Url",
    "features.product.product-verbruiks-object-type-url.description":
      "The url of the product consumable object type in Open Object",
    "features.product.product-details-type-url":
      "Product details object type Url",
    "features.product.product-details-type-url.description":
      "The url of the product details object type in Open Object",
    // features.openproduct.*
    "features.openproduct.product-api-url": "Open Product API Url",
    "features.openproduct.product-api-url.description":
      "The url of the Open Product producten API",
    "features.openproduct.product-type-api-url":
      "Open Product product type API Url",
    "features.openproduct.product-type-api-url.description":
      "The url of the Open Product producttypen API",
    "features.openproduct.token": "Open Product Token",
    "features.openproduct.token.description":
      "The token used to authenticate requests to Open Product",
    "features.openproduct.dmn": "DMN",
    "features.openproduct.dmn.description":
      "Authentication for the DMN decisions of Open Product. The url comes from the product type.",
    "features.openproduct.dmn.client-id": "Client Id",
    "features.openproduct.dmn.secret": "Secret",
    "features.openproduct.dmn.username": "Username",
    "features.openproduct.dmn.username.description":
      "Username for Basic Authentication",
    "features.openproduct.dmn.password": "Password",
    "features.openproduct.dmn.password.description":
      "Password for Basic Authentication",
    // features.dmn.*
    "features.dmn.url": "Camunda DMN API Url",
    "features.dmn.url.description":
      "The url of the Camunda DMN API that executes decisions",
    "features.dmn.client-id": "Client Id",
    "features.dmn.secret": "Secret",
    "features.dmn.username": "Username",
    "features.dmn.username.description": "Username for Basic Authentication",
    "features.dmn.password": "Password",
    "features.dmn.password.description": "Password for Basic Authentication",
    // features.prefill.*
    "features.prefill.type-url": "Prefill object type Url",
    "features.prefill.type-url.description":
      "The url of the prefill object type in Open Object",
    "features.prefill.prefill-sha-version": "Prefill object SHA version",
    "features.prefill.prefill-sha-version.description":
      "The SHA version used to hash the prefill object",
    // features.payment.direct.*
    "features.payment.direct.url": "Payment API URL",
    "features.payment.direct.url.description":
      "The Worldline Online Payments platform API endpoint",
    "features.payment.direct.webhook-url": "Webhook URL",
    "features.payment.direct.webhook-url.description":
      "The URL Worldline sends status change events of payments to",
    "features.payment.direct.custom-template-url": "Custom template",
    "features.payment.direct.custom-template-url.description":
      "Name of a Worldline hosted checkout template",
    "features.payment.direct.show-result-page": "Show result page",
    "features.payment.direct.show-result-page.description":
      "Show Worldline's result page after the payment",
    "features.payment.direct.sha-out-parameters": "SHA-OUT parameters",
    "features.payment.direct.sha-out-parameters.description":
      "The payment return parameters that should be validated. NL Portal 4.0 doesn't read this setting.",
    "features.payment.direct.webhook-headers": "webhook-headers",
    "features.payment.direct.webhook-headers.description":
      "Comma-separated list. NL Portal 4.0 doesn't read this setting.",
    "features.payment.direct.profiles": "Payment profiles",
    "features.payment.direct.profile": "Profile",
    "features.payment.direct.profiles.add-another": "Add another",
    "features.payment.direct.profiles.add-another.description":
      "Add another payment profile.",
    "features.payment.direct.psp-id": "PSPID",
    "features.payment.direct.psp-id.description":
      "The payment service provider ID (merchant ID) of your Worldline account",
    "features.payment.direct.language": "Language",
    "features.payment.direct.language.description":
      "The language of the checkout",
    "features.payment.direct.currency": "Currency",
    "features.payment.direct.currency.description":
      "The currency of this payment profile, as an ISO 4217 code",
    "features.payment.direct.api-key": "API Key Id",
    "features.payment.direct.api-key.description":
      "The id of the API key used for authorization",
    "features.payment.direct.api-secret": "API Secret",
    "features.payment.direct.api-secret.description":
      "The secret used for authorization",
    "features.payment.direct.return-url": "Return URL",
    "features.payment.direct.return-url.description":
      "The URL Worldline redirects to after checkout",
    "features.payment.direct.webhook-api-key": "Webhook API Key ID",
    "features.payment.direct.webhook-api-key.description":
      "The ID of the webhook key used to validate webhook messages",
    "features.payment.direct.webhook-api-secret": "Webhook API Secret",
    "features.payment.direct.webhook-api-secret.description":
      "The webhook key secret used to validate webhook messages",
    "features.payment.direct.creditcard-enabled": "Credit card",
    "features.payment.direct.creditcard-enabled.description":
      "Allow payment by credit card",
    "features.payment.direct.allowed-number-of-payments":
      "Allowed number of payment attempts",
    "features.payment.direct.allowed-number-of-payments.description":
      "How often a resident may try to pay",
    // features.virusscan.clamav.*
    "features.virusscan.clamav.host-name": "Hostname",
    "features.virusscan.clamav.host-name.description":
      "The hostname of the ClamAV service. Only task document uploads are scanned.",
    "features.virusscan.clamav.port": "Port",
    "features.virusscan.clamav.port.description":
      "The port the ClamAV service listens on",
    // enums.vertrouwelijkheidsaanduiding.*
    "enums.vertrouwelijkheidsaanduiding.OPENBAAR": "Public",
    "enums.vertrouwelijkheidsaanduiding.BEPERKT_OPENBAAR": "Restricted public",
    "enums.vertrouwelijkheidsaanduiding.INTERN": "Internal",
    "enums.vertrouwelijkheidsaanduiding.ZAAKVERTROUWELIJK": "Case confidential",
    "enums.vertrouwelijkheidsaanduiding.VERTROUWELIJK": "Private",
    "enums.vertrouwelijkheidsaanduiding.CONFIDENTIEEL": "Confidential",
    "enums.vertrouwelijkheidsaanduiding.GEHEIM": "Secret",
    "enums.vertrouwelijkheidsaanduiding.ZEER_GEHEIM": "Very secret",
    "enums.vertrouwelijkheidsaanduiding.GEEN": "None",
    // enums.document-status.*
    "enums.document-status.IN_BEWERKING": "In editing",
    "enums.document-status.TER_VASTSTELLING": "To be confirmed",
    "enums.document-status.DEFINITIEF": "Definitive",
    "enums.document-status.GEARCHIVEERD": "Archived",
    "enums.document-status.GEEN_STATUS": "No status",
    // enums.verificatie-type.*
    "enums.verificatie-type.TELEFOONNUMMER": "Phone number",
    "enums.verificatie-type.EMAIL": "Email address",
    "enums.verificatie-type.OVERIG": "Other",
  },
};
