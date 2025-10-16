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

export const NL_NL_MESSAGES: Messages = {
  [DEFAULT_LOCALES.DUTCH]: {
    // i18n.language.*
    "i18n.language.en-GB": "Engels",
    "i18n.language.nl-NL": "Nederlands",
    // action.*
    "action.save": "Opslaan",
    "action.cancel": "Annuleren",
    "action.back": "Terug",
    "action.delete": "Verwijderen",
    "action.reset": "Reset",
    // api.*
    "api.error": "Oeps, er is iets misgegaan. Probeer het later opnieuw.",
    "api.save.success": "Wijzigingen zijn succesvol opgeslagen.",
    "api.upload.success": "Uploaden is gelukt",
    "api.upload.error": "Uploaden is mislukt.",
    // configuration.*
    "configuration.title": "Features",
    "configuration.subtitle": "Configureer hier de features van NL Portal.",
    "configuration.configure": "Configureer",
    "configuration.features": "Features",
    "configuration.theme": "Thema Configuratie",
    // features.config.*
    "features.config.loading-error":
      "Het laden van de {featureId} configuratie is mislukt.",
    // features.feature.*
    "features.feature.enabled": "Geactiveerd",
    "features.feature.enabled.description":
      "Het in- of uitschakelen van features veroorzaakt een korte herstart van alle NL Portal-instanties die zijn geconfigureerd in de CONFIG_NOTIFY_LIST environment variable.",
    "features.feature.configuration": "Module configuratie",
    "features.feature.configuration.properties": "Eigenschappen",
    // theme.logo.*
    "theme.logo": "Themalogo",
    "theme.logo.existing-logos": "Bestaand themalogo",
    "theme.logo.existing-logos.description":
      "Dit is de bestaande themalogo-configuratie voor de huidige NL Portal-toepassing.",
    "theme.logo.label": "Logo",
    "theme.logo.description":
      "Het logo dat aan deze toepassing wordt gekoppeld.",
    "theme.logo.upload-theme-logo.label": "Logo uploaden",
    "theme.logo.upload-theme-logo.description":
      "Upload een afbeeldingsbestand om te gebruiken als logo van de huidige NL Portal-toepassing.",
    "theme.logo.select-file": "Bestand selecteren",
    "theme.logo.no-existing-logos":
      "Geen logo gevonden voor de huidige NL Portal-toepassing.",
    // theme.style.*
    "theme.style": "Themastijl",
    "theme.style.add-theme-style.label": "Themastijl toevoegen",
    "theme.style.add-theme-style.description":
      "Voeg een nieuwe themastijlconfiguratie toe voor de huidige NL Portal-toepassing.",
    "theme.style.add-another": "Een themastijl toevoegen",
    "theme.style.existing-styles": "Bestaande themastijl",
    "theme.style.existing-styles.description":
      "Dit is de bestaande themastijlconfiguratie voor de huidige NL Portal-toepassing.",
    "theme.style.stylesheet.label": "Stylesheet",
    "theme.style.stylesheet.description":
      "Definieer uw stijlen of overschrijf stijltokens. <linkUrl>Klik hier</linkUrl> om een lijst van alle beschikbare NLDS-tokens te bekijken.",
    "theme.style.no-existing-styles":
      "Geen stijl gevonden voor de huidige NL Portal-toepassing.",
    // features.berichten.*
    "features.berichten": "Berichten",
    "features.berichten.bericht-object-type-url": "Bericht Objecttype Url:",
    "features.berichten.bericht-object-type-url.description":
      "De url naar het Bericht objecttype binnen Objecttypen API",
    // features.openklant2.*
    "features.openklant2": "OpenKlant 2",
    "features.openklant2.klantinteracties-api-url": "Klantinteracties Api Url",
    "features.openklant2.klantinteracties-api-url.description":
      "De base url van de te gebruiken Klantinteracties API",
    "features.openklant2.contactgegevens-api-url": "Contactgegevens Api Url",
    "features.openklant2.contactgegevens-api-url.description":
      "De base url van de te gebruiken Contactgegevens API",
    "features.openklant2.token": "OpenKlant 2 Token",
    "features.openklant2.token.description":
      "Het Token om bij de OpenKlant 2 service autoriseren te kunnen",
    // features.haalcentraal-brp.*
    "features.haalcentraal-brp": "HaalCentraal BRP",
    "features.haalcentraal-brp.url": "HaalCentraal BRP Api Url",
    "features.haalcentraal-brp.url.description":
      "De base url van de te gebruiken HaalCentraal BRP API",
    "features.haalcentraal-brp.api-key": "HaalCentraal BRP Api Key",
    "features.haalcentraal-brp.api-key.description":
      "De geheime sleutel die bij de connectie gebruikt zou moeten worden",
    // features.haalcentraal-hr.*
    "features.haalcentraal-hr": "HaalCentraal HR",
    "features.haalcentraal-hr.url": "HaalCentraal HR Api Url",
    "features.haalcentraal-hr.url.description":
      "De base url van de te gebruiken HaalCentraal BRP API",
    "features.haalcentraal-hr.api-key": "HaalCentraal HR Api Key",
    "features.haalcentraal-hr.api-key.description":
      "De geheime sleutel die bij de connectie gebruikt zou moeten worden",
    // features.haalcentraal2.*
    "features.haalcentraal2": "HaalCentraal 2",
    "features.haalcentraal2.brp-api-url": "HaalCentraal 2 BRP Api Url",
    "features.haalcentraal2.brp-api-url.description":
      "De base url van de te gebruiken HaalCentraal 2 BRP API",
    "features.haalcentraal2.bewoning-api-url":
      "HaalCentraal 2 Bewoning Api Url",
    "features.haalcentraal2.bewoning-api-url.description":
      "De base url van de te gebruiken HaalCentraal 2 Bewoning API",
    "features.haalcentraal2.api-key": "HaalCentraal 2 Api Key",
    "features.haalcentraal2.api-key.description":
      "De geheime sleutel die bij de connectie gebruikt zou moeten worden",
    // features.taak.*
    "features.taak": "Taak",
    "features.taak.enable": "Geactiveerd",
    "features.taak.enable.description": "Geactiveerd",
    "features.taak.object-type-url": "Externe Klanttaak Objecttype Url",
    "features.taak.object-type-url.description":
      "De url naar het Externe Klanttaak objecttype binnen Objecttypen API",
    // features.objectsapi.*
    "features.objectsapi": "Objecten API",
    "features.objectsapi.url": "Objecten Api Url",
    "features.objectsapi.url.description":
      "De base url van de te gebruiken Objecten API",
    "features.objectsapi.token": "Objecten Api Token",
    "features.objectsapi.token.description":
      "Het Token om bij de Objecten API autoriseren te kunnen",
    // features.catalogiapi.*
    "features.catalogiapi": "Catalogi API",
    "features.catalogiapi.url": "Catalogi API Url",
    "features.catalogiapi.url.description":
      "De base url van de te gebruiken Catalogi API",
    "features.catalogiapi.client-id": "Catalogi API Client Id",
    "features.catalogiapi.client-id.description":
      "De client id die bij de connectie gebruikt zou moeten worden",
    "features.catalogiapi.secret": "Catalogi API Secret",
    "features.catalogiapi.secret.description":
      "De secret die bij de connectie gebruikt zou moeten worden",
    // features.besluitenapi.*
    "features.besluitenapi": "Besluiten API",
    "features.besluitenapi.url": "Besluiten API Url",
    "features.besluitenapi.url.description":
      "De base url van de te gebruiken Besluiten API",
    "features.besluitenapi.client-id": "Besluiten API Client Id",
    "features.besluitenapi.client-id.description":
      "De client id die bij de connectie gebruikt zou moeten worden",
    "features.besluitenapi.secret": "Besluiten API Secret",
    "features.besluitenapi.secret.description":
      "De secret die bij de connectie gebruikt zou moeten worden",
    // features.product.*
    "features.product": "Product",
    "features.product.product-type-url": "Producttype Url",
    "features.product.product-type-url.description":
      "De url naar het Product objecttype binnen Objecttypen API",
    "features.product.product-instantie-type-url":
      "Product instanceobjecttype Url",
    "features.product.product-instantie-type-url.description":
      "De url naar het Product instanceobjecttype binnen Objecttypen API",
    "features.product.product-details-type-url":
      "Product detailsobjecttype Url",
    "features.product.product-details-type-url.description":
      "De url naar het Product detailsobjecttype binnen Objecttypen API",
    "features.product.product-verbruiks-object-type-url":
      "Product verbruiksobjecttype Url",
    "features.product.product-verbruiks-object-type-url.description":
      "De url naar het Product verbruiksobjecttype binnen Objecttypen API",
    // features.openproduct.*
    "features.openproduct": "OpenProduct API",
    "features.openproduct.token": "OpenProduct Token",
    "features.openproduct.token.description":
      "Het Token om bij de OpenProduct service the autoriseren",
    "features.openproduct.product-api-url": "OpenProduct API Url",
    "features.openproduct.product-api-url.description":
      "De base url van de te gebruiken OpenProduct API",
    "features.openproduct.product-type-api-url":
      "OpenProduct product type API Url",
    "features.openproduct.product-type-api-url.description":
      "De base url van de te gebruiken OpenProduct product type API",
    // features.openproduct.dmn.*
    "features.openproduct.dmn": "DMN",
    "features.openproduct.dmn.clientId": "Client Id",
    "features.openproduct.dmn.clientId.description":
      "De client id die bij de connectie gebruikt zou moeten worden (Access Token Authorization)",
    "features.openproduct.dmn.secret": "Secret",
    "features.openproduct.dmn.secret.description":
      "De secret die bij de connectie gebruikt zou moeten worden (Access Token Authorization)",
    "features.openproduct.dmn.username": "Username",
    "features.openproduct.dmn.username.description":
      "De username die bij de connectie gebruikt zou moeten worden (Basic Authorization)",
    "features.openproduct.dmn.password": "Password",
    "features.openproduct.dmn.password.description":
      "De wachtwoord die bij de connectie gebruikt zou moeten worden (Basic Authorization)",
    // features.dmn.*
    "features.dmn": "DMN",
    "features.dmn.url": "Dmn API base Url",
    "features.dmn.url.description":
      "De base url van de te gebruiken Camunda DMN API",
    "features.dmn.client-id": "Client Id",
    "features.dmn.client-id.description":
      "De client id die bij de connectie gebruikt zou moeten worden (Access Token Authorization)",
    "features.dmn.secret": "Secret",
    "features.dmn.secret.description":
      "De secret die bij de connectie gebruikt zou moeten worden (Access Token Authorization)",
    "features.dmn.username": "Username",
    "features.dmn.username.description":
      "De username die bij de connectie gebruikt zou moeten worden (Basic Authorization)",
    "features.dmn.password": "Password",
    "features.dmn.password.description":
      "De wachtwoord die bij de connectie gebruikt zou moeten worden (Basic Authorization)",
    // features.prefill.*
    "features.prefill": "Prefill",
    "features.prefill.type-url": "Prefill objecttype Url",
    "features.prefill.type-url.description":
      "De url naar het Prefill objecttype binnen Objecttypen API",
    "features.prefill.prefill-sha-version": "Prefill object SHA versie",
    "features.prefill.prefill-sha-version.description":
      "De SHA versie met die het prefill object is gehashed",
    // features.zakenapi.*
    "features.zakenapi": "Zaken API",
    "features.zakenapi.configuration": "Configuration",
    "features.zakenapi.url": "Zaken API Url",
    "features.zakenapi.url.description":
      "De base url van de te gebruiken Zaken API",
    "features.zakenapi.client-id": "Zaken API Client Id",
    "features.zakenapi.client-id.description":
      "De client id die bij de connectie gebruikt zou moeten worden",
    "features.zakenapi.secret": "Zaken API Secret",
    "features.zakenapi.secret.description":
      "De secret die bij de connectie gebruikt zou moeten worden",
    "features.zakenapi.use-nnp-kvk-query-identificators":
      "Gebruik NNP KVK Query Identificators",
    "features.zakenapi.use-nnp-kvk-query-identificators.description":
      "Gebruik NNP KVK nummer als query identificator bij het ophalen van zaken",
    // features.zakenapi.zaak-documenten-config.*
    "features.zakenapi.zaak-documenten-config.vertrouwelijkheidsaanduiding-whitelist":
      "Zaak informatieobject vertrouwelijkheidsaanduiding whitelist",
    "features.zakenapi.zaak-documenten-config.vertrouwelijkheidsaanduiding-whitelist.description":
      "Beperk welke informatieobjecten aan de eindgebruiker mogen worden getoond op basis van hun vertrouwelijkheidsindicatie. Als er geen indicaties zijn geselecteerd, worden alle informatieobjecten getoond.",
    "features.zakenapi.zaak-documenten-config.status-whitelist":
      "Zaak informatieobject status whitelist",
    "features.zakenapi.zaak-documenten-config.status-whitelist.description":
      "Beperk welke informatieobjecten aan de eindgebruiker mogen worden getoond op basis van hun status. Als er geen statussen zijn geselecteerd, worden alle informatieobjecten weergegeven.",
    "features.zakenapi.zaak-types-ids-excluded": "Exclude zaaktype uuid's",
    "features.zakenapi.zaak-types-ids-excluded.description":
      "Exclude zaaktype uuid's als extra filter om de zaken op te halen.",
    // features.documentenapis.*
    "features.documentenapis": "Documenten APIs",
    "features.documentenapis.configuration": "Configuration",
    "features.documentenapis.configurations.add-another":
      "Configuratie toevoegen",
    "features.documentenapis.configurations.add-another.description":
      "Voeg een Documenten API configuratie toe",
    "features.documentenapis.configurations.configuration-name":
      "voorbeeld-documenten-api-configuratie",
    "features.documentenapis.url": "Documenten API Url",
    "features.documentenapis.url.description":
      "De base url van de te gebruiken Documenten API",
    "features.documentenapis.client-id": "Documenten API Client Id",
    "features.documentenapis.client-id.description":
      "De client id die bij de connectie gebruikt zou moeten worden",
    "features.documentenapis.secret": "Documenten API Secret",
    "features.documentenapis.secret.description":
      "De secret die bij de connectie gebruikt zou moeten worden",
    "features.documentenapis.rsin": "RSIN",
    "features.documentenapis.rsin.description":
      "Het RSIN van het bedrijf dat verantwoordelijk is voor de catalogus die het informatieobjecttype bevat",
    "features.documentenapis.document-type-url": "Informatieobjecttype URL",
    "features.documentenapis.document-type-url.description":
      "Een URL naar het voor deze configuratie standaard te gebruiken informatieobjecttype binnen de Catalogi API",
    "features.documentenapis.default-document-api": "Standaardconfiguratie",
    "features.documentenapis.default-document-api.description":
      "De configuratie die standaard wordt gebruikt",
    // features.payment.ogone.*
    "features.payment-ogone": "Ogone Betalingen",
    "features.payment.ogone.configuration": "Configuratie",
    "features.payment.ogone.url": "Payment API URL",
    "features.payment.ogone.url.description":
      "De baseurl van de te gebruiken Ogone Payment API",
    "features.payment.ogone.sha-out-parameters": "SHA-OUT parameters",
    "features.payment.ogone.sha-out-parameters.description":
      "Welke SHA-OUT parameters moeten worden gevalideerd",
    "features.payment.ogone.profile": "Profiel",
    "features.payment.ogone.title": "Titel",
    "features.payment.ogone.title.description":
      "Een titel voor de betalingsverzoeken",
    "features.payment.ogone.psp-id": "PSPID",
    "features.payment.ogone.psp-id.description":
      "De PSPID van uw Ogone account",
    "features.payment.ogone.language": "Language",
    "features.payment.ogone.language.description":
      "De taal die gebruikt moet worden voor het afrekenen",
    "features.payment.ogone.sha-in-key": "SHA-IN Key",
    "features.payment.ogone.sha-in-key.description":
      "De geheime sleutel die wordt gebruikt om de velden in het betalingsverzoek te versleutelen",
    "features.payment.ogone.sha-out-key": "SHA-OUT Key",
    "features.payment.ogone.sha-out-key.description":
      "De geheime sleutel die wordt gebruikt om betalingsvelden in een betalings-callback te valideren",
    "features.payment.ogone.sha-version": "SHA Versie",
    "features.payment.ogone.sha-version.description":
      "De SHA versie met die bij het betalingsverzoek wordt gebruikt",
    "features.payment.ogone.failure-url": "Failure URL",
    "features.payment.ogone.failure-url.description":
      "De URL waarnaar Ogone moet doorverwijzen in geval van een negatief resultaat",
    "features.payment.ogone.success-url": "Success URL",
    "features.payment.ogone.success-url.description":
      "De URL waarnaar Ogone moet doorverwijzen bij een positief resultaat",
    "features.payment.ogone.profiles.add-another": "Profiel toevoegen",
    "features.payment.ogone.profiles.add-another.description":
      "Voeg en additionele profiel toe",
    "features.payment.ogone.profiles.profile-name":
      "voorbeeld-ogone-betalingsprofiel",
    // features.payment.direct.*
    "features.payment-direct": "Direct Payment",
    "features.payment.direct.configuration": "Configuratie",
    "features.payment.direct.profile": "Profiel",
    "features.payment.direct.url": "Payment API URL",
    "features.payment.direct.url.description":
      "De baseurl van de te gebruiken Online Payments platform API",
    "features.payment.direct.sha-out-parameters": "SHA-OUT parameters",
    "features.payment.direct.sha-out-parameters.description":
      "Welke SHA-OUT parameters moeten worden gevalideerd",
    "features.payment.direct.webhook-url": "Webhook URL",
    "features.payment.direct.webhook-url.description":
      "De URL waar de webhook berichten zouden moeten worden verzonden",
    "features.payment.direct.title": "Title",
    "features.payment.direct.title.description":
      "Een titel voor de betalingsverzoeken",
    "features.payment.direct.psp-id": "PSPID",
    "features.payment.direct.psp-id.description":
      "De payment service provider ID (merchant ID) van uw Direct account",
    "features.payment.direct.language": "Language",
    "features.payment.direct.language.description":
      "De taal die gebruikt moet worden voor het afrekenen",
    "features.payment.direct.currency": "Currency",
    "features.payment.direct.currency.description":
      "De valuta die voor dit betalingsprofiel moet worden gebruikt, zoals aangegeven in de ISO 4217-norm",
    "features.payment.direct.return-url": "Return URL",
    "features.payment.direct.return-url.description":
      "De URL waarnaar Direct moet doorverwijzen na een betaling",
    "features.payment.direct.api-key": "API Key Id",
    "features.payment.direct.api-key.description":
      "De id van de sleutel die wordt gebruikt voor autorisatie bij Direct",
    "features.payment.direct.api-secret": "API Secret",
    "features.payment.direct.api-secret.description":
      "De geheime sleutel die wordt gebruikt voor autorisatie bij Direct",
    "features.payment.direct.webhook-api-key": "Webhook API Key ID",
    "features.payment.direct.webhook-api-key.description":
      "De ID van de webhooksleutel die wordt gebruikt om berichten te valideren die via Direct Webhooks worden verzonden",
    "features.payment.direct.webhook-api-secret": "Webhook API Secret",
    "features.payment.direct.webhook-api-secret.description":
      "De Webhook Key geheime sleutel",
    "features.payment.direct.profiles.add-another": "Add another",
    "features.payment.direct.profiles.add-another.description":
      "Add another payment profile",
    "features.payment.direct.profiles.profile-name":
      "example-direct-payment-profile",
    // features.virusscan.*
    "features.virusscan-clamav": "Clam AV Virus Scanner",
    "features.virusscan.clamav.hostname": "Hostname",
    "features.virusscan.clamav.hostname.description":
      "De hostname van de ClamAV-service",
    "features.virusscan.clamav.port": "Port",
    "features.virusscan.clamav.port.description":
      "De port waar de ClamAV-service naar luistert",
    // zaakdocument.vertrouwelijkheidsaanduiding.*
    "zaakdocument.vertrouwelijkheidsaanduiding.openbaar": "Openbaar",
    "zaakdocument.vertrouwelijkheidsaanduiding.beperkt_openbaar":
      "Beperkt openbaar",
    "zaakdocument.vertrouwelijkheidsaanduiding.intern": "Intern",
    "zaakdocument.vertrouwelijkheidsaanduiding.zaakvertrouwelijk":
      "Zaakvertrouwelijk",
    "zaakdocument.vertrouwelijkheidsaanduiding.vertrouwelijk": "Vertrouwelijk",
    "zaakdocument.vertrouwelijkheidsaanduiding.confidentieel": "Confidentieel",
    "zaakdocument.vertrouwelijkheidsaanduiding.geheim": "Geheim",
    "zaakdocument.vertrouwelijkheidsaanduiding.zeer_geheim": "Zeer geheim",
    // zaakdocument.status.*
    "zaakdocument.status.ter_vaststelling": "In bewerking",
    "zaakdocument.status.in_bewerking": "Ter vaststelling",
    "zaakdocument.status.definitief": "Definitief",
    "zaakdocument.status.gearchiveerd": "Gearchiveerd",
  },
};
