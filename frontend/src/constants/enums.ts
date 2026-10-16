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

import { EnumOption } from "../interfaces/ConfigSection.ts";

// Enum values mirror the Kotlin constant names (Spring binds properties by constant name),
// not their JSON values. Source files are in the NL Portal backend (`rc/4.0.0`).

const options = (prefix: string, values: string[]): EnumOption[] =>
  values.map((value) => ({ value, labelKey: `${prefix}.${value}` }));

// core/src/main/kotlin/nl/nlportal/core/util/ShaVersion.kt (bound as a String by PrefillConfig)
export const SHA_VERSION: EnumOption[] = [
  { value: "SHA1" },
  { value: "SHA256" },
  { value: "SHA512" },
];

// zgw/verificatie/src/main/kotlin/nl/nlportal/verificatie/graphql/domain/VerificatieType.kt
export const VERIFICATIE_TYPE: EnumOption[] = options(
  "enums.verificatie-type",
  ["TELEFOONNUMMER", "EMAIL", "OVERIG"],
);

// zgw/documenten-api/src/main/kotlin/nl/nlportal/documentenapi/domain/Vertrouwelijkheid.kt
export const VERTROUWELIJKHEIDSAANDUIDING: EnumOption[] = options(
  "enums.vertrouwelijkheidsaanduiding",
  [
    "OPENBAAR",
    "BEPERKT_OPENBAAR",
    "INTERN",
    "ZAAKVERTROUWELIJK",
    "VERTROUWELIJK",
    "CONFIDENTIEEL",
    "GEHEIM",
    "ZEER_GEHEIM",
    "GEEN",
  ],
);

// zgw/documenten-api/src/main/kotlin/nl/nlportal/documentenapi/domain/DocumentStatus.kt
export const DOCUMENT_STATUS: EnumOption[] = options("enums.document-status", [
  "IN_BEWERKING",
  "TER_VASTSTELLING",
  "DEFINITIEF",
  "GEARCHIVEERD",
  "GEEN_STATUS",
]);

// payment-direct/.../autoconfiguration/DirectPaymentModuleConfiguration.kt (a String, passed to Worldline as is)
export const LANGUAGE: EnumOption[] = options("i18n.language", [
  "nl_NL",
  "en_GB",
]);

// payment-direct `sha-out-parameters` is a List<String>; values from
// https://shared.ecom-psp.com/v2/docs/guides/e-Commerce/SHA-OUT_params.txt
export const SHA_OUT_PARAMETER: EnumOption[] = [
  "AAVADDRESS",
  "AAVCHECK",
  "AAVMAIL",
  "AAVNAME",
  "AAVPHONE",
  "AAVZIP",
  "ACCEPTANCE",
  "ALIAS",
  "AMOUNT",
  "BIC",
  "BIN",
  "BRAND",
  "CARDNO",
  "CCCTY",
  "CN",
  "COLLECTOR_BIC",
  "COLLECTOR_IBAN",
  "COMPLETIONID",
  "COMPLUS",
  "CREATION_STATUS",
  "CREDITDEBIT",
  "CURRENCY",
  "CVCCHECK",
  "DCC_COMMPERCENTAGE",
  "DCC_CONVAMOUNT",
  "DCC_CONVCCY",
  "DCC_EXCHRATE",
  "DCC_EXCHRATESOURCE",
  "DCC_EXCHRATETS",
  "DCC_INDICATOR",
  "DCC_MARGINPERCENTAGE",
  "DCC_VALIDHOURS",
  "DEVICEID",
  "DIGESTCARDNO",
  "ECI",
  "ED",
  "EMAIL",
  "ENCCARDNO",
  "FXAMOUNT",
  "FXCURRENCY",
  "IP",
  "IPCTY",
  "MANDATEID",
  "MOBILEMODE",
  "NBREMAILUSAGE",
  "NBRIPUSAGE",
  "NBRIPUSAGE_ALLTX",
  "NBRUSAGE",
  "NCERROR",
  "ORDERID",
  "PAYID",
  "PAYIDSUB",
  "PAYMENT_REFERENCE",
  "PM",
  "REQUESTCOMPLETIONID",
  "SCO_CATEGORY",
  "SCORING",
  "SEQUENCETYPE",
  "SIGNDATE",
  "STATUS",
  "SUBBRAND",
  "SUBSCRIPTION_ID",
  "TICKET",
  "TRXDATE",
  "VC",
].map((value) => ({ value }));

/**
 * Spring binds enum constants leniently (case and `-`/`_` insensitive), so stored values such as
 * `beperkt_openbaar` still bind. Maps a stored value to the matching option, if any.
 */
export const matchOption = (
  options: EnumOption[],
  stored: string,
): EnumOption | undefined => {
  const normalize = (value: string) =>
    value.trim().toUpperCase().replace(/-/g, "_");
  return options.find(
    (option) => normalize(option.value) === normalize(stored),
  );
};
