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
import { useMutation, useQuery } from "@tanstack/react-query";

export type FeatureToggle = {
  enabled: boolean;
};

export interface UsefeatureToggleProps {
  applicationName?: string;
  featurePrefix?: string;
  refetchInterval?: number | false | undefined;
}

const useFeatureToggle = (props: UsefeatureToggleProps) => {
  const auth = useAuth();
  const { configPanelSettings, clientSettings } = useContext(
    ConfigPanelSettingsContext,
  );

  const getFeatureToggle = async (): Promise<FeatureToggle> => {
    const response = await fetch(
      `${configPanelSettings.restApiUrl || ""}/v1/configurations/${clientSettings.applicationName || ""}/features/${props.featurePrefix}/enabled`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + auth.user?.access_token,
        },
      },
    );
    return await response.json();
  };
  const setFeatureToggle = async (enabled: boolean): Promise<void> => {
    const response = await fetch(
      `${configPanelSettings.restApiUrl || ""}/v1/configurations/${clientSettings.applicationName || ""}/features/${props.featurePrefix}`,
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

    return await response.json();
  };

  return {
    getFeatureToggle: useQuery({
      queryKey: ["getFeatureToggle"],
      queryFn: getFeatureToggle,
    }),
    setFeatureToggle: useMutation({
      mutationKey: ["setFeatureToggle"],
      mutationFn: setFeatureToggle,
    }),
  };
};

export default useFeatureToggle;
