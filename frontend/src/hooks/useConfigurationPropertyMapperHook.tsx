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
import { flatten } from "flat";
import { useContext } from "react";
import ConfigPanelSettingsContext from "../contexts/ConfigPanelSettingsContext.tsx";
import { ConfigurationProperty } from "./useConfiguration.tsx";

const coerce = (value: string): string | boolean => {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
};

const isEmpty = (value: unknown) =>
  value === undefined ||
  value === null ||
  value === "" ||
  (Array.isArray(value) && value.length === 0);

const useConfigurationPropertyMapperHook = () => {
  const { clientSettings } = useContext(ConfigPanelSettingsContext);

  /** Builds an object from property rows; `"true"`/`"false"` become booleans. */
  const parseProperties = (
    properties: ConfigurationProperty[],
    prefix?: string,
  ): object | undefined => {
    const constructedConfig = {};

    properties.forEach(({ propertyKey, propertyValue }) => {
      _.set(constructedConfig, propertyKey, coerce(propertyValue));
    });

    return prefix ? _.get(constructedConfig, prefix) : constructedConfig;
  };

  /**
   * Flattens an object to property rows. Empty strings and empty lists are skipped: no value
   * means NL Portal's default applies. `false` and `0` are kept.
   */
  const toProperties = (
    configuration: object = {},
    prefix?: string,
    application: string = clientSettings.applicationName || "",
  ): ConfigurationProperty[] => {
    const flattenedProperties: Record<string, unknown> = flatten(
      configuration,
      {
        safe: true,
      },
    );

    return Object.entries(flattenedProperties)
      .filter(
        ([, value]) =>
          !isEmpty(value) &&
          (Array.isArray(value) || typeof value !== "object"),
      )
      .map(([key, value]) => ({
        propertyKey: prefix ? `${prefix}.${key}` : key,
        propertyValue: Array.isArray(value) ? value.join(", ") : String(value),
        application,
      }));
  };

  return {
    parseProperties,
    toProperties,
  };
};

export default useConfigurationPropertyMapperHook;
