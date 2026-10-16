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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type FeatureToggle = {
  enabled: boolean;
};

/** Query options for a module's `<prefix>.enabled` toggle, shared so toggles are cached per prefix. */
export const useFeatureToggleQueryOptions = () => {
  const auth = useAuth();
  const { configPanelSettings, clientSettings } = useContext(
    ConfigPanelSettingsContext,
  );

  return (featurePrefix: string) => ({
    queryKey: [
      "getFeatureToggle",
      clientSettings.applicationName,
      featurePrefix,
    ],
    queryFn: async (): Promise<FeatureToggle> => {
      const response = await fetch(
        `${configPanelSettings.restApiUrl || ""}/v1/configurations/${clientSettings.applicationName || ""}/features/${featurePrefix}/enabled`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + auth.user?.access_token,
          },
        },
      );
      if (!response.ok) throw new Error(`Failed to load ${featurePrefix}`);
      return await response.json();
    },
  });
};

export interface UseFeatureToggleProps {
  featurePrefix: string;
  /** Sections without an `enabled` property skip the query. */
  hasToggle: boolean;
}

const useFeatureToggle = ({
  featurePrefix,
  hasToggle,
}: UseFeatureToggleProps) => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const { configPanelSettings, clientSettings } = useContext(
    ConfigPanelSettingsContext,
  );
  const queryOptions = useFeatureToggleQueryOptions()(featurePrefix);

  const setFeatureToggle = async (enabled: boolean): Promise<FeatureToggle> => {
    const response = await fetch(
      `${configPanelSettings.restApiUrl || ""}/v1/configurations/${clientSettings.applicationName || ""}/features/${featurePrefix}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + auth.user?.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enabled: enabled }),
      },
    );
    if (!response.ok) throw new Error(`Failed to toggle ${featurePrefix}`);
    return await response.json();
  };

  return {
    getFeatureToggle: useQuery({ ...queryOptions, enabled: hasToggle }),
    setFeatureToggle: useMutation({
      mutationKey: ["setFeatureToggle", featurePrefix],
      mutationFn: setFeatureToggle,
      onSuccess: (data) =>
        queryClient.setQueryData(queryOptions.queryKey, data),
    }),
  };
};

export default useFeatureToggle;
