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

export const NL_NL_MESSAGES: Messages = {
  [DEFAULT_LOCALES.DUTCH]: {
    // i18n.language.*
    "i18n.language.nl_NL": "Nederlands",
    "i18n.language.en_GB": "Engels",
    // locales.*
    "locales.nl-NL": "Nederlands",
    "locales.en-GB": "English",
    // backlink.*
    "backlink.back": "Terug",
    // action.*
    "action.save": "Opslaan",
    "action.cancel": "Annuleren",
    "action.back": "Terug",
    "action.add": "Toevoegen",
    "action.delete": "Verwijderen",
    "action.reset": "Reset",
    // api.*
    "api.error": "Oeps, er is iets misgegaan. Probeer het later opnieuw.",
    "api.save.success": "Wijzigingen zijn succesvol opgeslagen.",
    "api.delete.success": "Succesvol verwijderd.",
    "api.upload.success": "Uploaden is gelukt",
    "api.upload.error": "Uploaden is mislukt.",
    // unexpectedError.*
    "unexpectedError.title": "Er ging iets mis",
    "unexpectedError.description":
      "<p>Het configuratiepaneel kan nu niet worden getoond. Mogelijk heeft u geen toegang, of is het paneel niet bereikbaar.</p><p>Neem contact op met uw systeembeheerder.</p>",
    // configuration.*
    "configuration.title": "NL Portal-configuratie",
    "configuration.subtitle": "Configureer hier de features van NL Portal.",
    "configuration.configure": "Configureer",
    "configuration.portal-interface": "Configuratie portaalinterface",
    "configuration.features": "Features",
    // defaults.*
    "defaults.label": "Standaard: {value}",
    "defaults.not-set": "niet ingesteld",
    "defaults.empty-list": "geen",
    "defaults.on": "aan",
    "defaults.off": "uit",
    "defaults.use-default": "(standaard van NL Portal)",
    // fields.*
    "fields.key-ref-select.empty": "Voeg eerst een configuratie toe",
    "fields.client-id.description":
      "De client id waarmee verzoeken worden geauthenticeerd (bij Access Token Authentication).",
    "fields.secret.description":
      "De secret waarmee verzoeken worden geauthenticeerd (bij Access Token Authentication).",
    "fields.zgw-url.server-root.description": "Server-url, zonder API-pad.",
    "fields.zgw-url.full-api.description":
      "Volledige API-url, inclusief API-pad.",
    "fields.ssl": "SSL",
    "fields.ssl.description":
      "Clientcertificaat en vertrouwd certificaat voor deze verbinding. De waarden zijn Spring resource-locaties (bijvoorbeeld file: of classpath:), niet de certificaten zelf. NL Portal past ze alleen toe als Documenten API's of HaalCentraal HR is ingeschakeld.",
    "fields.ssl.key.cert-chain": "Certificaatketen client",
    "fields.ssl.key.cert-chain.description":
      "Locatie van de certificaatketen van de client (PEM). Verplicht als er een clientsleutel is ingesteld.",
    "fields.ssl.key.key": "Clientsleutel",
    "fields.ssl.key.key.description":
      "Locatie van de private key van de client (PEM). Verplicht als er een certificaatketen is ingesteld.",
    "fields.ssl.key.key-password": "Wachtwoord clientsleutel",
    "fields.ssl.key.key-password.description":
      "Wachtwoord van de clientsleutel, als die versleuteld is.",
    "fields.ssl.trusted-certificate": "Vertrouwd certificaat",
    "fields.ssl.trusted-certificate.description":
      "Locatie van het certificaat (PEM) waarmee de server wordt geverifieerd.",
    "fields.profile-name.rule":
      "Gebruik alleen kleine letters, cijfers, - en /.",
    "fields.map-key.rule":
      "Voeg een naam toe: alleen letters, cijfers, - en _.",
    "fields.error.json":
      'Vul een geldig JSON-object in, bijvoorbeeld { "key": true }.',
    // upgrade-notice.*
    "upgrade-notice.title":
      "Configuratie bewaard voor oudere NL Portal-versies",
    "upgrade-notice.body":
      "De volgende sleutels worden niet meer gebruikt door NL Portal {version}, maar blijven bewaard voor instanties van NL Portal ouder dan {version} die met dit configuratiepaneel verbonden zijn. Verwijder ze nadat alle instanties naar {version} zijn geüpgraded.",
    "upgrade-notice.delete-key": "{propertyKey} verwijderen",
    "upgrade-notice.delete-all": "Alles verwijderen",
    "upgrade-notice.confirm-delete": "Verwijderen bevestigen",
    // features.config.*
    "features.config.loading-error":
      "Het laden van de {featureId} configuratie is mislukt.",
    // features.feature.*
    "features.feature.enabled": "Geactiveerd",
    "features.feature.enabled.description":
      "Het in- of uitschakelen van features veroorzaakt een korte herstart van alle NL Portal-instanties die zijn geconfigureerd in de CONFIG_NOTIFY_LIST environment variable.",
    "features.feature.configuration": "Module configuratie",
    "features.feature.configuration.properties": "Eigenschappen",
    "features.feature.requires.title": "Andere features nodig",
    "features.feature.requires":
      "Voor deze feature moeten deze features ook ingeschakeld zijn: {sections}",
    // features.deprecated.*
    "features.deprecated.title": "Verouderd",
    "features.deprecated.description":
      "Deze feature is verouderd en wordt in een toekomstige versie van NL Portal verwijderd.",
    "features.deprecated.use-openproduct":
      "Deze feature is verouderd in NL Portal. Gebruik in plaats daarvan Open Product.",
    "features.deprecated.hint": "verouderd",
    // frontend.*
    "frontend.title": "Portaalinterface",
    "frontend.group.account": "Mijn gegevens",
    "frontend.group.overview": "Overzicht",
    "frontend.group.cases": "Zaken",
    "frontend.group.messages": "Berichten",
    "frontend.group.products": "Producten",
    "frontend.group.theme": "Thema",
    "frontend.group.other": "Overig",
    "frontend.myInhabitantCountEnabled": "Aantal bewoners tonen",
    "frontend.myInhabitantCountEnabled.description":
      "Toont het aantal bewoners op het adres op de pagina Mijn gegevens.",
    "frontend.myNameChangeUrl": "Link naam wijzigen",
    "frontend.myNameChangeUrl.description":
      "Link naar de pagina waar inwoners een naamswijziging aanvragen. Verborgen als deze niet is ingesteld.",
    "frontend.myGenderChangeUrl": "Link geslacht wijzigen",
    "frontend.myGenderChangeUrl.description":
      "Link naar de pagina waar inwoners een wijziging van de geslachtsregistratie aanvragen. Verborgen als deze niet is ingesteld.",
    "frontend.myAddressChangeUrl": "Link adres wijzigen",
    "frontend.myAddressChangeUrl.description":
      "Link naar de pagina waar inwoners een verhuizing doorgeven. Verborgen als deze niet is ingesteld.",
    "frontend.myAddressResearchUrl": "Link adresonderzoek",
    "frontend.myAddressResearchUrl.description":
      "Link naar de pagina waar inwoners iemand melden die niet op hun adres woont. Verborgen als deze niet is ingesteld.",
    "frontend.myAddressResearchMoreInfoUrl": "Link informatie adresonderzoek",
    "frontend.myAddressResearchMoreInfoUrl.description":
      "Link naar meer informatie over adresonderzoek. Verborgen als deze niet is ingesteld.",
    "frontend.myBrpChangeUrl": "Link BRP wijzigen",
    "frontend.myBrpChangeUrl.description":
      "Link naar de pagina waar inwoners een wijziging van hun BRP-registratie aanvragen. Verborgen als deze niet is ingesteld.",
    "frontend.myBrpConfidentiallyChangeUrl": "Link geheimhouding BRP",
    "frontend.myBrpConfidentiallyChangeUrl.description":
      "Link naar de pagina waar inwoners geheimhouding van hun BRP-gegevens aanvragen. Verborgen als deze niet is ingesteld.",
    "frontend.overviewIntroEnabled": "Introductie tonen",
    "frontend.overviewIntroEnabled.description":
      "Toont de welkomsttitel en introductie op de overzichtspagina.",
    "frontend.overviewCurrentCasesPreviewLength": "Aantal lopende zaken",
    "frontend.overviewCurrentCasesPreviewLength.description":
      "Hoeveel lopende zaken de overzichtspagina toont. 0 verbergt de lijst.",
    "frontend.overviewCurrentTasksPreviewLength": "Aantal openstaande taken",
    "frontend.overviewCurrentTasksPreviewLength.description":
      "Hoeveel openstaande taken de overzichtspagina toont.",
    "frontend.overviewCurrentTasksPreviewLength.default":
      "5 (NL Portal gebruikt deze instelling nog niet)",
    "frontend.overviewMaintenanceAlertEnabled": "Onderhoudsmelding tonen",
    "frontend.overviewMaintenanceAlertEnabled.description":
      "Toont een waarschuwing op de overzichtspagina, met de titel en tekst hieronder.",
    "frontend.overviewMaintenanceAlertTitleNl":
      "Titel onderhoudsmelding (Nederlands)",
    "frontend.overviewMaintenanceAlertTitleNl.description":
      "Getoond voor elke taal behalve Engels. Vul beide talen in: er is geen terugval.",
    "frontend.overviewMaintenanceAlertTextNl":
      "Tekst onderhoudsmelding (Nederlands)",
    "frontend.overviewMaintenanceAlertTextNl.description":
      "Getoond voor elke taal behalve Engels. Vul beide talen in: er is geen terugval.",
    "frontend.overviewMaintenanceAlertTitleEn":
      "Titel onderhoudsmelding (Engels)",
    "frontend.overviewMaintenanceAlertTitleEn.description":
      "Alleen getoond als het portaal in het Engels (en-GB) staat. Vul beide talen in: er is geen terugval.",
    "frontend.overviewMaintenanceAlertTextEn":
      "Tekst onderhoudsmelding (Engels)",
    "frontend.overviewMaintenanceAlertTextEn.description":
      "Alleen getoond als het portaal in het Engels (en-GB) staat. Vul beide talen in: er is geen terugval.",
    "frontend.casesPartialSearchEnabled": "Gedeeltelijk zoeken op zaaknummer",
    "frontend.casesPartialSearchEnabled.description":
      "Vindt zaken waarvan het nummer de zoekterm bevat, in plaats van een exacte match.",
    "frontend.casesResultExplanationEnabled": "Toelichting resultaat tonen",
    "frontend.casesResultExplanationEnabled.description":
      "Toont de toelichting op het resultaat van een zaak op de zaakdetailpagina.",
    "frontend.casesContactMomentsEnabled": "Contactmomenten tonen",
    "frontend.casesContactMomentsEnabled.description":
      "Toont de contactmomenten van een zaak (uit OpenKlant) op de zaakdetailpagina.",
    "frontend.messageCountEnabled": "Aantal ongelezen berichten tonen",
    "frontend.messageCountEnabled.description":
      "Haalt periodiek het aantal ongelezen berichten op en toont dit in het menu.",
    "frontend.messageCountPollingInterval": "Interval berichtenteller (ms)",
    "frontend.messageCountPollingInterval.description":
      "Hoe vaak het aantal ongelezen berichten wordt opgehaald, in milliseconden. 0 betekent ook de standaardwaarde.",
    "frontend.openProductEnabled": "Open Product",
    "frontend.openProductEnabled.description":
      "Toont producten uit Open Product op de overzichtspagina en gebruikt de thema's daarvan in het menu.",
    "frontend.themeClass": "Themaklasse",
    "frontend.themeClass.description":
      "CSS-klasse die aan het html-element van de pagina wordt toegevoegd, bijvoorbeeld om een thema in de stylesheet te kiezen.",
    "frontend.toggles.custom": "Eigen toggles (geavanceerd)",
    "frontend.toggles.custom.description":
      "Een JSON-object met extra toggles voor een aangepast portaal, ongewijzigd opgeslagen. Ongeldige JSON zorgt dat het portaal alle portaalinterface-instellingen negeert, daarom slaat het paneel die niet op.",
    "frontend.properties.custom": "Eigen properties (geavanceerd)",
    "frontend.properties.custom.description":
      "Een JSON-object met extra properties voor een aangepast portaal, ongewijzigd opgeslagen. Ongeldige JSON zorgt dat het portaal alle portaalinterface-instellingen negeert, daarom slaat het paneel die niet op.",
    // theme.logo.*
    "theme.logo": "Logo",
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
    "theme.logo.replace-file": "Vervangen",
    "theme.logo.no-existing-logos":
      "Geen logo gevonden voor de huidige NL Portal-toepassing.",
    // theme.style.*
    "theme.style": "Stijl",
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
    // features.zakenapi.*
    "features.zakenapi.url": "Zaken API Url",
    "features.zakenapi.client-id": "Zaken API Client Id",
    "features.zakenapi.secret": "Zaken API Secret",
    "features.zakenapi.zaak-types-ids-excluded": "Uitgesloten zaaktype-uuid's",
    "features.zakenapi.zaak-types-ids-excluded.description":
      "Zaaktype-uuid's, gescheiden door komma's. Zaken van deze typen worden niet getoond.",
    "features.zakenapi.use-nnp-kvk-query-identificators":
      "Gebruik NNP KVK Query Identificators",
    "features.zakenapi.use-nnp-kvk-query-identificators.description":
      "Gebruik het NNP KVK-nummer als query identificator bij het ophalen van zaken",
    // features.catalogiapi.*
    "features.catalogiapi.url": "Catalogi API Url",
    "features.catalogiapi.client-id": "Catalogi API Client Id",
    "features.catalogiapi.secret": "Catalogi API Secret",
    // features.documentenapis.*
    "features.documentenapis.configurations": "Documenten API-configuraties",
    "features.documentenapis.configuration": "Configuratie",
    "features.documentenapis.configurations.add-another":
      "Configuratie toevoegen",
    "features.documentenapis.configurations.add-another.description":
      "Voeg een Documenten API-configuratie toe.",
    "features.documentenapis.url": "Documenten API Url",
    "features.documentenapis.client-id": "Documenten API Client Id",
    "features.documentenapis.secret": "Documenten API Secret",
    "features.documentenapis.rsin": "RSIN",
    "features.documentenapis.rsin.description":
      "Het RSIN van de organisatie die verantwoordelijk is voor de documenten. Nodig voor uploads.",
    "features.documentenapis.document-type-url": "Informatieobjecttype URL",
    "features.documentenapis.document-type-url.description":
      "Het standaard informatieobjecttype in de Catalogi API voor uploads met deze configuratie. Nodig voor uploads zonder type.",
    "features.documentenapis.default-document-api": "Standaardconfiguratie",
    "features.documentenapis.default-document-api.description":
      "De configuratie die standaard wordt gebruikt.",
    "features.documentenapis.allowed-mime-types": "Toegestane bestandstypen",
    "features.documentenapis.allowed-mime-types.description":
      "MIME-typen die inwoners mogen uploaden, gescheiden door komma's.",
    "features.documentenapis.allowed-mime-types.default":
      "alle typen toegestaan",
    "features.documentenapis.vertrouwelijkheidsaanduiding-whitelist":
      "Whitelist vertrouwelijkheidsaanduiding documenten",
    "features.documentenapis.vertrouwelijkheidsaanduiding-whitelist.description":
      "Alleen documenten met een van deze vertrouwelijkheidsaanduidingen worden aan inwoners getoond. Selecteer niets om de standaard te gebruiken.",
    "features.documentenapis.status-whitelist": "Whitelist status documenten",
    "features.documentenapis.status-whitelist.description":
      "Alleen documenten met een van deze statussen worden aan inwoners getoond. Selecteer niets om de standaard te gebruiken.",
    // features.besluitenapi.*
    "features.besluitenapi.url": "Besluiten API Url",
    "features.besluitenapi.client-id": "Besluiten API Client Id",
    "features.besluitenapi.secret": "Besluiten API Secret",
    // features.objectsapi.*
    "features.objectsapi.url": "Objecten API Url",
    "features.objectsapi.token": "Objecten API Token",
    "features.objectsapi.token.description":
      "Het token waarmee verzoeken aan de Objecten API worden geauthenticeerd",
    // features.openklant2.*
    "features.openklant2.klantinteracties-api-url": "Klantinteracties API Url",
    "features.openklant2.klantinteracties-api-url.description":
      "De url van de Klantinteracties API",
    "features.openklant2.contactgegevens-api-url": "Contactgegevens API Url",
    "features.openklant2.contactgegevens-api-url.description":
      "De url van de Contactgegevens API",
    "features.openklant2.token": "OpenKlant 2 Token",
    "features.openklant2.token.description":
      "Het token waarmee verzoeken aan OpenKlant 2 worden geauthenticeerd",
    "features.openklant2.digital-adressen-referentie":
      "Referentie digitale adressen",
    "features.openklant2.digital-adressen-referentie.description":
      "Referentie die wordt opgeslagen bij de digitale adressen die inwoners in het portaal toevoegen.",
    "features.openklant2.klant-contact-code-register":
      "Coderegister klantcontacten",
    "features.openklant2.klant-contact-code-register.description":
      "De waarden worden ongewijzigd gebruikt om klantcontacten te filteren. Niet ingesteld betekent dat het filter niet wordt toegepast.",
    "features.openklant2.klant-contact-code-register.zaak": "Zaken",
    "features.openklant2.klant-contact-code-register.zaak.description":
      "Coderegister van klantcontacten over zaken.",
    "features.openklant2.klant-contact-code-register.product": "Producten",
    "features.openklant2.klant-contact-code-register.product.description":
      "Coderegister van klantcontacten over producten.",
    // features.haalcentraal-hr.*
    "features.haalcentraal-hr.url": "HaalCentraal HR API Url",
    "features.haalcentraal-hr.url.description":
      "De url van de HaalCentraal Handelsregister API",
    "features.haalcentraal-hr.api-key": "HaalCentraal HR API Key",
    "features.haalcentraal-hr.api-key.description":
      "Wordt meegestuurd als X-API-KEY header",
    // features.haalcentraal2.*
    "features.haalcentraal2.brp-api-url": "HaalCentraal 2 BRP API Url",
    "features.haalcentraal2.brp-api-url.description":
      "De url van de HaalCentraal 2 BRP API",
    "features.haalcentraal2.bewoning-api-url":
      "HaalCentraal 2 Bewoning API Url",
    "features.haalcentraal2.bewoning-api-url.description":
      "De url van de HaalCentraal 2 Bewoning API",
    "features.haalcentraal2.api-key": "HaalCentraal 2 API Key",
    "features.haalcentraal2.api-key.description":
      "Wordt als X-API-KEY header naar beide API's gestuurd",
    "features.haalcentraal2.additional-headers": "Extra headers",
    "features.haalcentraal2.additional-headers.description":
      "Headers die met elk verzoek naar beide API's worden meegestuurd.",
    "features.haalcentraal2.allowed-cities-for-bewoning":
      "Woonplaatsen voor bewoning",
    "features.haalcentraal2.allowed-cities-for-bewoning.description":
      "Woonplaatsnamen, gescheiden door komma's. Het aantal bewoners wordt alleen opgehaald voor adressen in deze woonplaatsen.",
    "features.haalcentraal2.allowed-cities-for-bewoning.default":
      "alle woonplaatsen",
    "features.haalcentraal2.brp-fields": "BRP-velden",
    "features.haalcentraal2.brp-fields.description":
      "Velden die bij de BRP API worden opgevraagd, gescheiden door komma's. Vervangt de standaardlijst.",
    "features.haalcentraal2.brp-fields.default":
      "aNummer, adressering, burgerservicenummer, datumEersteInschrijvingGBA, datumInschrijvingInGemeente, europeesKiesrecht, geboorte, gemeenteVanInschrijving, geslacht, gezag, immigratie, indicatieCurateleRegister, kinderen, leeftijd, naam, nationaliteiten, ouders, overlijden, partners, uitsluitingKiesrecht, verblijfplaats, verblijfstitel, verblijfplaatsBinnenland, adresseringBinnenland",
    // features.taak.*
    "features.taak.object-type-url": "Externe Klanttaak Objecttype Url",
    "features.taak.object-type-url.description":
      "De url van het Externe Klanttaak objecttype in Open Object",
    // features.berichten.*
    "features.berichten.bericht-object-type-url": "Bericht Objecttype Url",
    "features.berichten.bericht-object-type-url.description":
      "De url van het Bericht objecttype in Open Object",
    // features.verificatie.*
    "features.verificatie.url": "Verificatie API Url",
    "features.verificatie.url.description":
      "De url van de verificatieservice die codes naar telefoonnummers en e-mailadressen stuurt",
    "features.verificatie.client-id": "Client Id",
    "features.verificatie.secret": "Secret",
    "features.verificatie.api-key": "API Key",
    "features.verificatie.api-key.description":
      "De API key van de verificatieservice",
    "features.verificatie.template-id-phone-number":
      "Template-id telefoonnummer",
    "features.verificatie.template-id-phone-number.description":
      "Id van de berichttemplate waarmee telefoonnummers worden geverifieerd",
    "features.verificatie.template-id-email": "Template-id e-mail",
    "features.verificatie.template-id-email.description":
      "Id van de berichttemplate waarmee e-mailadressen worden geverifieerd",
    "features.verificatie.types-need-verification":
      "Typen die verificatie nodig hebben",
    "features.verificatie.types-need-verification.description":
      "Digitale adressen van deze typen moeten worden geverifieerd voordat ze worden opgeslagen.",
    // features.form.*
    "features.form.form-definition-object-type-url":
      "Formulierdefinitie objecttype Url",
    "features.form.form-definition-object-type-url.description":
      "De url van het formulierdefinitie-objecttype in Open Object. Formulieren zijn beschikbaar zodra Open Object is ingeschakeld.",
    "features.form.form-definition-object-type-url.default":
      "niet ingesteld: het objecttype wordt niet gecontroleerd",
    // features.product.*
    "features.product.product-type-url": "Producttype Url",
    "features.product.product-type-url.description":
      "De url van het Product objecttype in Open Object",
    "features.product.product-instantie-type-url":
      "Productinstantie objecttype Url",
    "features.product.product-instantie-type-url.description":
      "De url van het Productinstantie objecttype in Open Object",
    "features.product.product-verbruiks-object-type-url":
      "Productverbruiksobject objecttype Url",
    "features.product.product-verbruiks-object-type-url.description":
      "De url van het Productverbruiksobject objecttype in Open Object",
    "features.product.product-details-type-url":
      "Productdetails objecttype Url",
    "features.product.product-details-type-url.description":
      "De url van het Productdetails objecttype in Open Object",
    // features.openproduct.*
    "features.openproduct.product-api-url": "Open Product API Url",
    "features.openproduct.product-api-url.description":
      "De url van de Open Product producten API",
    "features.openproduct.product-type-api-url":
      "Open Product producttypen API Url",
    "features.openproduct.product-type-api-url.description":
      "De url van de Open Product producttypen API",
    "features.openproduct.token": "Open Product Token",
    "features.openproduct.token.description":
      "Het token waarmee verzoeken aan Open Product worden geauthenticeerd",
    "features.openproduct.dmn": "DMN",
    "features.openproduct.dmn.description":
      "Authenticatie voor de DMN-beslissingen van Open Product. De url komt uit het producttype.",
    "features.openproduct.dmn.client-id": "Client Id",
    "features.openproduct.dmn.secret": "Secret",
    "features.openproduct.dmn.username": "Gebruikersnaam",
    "features.openproduct.dmn.username.description":
      "Gebruikersnaam voor Basic Authentication",
    "features.openproduct.dmn.password": "Wachtwoord",
    "features.openproduct.dmn.password.description":
      "Wachtwoord voor Basic Authentication",
    // features.dmn.*
    "features.dmn.url": "Camunda DMN API Url",
    "features.dmn.url.description":
      "De url van de Camunda DMN API die beslissingen uitvoert",
    "features.dmn.client-id": "Client Id",
    "features.dmn.secret": "Secret",
    "features.dmn.username": "Gebruikersnaam",
    "features.dmn.username.description":
      "Gebruikersnaam voor Basic Authentication",
    "features.dmn.password": "Wachtwoord",
    "features.dmn.password.description": "Wachtwoord voor Basic Authentication",
    // features.prefill.*
    "features.prefill.type-url": "Prefill objecttype Url",
    "features.prefill.type-url.description":
      "De url van het Prefill objecttype in Open Object",
    "features.prefill.prefill-sha-version": "SHA-versie prefill-object",
    "features.prefill.prefill-sha-version.description":
      "De SHA-versie waarmee het prefill-object wordt gehasht",
    // features.payment.direct.*
    "features.payment.direct.url": "Payment API URL",
    "features.payment.direct.url.description":
      "Het API-endpoint van het Worldline Online Payments platform",
    "features.payment.direct.webhook-url": "Webhook URL",
    "features.payment.direct.webhook-url.description":
      "De URL waar Worldline statuswijzigingen van betalingen naartoe stuurt",
    "features.payment.direct.custom-template-url": "Eigen template",
    "features.payment.direct.custom-template-url.description":
      "Naam van een Worldline hosted checkout template",
    "features.payment.direct.show-result-page": "Resultaatpagina tonen",
    "features.payment.direct.show-result-page.description":
      "Toon de resultaatpagina van Worldline na de betaling",
    "features.payment.direct.sha-out-parameters": "SHA-OUT parameters",
    "features.payment.direct.sha-out-parameters.description":
      "Welke SHA-OUT parameters moeten worden gevalideerd. NL Portal 4.0 leest deze instelling niet.",
    "features.payment.direct.webhook-headers": "webhook-headers",
    "features.payment.direct.webhook-headers.description":
      "Lijst, gescheiden door komma's. NL Portal 4.0 leest deze instelling niet.",
    "features.payment.direct.profiles": "Betaalprofielen",
    "features.payment.direct.profile": "Profiel",
    "features.payment.direct.profiles.add-another": "Profiel toevoegen",
    "features.payment.direct.profiles.add-another.description":
      "Voeg een betaalprofiel toe.",
    "features.payment.direct.psp-id": "PSPID",
    "features.payment.direct.psp-id.description":
      "De payment service provider ID (merchant ID) van uw Worldline-account",
    "features.payment.direct.language": "Taal",
    "features.payment.direct.language.description": "De taal van het afrekenen",
    "features.payment.direct.currency": "Valuta",
    "features.payment.direct.currency.description":
      "De valuta van dit betaalprofiel, als ISO 4217-code",
    "features.payment.direct.api-key": "API Key Id",
    "features.payment.direct.api-key.description":
      "De id van de API key die wordt gebruikt voor autorisatie",
    "features.payment.direct.api-secret": "API Secret",
    "features.payment.direct.api-secret.description":
      "De geheime sleutel die wordt gebruikt voor autorisatie",
    "features.payment.direct.return-url": "Return URL",
    "features.payment.direct.return-url.description":
      "De URL waarnaar Worldline doorverwijst na het afrekenen",
    "features.payment.direct.webhook-api-key": "Webhook API Key ID",
    "features.payment.direct.webhook-api-key.description":
      "De ID van de webhooksleutel waarmee webhookberichten worden gevalideerd",
    "features.payment.direct.webhook-api-secret": "Webhook API Secret",
    "features.payment.direct.webhook-api-secret.description":
      "De geheime webhooksleutel waarmee webhookberichten worden gevalideerd",
    "features.payment.direct.creditcard-enabled": "Creditcard",
    "features.payment.direct.creditcard-enabled.description":
      "Betalen met creditcard toestaan",
    "features.payment.direct.allowed-number-of-payments":
      "Toegestaan aantal betaalpogingen",
    "features.payment.direct.allowed-number-of-payments.description":
      "Hoe vaak een inwoner mag proberen te betalen",
    // features.virusscan.clamav.*
    "features.virusscan.clamav.host-name": "Hostnaam",
    "features.virusscan.clamav.host-name.description":
      "De hostnaam van de ClamAV-service. Alleen documentuploads bij taken worden gescand.",
    "features.virusscan.clamav.port": "Poort",
    "features.virusscan.clamav.port.description":
      "De poort waarop de ClamAV-service luistert",
    // enums.vertrouwelijkheidsaanduiding.*
    "enums.vertrouwelijkheidsaanduiding.OPENBAAR": "Openbaar",
    "enums.vertrouwelijkheidsaanduiding.BEPERKT_OPENBAAR": "Beperkt openbaar",
    "enums.vertrouwelijkheidsaanduiding.INTERN": "Intern",
    "enums.vertrouwelijkheidsaanduiding.ZAAKVERTROUWELIJK": "Zaakvertrouwelijk",
    "enums.vertrouwelijkheidsaanduiding.VERTROUWELIJK": "Vertrouwelijk",
    "enums.vertrouwelijkheidsaanduiding.CONFIDENTIEEL": "Confidentieel",
    "enums.vertrouwelijkheidsaanduiding.GEHEIM": "Geheim",
    "enums.vertrouwelijkheidsaanduiding.ZEER_GEHEIM": "Zeer geheim",
    "enums.vertrouwelijkheidsaanduiding.GEEN": "Geen",
    // enums.document-status.*
    "enums.document-status.IN_BEWERKING": "In bewerking",
    "enums.document-status.TER_VASTSTELLING": "Ter vaststelling",
    "enums.document-status.DEFINITIEF": "Definitief",
    "enums.document-status.GEARCHIVEERD": "Gearchiveerd",
    "enums.document-status.GEEN_STATUS": "Geen status",
    // enums.verificatie-type.*
    "enums.verificatie-type.TELEFOONNUMMER": "Telefoonnummer",
    "enums.verificatie-type.EMAIL": "E-mailadres",
    "enums.verificatie-type.OVERIG": "Overig",
  },
};
