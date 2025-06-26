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

// based on https://shared.ecom-psp.com/v2/docs/guides/e-Commerce/SHA-OUT_params.txt
export enum SHAOutParameter {
  AAVADDRESS = "AAVADDRESS",
  AAVCHECK = "AAVCHECK",
  AAVMAIL = "AAVMAIL",
  AAVNAME = "AAVNAME",
  AAVPHONE = "AAVPHONE",
  AAVZIP = "AAVZIP",
  ACCEPTANCE = "ACCEPTANCE",
  ALIAS = "ALIAS",
  AMOUNT = "AMOUNT",
  BIC = "BIC",
  BIN = "BIN",
  BRAND = "BRAND",
  CARDNO = "CARDNO",
  CCCTY = "CCCTY",
  CN = "CN",
  COLLECTOR_BIC = "COLLECTOR_BIC",
  COLLECTOR_IBAN = "COLLECTOR_IBAN",
  COMPLETIONID = "COMPLETIONID",
  COMPLUS = "COMPLUS",
  CREATION_STATUS = "CREATION_STATUS",
  CREDITDEBIT = "CREDITDEBIT",
  CURRENCY = "CURRENCY",
  CVCCHECK = "CVCCHECK",
  DCC_COMMPERCENTAGE = "DCC_COMMPERCENTAGE",
  DCC_CONVAMOUNT = "DCC_CONVAMOUNT",
  DCC_CONVCCY = "DCC_CONVCCY",
  DCC_EXCHRATE = "DCC_EXCHRATE",
  DCC_EXCHRATESOURCE = "DCC_EXCHRATESOURCE",
  DCC_EXCHRATETS = "DCC_EXCHRATETS",
  DCC_INDICATOR = "DCC_INDICATOR",
  DCC_MARGINPERCENTAGE = "DCC_MARGINPERCENTAGE",
  DCC_VALIDHOURS = "DCC_VALIDHOURS",
  DEVICEID = "DEVICEID",
  DIGESTCARDNO = "DIGESTCARDNO",
  ECI = "ECI",
  ED = "ED",
  EMAIL = "EMAIL",
  ENCCARDNO = "ENCCARDNO",
  FXAMOUNT = "FXAMOUNT",
  FXCURRENCY = "FXCURRENCY",
  IP = "IP",
  IPCTY = "IPCTY",
  MANDATEID = "MANDATEID",
  MOBILEMODE = "MOBILEMODE",
  NBREMAILUSAGE = "NBREMAILUSAGE",
  NBRIPUSAGE = "NBRIPUSAGE",
  NBRIPUSAGE_ALLTX = "NBRIPUSAGE_ALLTX",
  NBRUSAGE = "NBRUSAGE",
  NCERROR = "NCERROR",
  ORDERID = "ORDERID",
  PAYID = "PAYID",
  PAYIDSUB = "PAYIDSUB",
  PAYMENT_REFERENCE = "PAYMENT_REFERENCE",
  PM = "PM",
  REQUESTCOMPLETIONID = "REQUESTCOMPLETIONID",
  SCO_CATEGORY = "SCO_CATEGORY",
  SCORING = "SCORING",
  SEQUENCETYPE = "SEQUENCETYPE",
  SIGNDATE = "SIGNDATE",
  STATUS = "STATUS",
  SUBBRAND = "SUBBRAND",
  SUBSCRIPTION_ID = "SUBSCRIPTION_ID",
  TICKET = "TICKET",
  TRXDATE = "TRXDATE",
  VC = "VC",
}

export enum language {
  dutch = "nl-NL",
  english = "en-GB",
}
