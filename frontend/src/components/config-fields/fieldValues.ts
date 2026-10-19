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

import _ from "lodash";
import { FieldSpec } from "../../interfaces/ConfigSection.ts";

/** Splits a stored comma-separated list (or an array from the form) into items. */
export const toList = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map(String);
  if (value === undefined || value === null) return [];
  return String(value)
    .split(",")
    .map((it) => it.trim())
    .filter((it) => it.length > 0);
};

export const isDependencySatisfied = (field: FieldSpec, values: object) => {
  if (!field.dependsOn) return true;
  const controlling: unknown = _.get(values, field.dependsOn.field);
  return field.dependsOn.equals === undefined
    ? !!controlling
    : controlling === field.dependsOn.equals;
};

const isJsonObject = (value: string) => {
  try {
    const parsed: unknown = JSON.parse(value);
    return (
      typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
    );
  } catch {
    return false;
  }
};

/** Returns the message id of a validation error, if the value is invalid. */
export const fieldError = (
  field: FieldSpec,
  value: unknown,
): string | undefined => {
  if (field.type !== "json") return undefined;
  if (value === undefined || value === null || String(value).trim() === "")
    return undefined;
  return isJsonObject(String(value)) ? undefined : "fields.error.json";
};

/** Whether every visible field holds a valid value; `path` is relative to the section data. */
export const fieldsValid = (
  fields: { path: string; field: FieldSpec }[],
  values: object,
): boolean =>
  fields.every(({ path, field }) => {
    if (!isDependencySatisfied(field, values)) return true;
    if (field.type === "group")
      return fieldsValid(
        field.fields.map((child) => ({
          path: `${path}.${child.key}`,
          field: child,
        })),
        values,
      );
    return !fieldError(field, _.get(values, path));
  });
