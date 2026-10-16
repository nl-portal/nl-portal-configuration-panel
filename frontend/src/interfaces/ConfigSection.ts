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

import { FC } from "react";
import { IntlShape } from "react-intl";

/**
 * NL Portal's default for a field, shown under its label:
 * a literal, a list, a translated text (`{ messageId }`), or `null` when NL Portal has no default.
 */
export type FieldDefault =
  string | number | boolean | string[] | { messageId: string } | null;

export interface EnumOption {
  value: string;
  labelKey?: string;
}

export interface DependsOn {
  /** Path of the controlling field, relative to the section's data root. */
  field: string;
  /** Required value; when omitted the controlling field only has to be truthy. */
  equals?: string | number | boolean;
}

interface BaseFieldSpec {
  /** Path relative to the parent (section root, group, or profile). */
  key: string;
  labelKey: string;
  descriptionKey?: string;
  placeholder?: string;
  default: FieldDefault;
  dependsOn?: DependsOn;
}

export interface TextFieldSpec extends BaseFieldSpec {
  /** `json`: a code editor whose value must parse as a JSON object. */
  type: "text" | "url" | "secret" | "number" | "json";
}

export interface BoolFieldSpec extends BaseFieldSpec {
  /** `bool` renders a checkbox, `toggle` a switch. */
  type: "bool" | "toggle";
}

export interface EnumFieldSpec extends BaseFieldSpec {
  type: "enum" | "enumMulti";
  options: EnumOption[];
}

export interface KeyRefSelectFieldSpec extends BaseFieldSpec {
  type: "keyRefSelect";
  /** Sibling map whose keys are the options, e.g. `configurations`. */
  refKey: string;
}

export interface StringMapFieldSpec extends BaseFieldSpec {
  type: "stringMap";
  keyPlaceholder?: string;
}

export interface SslFieldSpec extends Omit<BaseFieldSpec, "default"> {
  type: "ssl";
  default: null;
}

export interface GroupFieldSpec extends Omit<BaseFieldSpec, "default"> {
  type: "group";
  fields: FieldSpec[];
  default: null;
}

export interface ProfileMapFieldSpec extends Omit<BaseFieldSpec, "default"> {
  type: "profileMap";
  /** Label shown in front of a profile's name, e.g. "Profile: default". */
  profileLabelKey: string;
  addLabelKey: string;
  addDescriptionKey?: string;
  namePlaceholder?: string;
  fields: FieldSpec[];
  default: null;
}

export type FieldSpec =
  | TextFieldSpec
  | BoolFieldSpec
  | EnumFieldSpec
  | KeyRefSelectFieldSpec
  | StringMapFieldSpec
  | SslFieldSpec
  | GroupFieldSpec
  | ProfileMapFieldSpec;

export const PROFILE_KEY_PATTERN = /^[0-9a-z/-]+$/;
export const MAP_KEY_PATTERN = /^[A-Za-z0-9_-]+$/;

export enum ConfigSectionKind {
  MODULE_FEATURE = "module-feature",
  FRONTEND = "frontend",
  THEME = "theme",
}

interface BaseSection {
  id: string;
  hintKey?: string;
}

export interface ModuleFeatureSection extends BaseSection {
  kind: ConfigSectionKind.MODULE_FEATURE;
  /** The backend module's name, pretty-printed from its prefix; not translated. */
  title: string;
  prefix: string;
  /** Whether the module has a `<prefix>.enabled` toggle. */
  enableToggle: boolean;
  deprecated?: boolean;
  deprecatedDescriptionId?: string;
  /** Ids of sections that must be enabled for this one to work. */
  requires?: string[];
  /** Fields, relative to `<prefix>.properties`. */
  fields: FieldSpec[];
}

export type FrontendStore = "toggles" | "properties";

/** A frontend field, stored under `<basePrefix>.<store>.<key>`. */
export type FrontendFieldSpec = FieldSpec & { store: FrontendStore };

export interface FrontendGroup {
  titleKey: string;
  fields: FrontendFieldSpec[];
}

export interface FrontendSection extends BaseSection {
  kind: ConfigSectionKind.FRONTEND;
  titleKey: string;
  basePrefix: string;
  stores: FrontendStore[];
  groups: FrontendGroup[];
}

export interface ThemeSection extends BaseSection {
  kind: ConfigSectionKind.THEME;
  titleKey: string;
  component: FC;
}

export type ConfigSection =
  ModuleFeatureSection | FrontendSection | ThemeSection;

export type EditableSection = ModuleFeatureSection | FrontendSection;

/** Module sections show their backend name as is; the other sections are translated. */
export const sectionTitle = (
  intl: IntlShape,
  section: ConfigSection,
): string =>
  section.kind === ConfigSectionKind.MODULE_FEATURE
    ? section.title
    : intl.formatMessage({ id: section.titleKey });

/** The key under which a section's form data lives. */
export const sectionRootPrefix = (section: EditableSection): string =>
  section.kind === ConfigSectionKind.MODULE_FEATURE
    ? `${section.prefix}.properties`
    : section.basePrefix;

/**
 * The prefixes a section reads and replaces on save. The frontend section never owns
 * `nl-portal.frontend` itself, so `theme.*` and `modules-whitelist` are left alone.
 */
export const sectionIoPrefixes = (section: EditableSection): string[] =>
  section.kind === ConfigSectionKind.MODULE_FEATURE
    ? [sectionRootPrefix(section)]
    : section.stores.map((store) => `${section.basePrefix}.${store}`);

/** A section's fields as render groups, with paths relative to the section's data root. */
export const sectionFieldGroups = (
  section: EditableSection,
): { titleKey: string; fields: { path: string; field: FieldSpec }[] }[] =>
  section.kind === ConfigSectionKind.MODULE_FEATURE
    ? [
        {
          titleKey: "features.feature.configuration.properties",
          fields: section.fields.map((field) => ({ path: field.key, field })),
        },
      ]
    : section.groups.map((group) => ({
        titleKey: group.titleKey,
        fields: group.fields.map((field) => ({
          path: `${field.store}.${field.key}`,
          field,
        })),
      }));
