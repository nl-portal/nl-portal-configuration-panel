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

import { useContext } from "react";
import { useAuth } from "react-oidc-context";
import ConfigPanelSettingsContext from "../contexts/ConfigPanelSettingsContext.tsx";
import { useMutation, useQueries, UseQueryResult } from "@tanstack/react-query";

export type ConfigurationProperty = {
  propertyKey: string;
  propertyValue: string;
  application: string;
};

export interface UseConfigurationProps {
  /** Prefixes to read; their rows are concatenated. */
  featurePrefixes: string[];
}

// Module level, so react-query only re-runs it when a query result changes.
const combineConfigurations = (
  results: UseQueryResult<ConfigurationProperty[]>[],
) => ({
  data: results.every((result) => result.data !== undefined)
    ? results.flatMap((result) => result.data ?? [])
    : undefined,
  isPending: results.some((result) => result.isPending),
  isError: results.some((result) => result.isError),
});

export const configurationsQueryKey = (
  applicationName: string | undefined,
  featurePrefix: string,
) => ["getConfigurations", applicationName, featurePrefix];

const useConfiguration = ({ featurePrefixes }: UseConfigurationProps) => {
  const auth = useAuth();
  const { configPanelSettings, clientSettings } = useContext(
    ConfigPanelSettingsContext,
  );
  const baseUrl = `${configPanelSettings.restApiUrl || ""}/v1/configurations`;
  const application = clientSettings.applicationName || "";

  const getConfigurations = async (
    featurePrefix: string,
  ): Promise<ConfigurationProperty[]> => {
    const response = await fetch(
      `${baseUrl}/${application}/features/${featurePrefix}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + auth.user?.access_token,
        },
      },
    );
    if (!response.ok) throw new Error(`Failed to load ${featurePrefix}`);
    const configurations: ConfigurationProperty[] = await response.json();
    return configurations.map(
      ({ propertyKey, propertyValue, application }) => ({
        propertyKey,
        propertyValue,
        application,
      }),
    );
  };
  const storeConfigurations = async (
    configurations: ConfigurationProperty[] = [],
  ): Promise<ConfigurationProperty[]> => {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + auth.user?.access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(configurations),
    });
    if (!response.ok) throw new Error("Failed to store configurations");
    return await response.json();
  };
  const deleteConfigurations = async (featurePrefix: string): Promise<void> => {
    const response = await fetch(
      `${baseUrl}/${application}/features/${featurePrefix}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.user?.access_token,
        },
      },
    );
    if (!response.ok) throw new Error(`Failed to delete ${featurePrefix}`);
  };

  const getConfigurationsResult = useQueries({
    queries: featurePrefixes.map((featurePrefix) => ({
      queryKey: configurationsQueryKey(application, featurePrefix),
      queryFn: () => getConfigurations(featurePrefix),
    })),
    combine: combineConfigurations,
  });

  return {
    getConfigurations: getConfigurationsResult,
    storeConfigurations: useMutation({
      mutationKey: ["storeConfigurations"],
      mutationFn: storeConfigurations,
    }),
    deleteConfigurations: useMutation({
      mutationKey: ["deleteConfigurations"],
      mutationFn: deleteConfigurations,
    }),
  };
};

export default useConfiguration;
