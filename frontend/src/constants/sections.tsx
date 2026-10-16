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

import ThemeLogoConfiguration from "../components/theme-components/ThemeLogoConfiguration.tsx";
import ThemeStyleConfiguration from "../components/theme-components/ThemeStyleConfiguration.tsx";
import {
  ConfigSection,
  ConfigSectionKind,
  EditableSection,
  FieldSpec,
  FrontendSection,
  ModuleFeatureSection,
  ThemeSection,
} from "../interfaces/ConfigSection.ts";
import {
  DOCUMENT_STATUS,
  LANGUAGE,
  SHA_OUT_PARAMETER,
  SHA_VERSION,
  VERIFICATIE_TYPE,
  VERTROUWELIJKHEIDSAANDUIDING,
} from "./enums.ts";

// Field sets and defaults mirror NL Portal 4.0 (`rc/4.0.0`): the `*Config.kt` / `*ModuleConfiguration.kt`
// classes for modules, and what the end-user SPA does when a frontend setting is unset.
// A Kotlin default of `""` means "not set" and is shown as such.
// Module titles are the backend module names (`nl-portal.config.<module>`), pretty-printed and not translated.

/** Label and description keys for `<base>.<key>`. */
const keys = (base: string, key: string) => ({
  key,
  labelKey: `${base}.${key}`,
  descriptionKey: `${base}.${key}.description`,
});

const ZGW_HOST = "https://zgw.example.com";

/** ZGW APIs that take the server root; the client adds the API path. */
const zgwServerUrl = (base: string): FieldSpec => ({
  type: "url",
  ...keys(base, "url"),
  descriptionKey: "fields.zgw-url.server-root.description",
  placeholder: ZGW_HOST,
  default: null,
});

const clientIdField = (base: string): FieldSpec => ({
  type: "text",
  ...keys(base, "client-id"),
  descriptionKey: "fields.client-id.description",
  placeholder: "nl-portal",
  default: null,
});

const secretField = (base: string): FieldSpec => ({
  type: "secret",
  ...keys(base, "secret"),
  descriptionKey: "fields.secret.description",
  default: null,
});

const sslField = (): FieldSpec => ({
  type: "ssl",
  key: "ssl",
  labelKey: "fields.ssl",
  default: null,
});

const ZAKENAPI = "features.zakenapi";
const CATALOGIAPI = "features.catalogiapi";
const DOCUMENTENAPIS = "features.documentenapis";
const BESLUITENAPI = "features.besluitenapi";
const OBJECTSAPI = "features.objectsapi";
const OPENKLANT2 = "features.openklant2";
const HAALCENTRAAL_HR = "features.haalcentraal-hr";
const HAALCENTRAAL2 = "features.haalcentraal2";
const TAAK = "features.taak";
const BERICHTEN = "features.berichten";
const VERIFICATIE = "features.verificatie";
const FORM = "features.form";
const PRODUCT = "features.product";
const OPENPRODUCT = "features.openproduct";
const DMN = "features.dmn";
const PREFILL = "features.prefill";
const PAYMENT_DIRECT = "features.payment.direct";
const CLAMAV = "features.virusscan.clamav";

export const moduleSections: ModuleFeatureSection[] = [
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "zakenapi",
    title: "Zaken API",
    prefix: "nl-portal.config.zakenapi",
    enableToggle: true,
    // ZakenApiAutoConfiguration: objectenapi + catalogiapi + zakenapi; ZakenApiService needs DocumentenApiService;
    // ZakenAutoConfiguration's ZaakQuery needs BesluitenService; the case details page queries tasks (TaakQueryV2).
    requires: [
      "objectsapi",
      "catalogiapi",
      "documentenapis",
      "besluitenapi",
      "taak",
    ],
    fields: [
      zgwServerUrl(ZAKENAPI),
      clientIdField(ZAKENAPI),
      secretField(ZAKENAPI),
      {
        type: "text",
        ...keys(ZAKENAPI, "zaak-types-ids-excluded"),
        placeholder: "3f6d9e2a-0c1b-4c8e-9a51-7d2b6e4f1a90, 8b2e…",
        default: [],
      },
      {
        type: "bool",
        ...keys(ZAKENAPI, "use-nnp-kvk-query-identificators"),
        default: false,
      },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "catalogiapi",
    title: "Catalogi API",
    prefix: "nl-portal.config.catalogiapi",
    enableToggle: true,
    fields: [
      zgwServerUrl(CATALOGIAPI),
      clientIdField(CATALOGIAPI),
      secretField(CATALOGIAPI),
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "documentenapis",
    title: "Documenten APIs",
    prefix: "nl-portal.config.documentenapis",
    enableToggle: true,
    fields: [
      {
        type: "profileMap",
        key: "configurations",
        labelKey: `${DOCUMENTENAPIS}.configurations`,
        profileLabelKey: `${DOCUMENTENAPIS}.configuration`,
        addLabelKey: `${DOCUMENTENAPIS}.configurations.add-another`,
        addDescriptionKey: `${DOCUMENTENAPIS}.configurations.add-another.description`,
        namePlaceholder: "open-zaak",
        default: null,
        fields: [
          {
            type: "url",
            ...keys(DOCUMENTENAPIS, "url"),
            descriptionKey: "fields.zgw-url.full-api.description",
            placeholder: `${ZGW_HOST}/documenten/api/v1`,
            default: null,
          },
          clientIdField(DOCUMENTENAPIS),
          secretField(DOCUMENTENAPIS),
          {
            type: "text",
            ...keys(DOCUMENTENAPIS, "rsin"),
            placeholder: "002564440",
            default: null,
          },
          {
            type: "url",
            ...keys(DOCUMENTENAPIS, "document-type-url"),
            placeholder: `${ZGW_HOST}/catalogi/api/v1/informatieobjecttypen/0b5e1c7d-3f2a-4e8b-9c6d-1a2b3c4d5e6f`,
            default: null,
          },
          sslField(),
        ],
      },
      {
        type: "keyRefSelect",
        ...keys(DOCUMENTENAPIS, "default-document-api"),
        refKey: "configurations",
        default: null,
      },
      {
        type: "text",
        ...keys(DOCUMENTENAPIS, "allowed-mime-types"),
        placeholder: "application/pdf, image/jpeg, image/png",
        default: { messageId: `${DOCUMENTENAPIS}.allowed-mime-types.default` },
      },
      {
        type: "enumMulti",
        ...keys(DOCUMENTENAPIS, "vertrouwelijkheidsaanduiding-whitelist"),
        options: VERTROUWELIJKHEIDSAANDUIDING,
        default: [
          "OPENBAAR",
          "BEPERKT_OPENBAAR",
          "INTERN",
          "ZAAKVERTROUWELIJK",
        ],
      },
      {
        type: "enumMulti",
        ...keys(DOCUMENTENAPIS, "status-whitelist"),
        options: DOCUMENT_STATUS,
        default: ["DEFINITIEF", "GEARCHIVEERD"],
      },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "besluitenapi",
    title: "Besluiten API",
    prefix: "nl-portal.config.besluitenapi",
    enableToggle: true,
    // BesluitenAutoConfiguration: besluitenapi + documentenapis + zakenapi; needs ZakenApiService
    // (objectenapi, catalogiapi) and CatalogiApiService.
    requires: ["zakenapi", "documentenapis", "catalogiapi", "objectsapi"],
    fields: [
      zgwServerUrl(BESLUITENAPI),
      clientIdField(BESLUITENAPI),
      secretField(BESLUITENAPI),
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "objectsapi",
    title: "Objecten API",
    prefix: "nl-portal.config.objectenapi",
    enableToggle: true,
    fields: [
      zgwServerUrl(OBJECTSAPI),
      { type: "secret", ...keys(OBJECTSAPI, "token"), default: null },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "openklant2",
    title: "OpenKlant 2",
    prefix: "nl-portal.config.openklant2",
    enableToggle: true,
    fields: [
      {
        type: "url",
        ...keys(OPENKLANT2, "klantinteracties-api-url"),
        placeholder: "https://openklant.example.com/klantinteracties/api/v1",
        default: null,
      },
      {
        type: "url",
        ...keys(OPENKLANT2, "contactgegevens-api-url"),
        placeholder: "https://openklant.example.com/contactgegevens/api/v1",
        default: null,
      },
      { type: "secret", ...keys(OPENKLANT2, "token"), default: null },
      {
        type: "text",
        ...keys(OPENKLANT2, "digital-adressen-referentie"),
        placeholder: "portaalvoorkeur",
        default: null,
      },
      {
        type: "group",
        ...keys(OPENKLANT2, "klant-contact-code-register"),
        default: null,
        fields: [
          {
            type: "text",
            ...keys(`${OPENKLANT2}.klant-contact-code-register`, "zaak"),
            placeholder: "open-zaak",
            default: null,
          },
          {
            type: "text",
            ...keys(`${OPENKLANT2}.klant-contact-code-register`, "product"),
            placeholder: "open-product",
            default: null,
          },
        ],
      },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "haalcentraal-hr",
    title: "HaalCentraal HR",
    prefix: "nl-portal.config.haalcentraal.hr",
    enableToggle: true,
    fields: [
      {
        type: "url",
        ...keys(HAALCENTRAAL_HR, "url"),
        placeholder: "https://hr.example.com/haalcentraal/api/hr",
        default: null,
      },
      { type: "secret", ...keys(HAALCENTRAAL_HR, "api-key"), default: null },
      sslField(),
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "haalcentraal2",
    title: "HaalCentraal 2",
    prefix: "nl-portal.config.haalcentraal2",
    enableToggle: true,
    fields: [
      {
        type: "url",
        ...keys(HAALCENTRAAL2, "brp-api-url"),
        placeholder: "https://brp.example.com/haalcentraal/api/brp/personen",
        default: null,
      },
      {
        type: "url",
        ...keys(HAALCENTRAAL2, "bewoning-api-url"),
        placeholder:
          "https://brp.example.com/haalcentraal/api/bewoning/bewoningen",
        default: null,
      },
      { type: "secret", ...keys(HAALCENTRAAL2, "api-key"), default: null },
      {
        type: "stringMap",
        ...keys(HAALCENTRAAL2, "additional-headers"),
        keyPlaceholder: "X-Gebruiker",
        default: null,
      },
      sslField(),
      {
        type: "text",
        ...keys(HAALCENTRAAL2, "allowed-cities-for-bewoning"),
        placeholder: "Den Haag, Rotterdam",
        default: {
          messageId: `${HAALCENTRAAL2}.allowed-cities-for-bewoning.default`,
        },
      },
      {
        type: "text",
        ...keys(HAALCENTRAAL2, "brp-fields"),
        placeholder: "burgerservicenummer, naam, geboorte",
        default: { messageId: `${HAALCENTRAAL2}.brp-fields.default` },
      },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "taak",
    title: "Taak",
    prefix: "nl-portal.config.taak",
    enableToggle: true,
    // TaakAutoConfiguration: objectenapi + taak; task documents need documentenapis.
    requires: ["objectsapi", "documentenapis"],
    fields: [
      {
        type: "url",
        ...keys(TAAK, "object-type-url"),
        placeholder: `${ZGW_HOST}/objecttypes/api/v2/objecttypes/2a8f4c1e-5b7d-4e3a-9f6c-0d1e2f3a4b5c`,
        default: null,
      },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "berichten",
    title: "Berichten",
    prefix: "nl-portal.config.berichten",
    enableToggle: true,
    // BerichtenAutoConfiguration: berichten + documentenapis; BerichtenService needs ObjectenApiService.
    requires: ["documentenapis", "objectsapi"],
    fields: [
      {
        type: "url",
        ...keys(BERICHTEN, "bericht-object-type-url"),
        placeholder: `${ZGW_HOST}/objecttypes/api/v2/objecttypes/7c3d5e9f-1a2b-4c6d-8e0f-3a4b5c6d7e8f`,
        default: null,
      },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "verificatie",
    title: "Verificatie",
    prefix: "nl-portal.config.verificatie",
    enableToggle: true,
    fields: [
      {
        type: "url",
        ...keys(VERIFICATIE, "url"),
        placeholder: "https://verificatie.example.com",
        default: null,
      },
      clientIdField(VERIFICATIE),
      secretField(VERIFICATIE),
      { type: "secret", ...keys(VERIFICATIE, "api-key"), default: null },
      {
        type: "text",
        ...keys(VERIFICATIE, "template-id-phone-number"),
        default: null,
      },
      {
        type: "text",
        ...keys(VERIFICATIE, "template-id-email"),
        default: null,
      },
      sslField(),
      {
        type: "enumMulti",
        ...keys(VERIFICATIE, "types-need-verification"),
        options: VERIFICATIE_TYPE,
        default: [],
      },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "form",
    title: "Form",
    prefix: "nl-portal.config.form",
    // FormConfig has no `enabled`; FormAutoConfiguration is active whenever objectenapi is enabled.
    enableToggle: false,
    fields: [
      {
        type: "url",
        ...keys(FORM, "form-definition-object-type-url"),
        placeholder: `${ZGW_HOST}/objecttypes/api/v2/objecttypes/4e5f6a7b-8c9d-4e0f-a1b2-c3d4e5f6a7b8`,
        default: {
          messageId: `${FORM}.form-definition-object-type-url.default`,
        },
      },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "product",
    title: "Product",
    hintKey: "features.deprecated.hint",
    prefix: "nl-portal.config.product",
    enableToggle: true,
    deprecated: true,
    deprecatedDescriptionId: "features.deprecated.use-openproduct",
    // ProductAutoConfiguration: productService needs product + objectenapi + zakenapi (and catalogiapi through
    // ZakenApiService); productQuery needs product + dmn + prefill.
    requires: ["objectsapi", "zakenapi", "catalogiapi", "dmn", "prefill"],
    fields: [
      {
        type: "url",
        ...keys(PRODUCT, "product-type-url"),
        placeholder: `${ZGW_HOST}/objecttypes/api/v2/objecttypes/…`,
        default: null,
      },
      {
        type: "url",
        ...keys(PRODUCT, "product-instantie-type-url"),
        placeholder: `${ZGW_HOST}/objecttypes/api/v2/objecttypes/…`,
        default: null,
      },
      {
        type: "url",
        ...keys(PRODUCT, "product-verbruiks-object-type-url"),
        placeholder: `${ZGW_HOST}/objecttypes/api/v2/objecttypes/…`,
        default: null,
      },
      {
        type: "url",
        ...keys(PRODUCT, "product-details-type-url"),
        placeholder: `${ZGW_HOST}/objecttypes/api/v2/objecttypes/…`,
        default: null,
      },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "openproduct",
    title: "OpenProduct",
    prefix: "nl-portal.config.openproduct",
    enableToggle: true,
    // OpenProductAutoConfiguration: openproduct + objectenapi + taak + zakenapi + documentenapis;
    // ZakenApiService needs catalogiapi.
    requires: [
      "objectsapi",
      "taak",
      "zakenapi",
      "documentenapis",
      "catalogiapi",
    ],
    fields: [
      {
        type: "url",
        ...keys(OPENPRODUCT, "product-api-url"),
        placeholder: "https://openproduct.example.com/producten/api/v1",
        default: null,
      },
      {
        type: "url",
        ...keys(OPENPRODUCT, "product-type-api-url"),
        placeholder: "https://openproduct.example.com/producttypen/api/v1",
        default: null,
      },
      { type: "secret", ...keys(OPENPRODUCT, "token"), default: null },
      {
        // Used by OpenProductDmnClient, not by the DMN section.
        type: "group",
        ...keys(OPENPRODUCT, "dmn"),
        default: null,
        fields: [
          clientIdField(`${OPENPRODUCT}.dmn`),
          secretField(`${OPENPRODUCT}.dmn`),
          {
            type: "text",
            ...keys(`${OPENPRODUCT}.dmn`, "username"),
            default: null,
          },
          {
            type: "secret",
            ...keys(`${OPENPRODUCT}.dmn`, "password"),
            default: null,
          },
          sslField(),
        ],
      },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "dmn",
    title: "DMN",
    hintKey: "features.deprecated.hint",
    prefix: "nl-portal.config.dmn",
    enableToggle: true,
    deprecated: true,
    deprecatedDescriptionId: "features.deprecated.use-openproduct",
    // ProductAutoConfiguration: dmnService needs ProductService and objectenapi + dmn.
    requires: ["product", "objectsapi"],
    fields: [
      {
        type: "url",
        ...keys(DMN, "url"),
        placeholder: "https://camunda.example.com/engine-rest",
        default: null,
      },
      clientIdField(DMN),
      secretField(DMN),
      { type: "text", ...keys(DMN, "username"), default: null },
      { type: "secret", ...keys(DMN, "password"), default: null },
      sslField(),
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "prefill",
    title: "Prefill",
    hintKey: "features.deprecated.hint",
    prefix: "nl-portal.config.prefill",
    enableToggle: true,
    deprecated: true,
    deprecatedDescriptionId: "features.deprecated.use-openproduct",
    // ProductAutoConfiguration: prefillService needs ProductService and objectenapi + prefill.
    requires: ["product", "objectsapi"],
    fields: [
      {
        type: "url",
        ...keys(PREFILL, "type-url"),
        placeholder: `${ZGW_HOST}/objecttypes/api/v2/objecttypes/…`,
        default: null,
      },
      {
        type: "enum",
        ...keys(PREFILL, "prefill-sha-version"),
        options: SHA_VERSION,
        default: "SHA1",
      },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "payment-direct",
    title: "Payment Direct",
    prefix: "nl-portal.config.payment.direct",
    enableToggle: true,
    // DirectPaymentAutoConfiguration: the webhook service and controller need objectenapi.
    requires: ["objectsapi"],
    fields: [
      {
        type: "url",
        ...keys(PAYMENT_DIRECT, "url"),
        placeholder: "https://payment.example.com",
        default: null,
      },
      sslField(),
      {
        type: "url",
        ...keys(PAYMENT_DIRECT, "webhook-url"),
        placeholder: "https://portal.example.com/api/payment/direct/webhook",
        default: null,
      },
      {
        type: "text",
        ...keys(PAYMENT_DIRECT, "custom-template-url"),
        placeholder: "MyTemplate.html",
        default: null,
      },
      {
        type: "bool",
        ...keys(PAYMENT_DIRECT, "show-result-page"),
        default: false,
      },
      {
        type: "enumMulti",
        ...keys(PAYMENT_DIRECT, "sha-out-parameters"),
        options: SHA_OUT_PARAMETER,
        default: [],
      },
      { type: "text", ...keys(PAYMENT_DIRECT, "webhook-headers"), default: [] },
      {
        type: "profileMap",
        key: "configurations",
        labelKey: `${PAYMENT_DIRECT}.profiles`,
        profileLabelKey: `${PAYMENT_DIRECT}.profile`,
        addLabelKey: `${PAYMENT_DIRECT}.profiles.add-another`,
        addDescriptionKey: `${PAYMENT_DIRECT}.profiles.add-another.description`,
        namePlaceholder: "default",
        default: null,
        fields: [
          {
            type: "text",
            ...keys(PAYMENT_DIRECT, "psp-id"),
            placeholder: "NLPortal",
            default: null,
          },
          {
            type: "enum",
            ...keys(PAYMENT_DIRECT, "language"),
            options: LANGUAGE,
            default: "nl_NL",
          },
          {
            type: "text",
            ...keys(PAYMENT_DIRECT, "currency"),
            placeholder: "EUR",
            default: "EUR",
          },
          { type: "secret", ...keys(PAYMENT_DIRECT, "api-key"), default: null },
          {
            type: "secret",
            ...keys(PAYMENT_DIRECT, "api-secret"),
            default: null,
          },
          {
            type: "url",
            ...keys(PAYMENT_DIRECT, "return-url"),
            placeholder: "https://portal.example.com/betalen/resultaat",
            default: null,
          },
          {
            type: "text",
            ...keys(PAYMENT_DIRECT, "webhook-api-key"),
            default: null,
          },
          {
            type: "secret",
            ...keys(PAYMENT_DIRECT, "webhook-api-secret"),
            default: null,
          },
          {
            type: "bool",
            ...keys(PAYMENT_DIRECT, "creditcard-enabled"),
            default: false,
          },
          {
            type: "number",
            ...keys(PAYMENT_DIRECT, "allowed-number-of-payments"),
            placeholder: "1",
            default: 1,
          },
        ],
      },
    ],
  },
  {
    kind: ConfigSectionKind.MODULE_FEATURE,
    id: "virusscan-clamav",
    title: "Virusscan ClamAV",
    prefix: "nl-portal.config.virusscan.clamav",
    enableToggle: true,
    fields: [
      {
        type: "text",
        ...keys(CLAMAV, "host-name"),
        placeholder: "clamav.example.com",
        default: null,
      },
      {
        type: "number",
        ...keys(CLAMAV, "port"),
        placeholder: "3310",
        default: 3310,
      },
    ],
  },
];

const FRONTEND = "frontend";

export const frontendSections: FrontendSection[] = [
  {
    kind: ConfigSectionKind.FRONTEND,
    id: "frontend",
    titleKey: `${FRONTEND}.title`,
    basePrefix: "nl-portal.frontend",
    stores: ["toggles", "properties"],
    groups: [
      {
        titleKey: `${FRONTEND}.group.account`,
        fields: [
          {
            store: "toggles",
            type: "toggle",
            ...keys(FRONTEND, "myInhabitantCountEnabled"),
            default: false,
          },
          {
            store: "properties",
            type: "url",
            ...keys(FRONTEND, "myNameChangeUrl"),
            placeholder: "https://www.example.com/naamswijziging",
            default: null,
          },
          {
            store: "properties",
            type: "url",
            ...keys(FRONTEND, "myGenderChangeUrl"),
            placeholder: "https://www.example.com/geslachtswijziging",
            default: null,
          },
          {
            store: "properties",
            type: "url",
            ...keys(FRONTEND, "myAddressChangeUrl"),
            placeholder: "https://www.example.com/verhuizen",
            default: null,
          },
          {
            store: "properties",
            type: "url",
            ...keys(FRONTEND, "myAddressResearchUrl"),
            placeholder: "https://www.example.com/adresonderzoek",
            default: null,
          },
          {
            store: "properties",
            type: "url",
            ...keys(FRONTEND, "myAddressResearchMoreInfoUrl"),
            placeholder:
              "https://www.example.com/adresonderzoek-meer-informatie",
            default: null,
          },
          {
            store: "properties",
            type: "url",
            ...keys(FRONTEND, "myBrpChangeUrl"),
            placeholder: "https://www.example.com/brp-wijzigen",
            default: null,
          },
          {
            store: "properties",
            type: "url",
            ...keys(FRONTEND, "myBrpConfidentiallyChangeUrl"),
            placeholder: "https://www.example.com/geheimhouding",
            default: null,
          },
        ],
      },
      {
        titleKey: `${FRONTEND}.group.overview`,
        fields: [
          {
            store: "toggles",
            type: "toggle",
            ...keys(FRONTEND, "overviewIntroEnabled"),
            default: false,
          },
          {
            store: "properties",
            type: "number",
            ...keys(FRONTEND, "overviewCurrentCasesPreviewLength"),
            placeholder: "4",
            default: 4,
          },
          {
            store: "properties",
            type: "number",
            ...keys(FRONTEND, "overviewCurrentTasksPreviewLength"),
            placeholder: "5",
            // Not read by the end-user SPA yet (nl-portal-issues#164).
            default: {
              messageId: `${FRONTEND}.overviewCurrentTasksPreviewLength.default`,
            },
          },
          {
            store: "toggles",
            type: "toggle",
            ...keys(FRONTEND, "overviewMaintenanceAlertEnabled"),
            default: false,
          },
          {
            store: "properties",
            type: "text",
            ...keys(FRONTEND, "overviewMaintenanceAlertTitleNl"),
            placeholder: "Gepland onderhoud",
            default: null,
            dependsOn: { field: "toggles.overviewMaintenanceAlertEnabled" },
          },
          {
            store: "properties",
            type: "text",
            ...keys(FRONTEND, "overviewMaintenanceAlertTextNl"),
            placeholder:
              "Op zaterdag is Mijn Gemeente door onderhoud niet beschikbaar.",
            default: null,
            dependsOn: { field: "toggles.overviewMaintenanceAlertEnabled" },
          },
          {
            store: "properties",
            type: "text",
            ...keys(FRONTEND, "overviewMaintenanceAlertTitleEn"),
            placeholder: "Scheduled maintenance",
            default: null,
            dependsOn: { field: "toggles.overviewMaintenanceAlertEnabled" },
          },
          {
            store: "properties",
            type: "text",
            ...keys(FRONTEND, "overviewMaintenanceAlertTextEn"),
            placeholder:
              "My Municipality is unavailable on Saturday due to maintenance.",
            default: null,
            dependsOn: { field: "toggles.overviewMaintenanceAlertEnabled" },
          },
        ],
      },
      {
        titleKey: `${FRONTEND}.group.cases`,
        fields: [
          {
            store: "toggles",
            type: "toggle",
            ...keys(FRONTEND, "casesPartialSearchEnabled"),
            default: false,
          },
          {
            store: "toggles",
            type: "toggle",
            ...keys(FRONTEND, "casesResultExplanationEnabled"),
            default: false,
          },
          {
            store: "toggles",
            type: "toggle",
            ...keys(FRONTEND, "casesContactMomentsEnabled"),
            default: false,
          },
        ],
      },
      {
        titleKey: `${FRONTEND}.group.messages`,
        fields: [
          {
            store: "toggles",
            type: "toggle",
            ...keys(FRONTEND, "messageCountEnabled"),
            default: false,
          },
          {
            store: "properties",
            type: "number",
            ...keys(FRONTEND, "messageCountPollingInterval"),
            placeholder: "30000",
            default: 30000,
            dependsOn: { field: "toggles.messageCountEnabled" },
          },
        ],
      },
      {
        titleKey: `${FRONTEND}.group.products`,
        fields: [
          {
            store: "toggles",
            type: "toggle",
            ...keys(FRONTEND, "openProductEnabled"),
            default: false,
          },
        ],
      },
      {
        titleKey: `${FRONTEND}.group.theme`,
        fields: [
          {
            store: "properties",
            type: "text",
            ...keys(FRONTEND, "themeClass"),
            placeholder: "theme-example",
            default: null,
          },
        ],
      },
      {
        titleKey: `${FRONTEND}.group.other`,
        fields: [
          {
            store: "toggles",
            type: "json",
            key: "custom",
            labelKey: `${FRONTEND}.toggles.custom`,
            descriptionKey: `${FRONTEND}.toggles.custom.description`,
            placeholder: '{ "myToggle": true }',
            default: null,
          },
          {
            store: "properties",
            type: "json",
            key: "custom",
            labelKey: `${FRONTEND}.properties.custom`,
            descriptionKey: `${FRONTEND}.properties.custom.description`,
            placeholder: '{ "myProperty": "value" }',
            default: null,
          },
        ],
      },
    ],
  },
];

export const themeSections: ThemeSection[] = [
  {
    kind: ConfigSectionKind.THEME,
    id: "logo",
    titleKey: "theme.logo",
    component: ThemeLogoConfiguration,
  },
  {
    kind: ConfigSectionKind.THEME,
    id: "style",
    titleKey: "theme.style",
    component: ThemeStyleConfiguration,
  },
];

export const editableSections: EditableSection[] = [
  ...frontendSections,
  ...moduleSections,
];

export const sections: ConfigSection[] = [
  ...frontendSections,
  ...themeSections,
  ...moduleSections,
];
