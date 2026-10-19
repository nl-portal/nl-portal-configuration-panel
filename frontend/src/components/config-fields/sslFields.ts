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

import { FieldSpec } from "../../interfaces/ConfigSection.ts";

// NL Portal core `nl.nlportal.core.ssl.Ssl` / `ClientKey`. Values are Spring resource locations
// (`ResourceClientSslContextResolver`), so only the key password is a secret.
export const sslFields: FieldSpec[] = [
  {
    type: "text",
    key: "key.cert-chain",
    labelKey: "fields.ssl.key.cert-chain",
    descriptionKey: "fields.ssl.key.cert-chain.description",
    placeholder: "file:/etc/nl-portal/ssl/client-chain.pem",
    default: null,
  },
  {
    type: "text",
    key: "key.key",
    labelKey: "fields.ssl.key.key",
    descriptionKey: "fields.ssl.key.key.description",
    placeholder: "file:/etc/nl-portal/ssl/client-key.pem",
    default: null,
  },
  {
    type: "secret",
    key: "key.key-password",
    labelKey: "fields.ssl.key.key-password",
    descriptionKey: "fields.ssl.key.key-password.description",
    default: null,
  },
  {
    type: "text",
    key: "trusted-certificate",
    labelKey: "fields.ssl.trusted-certificate",
    descriptionKey: "fields.ssl.trusted-certificate.description",
    placeholder: "file:/etc/nl-portal/ssl/ca.pem",
    default: null,
  },
];
