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

import { IntlShape } from "react-intl";
import { EnumOption, FieldSpec } from "../interfaces/ConfigSection.ts";

const optionLabel = (
  intl: IntlShape,
  options: EnumOption[] | undefined,
  value: string,
): string => {
  const option = options?.find((it) => it.value === value);
  return option?.labelKey ? intl.formatMessage({ id: option.labelKey }) : value;
};

/** Renders a field's NL Portal default as display text. */
export const formatDefault = (intl: IntlShape, field: FieldSpec): string => {
  const value = field.default;
  const options = "options" in field ? field.options : undefined;

  if (value === null) return intl.formatMessage({ id: "defaults.not-set" });
  if (typeof value === "boolean")
    return intl.formatMessage({ id: value ? "defaults.on" : "defaults.off" });
  if (Array.isArray(value))
    return value.length === 0
      ? intl.formatMessage({ id: "defaults.empty-list" })
      : value.map((it) => optionLabel(intl, options, it)).join(", ");
  if (typeof value === "object")
    return intl.formatMessage({ id: value.messageId });
  return optionLabel(intl, options, String(value));
};
