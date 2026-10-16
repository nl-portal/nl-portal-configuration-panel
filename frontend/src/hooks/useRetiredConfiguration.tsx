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
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { Heading4 } from "@gemeente-denhaag/typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ConfigPanelSettingsContext from "../contexts/ConfigPanelSettingsContext.tsx";

export type RetiredConfigurationKey = {
  propertyKey: string;
  retiredIn: string;
};

const notify = (messageId: string) =>
  toast(() => (
    <Heading4>
      <FormattedMessage id={messageId} />
    </Heading4>
  ));

/** Keys kept for older NL Portal versions; values are never returned. */
const useRetiredConfiguration = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const { configPanelSettings, clientSettings } = useContext(
    ConfigPanelSettingsContext,
  );
  const baseUrl = `${configPanelSettings.restApiUrl || ""}/v1/configurations/${clientSettings.applicationName || ""}/retired`;
  const queryKey = ["getRetiredConfiguration", clientSettings.applicationName];
  const headers = { Authorization: "Bearer " + auth.user?.access_token };

  const remove = async (url: string) => {
    const response = await fetch(url, { method: "DELETE", headers });
    if (!response.ok) throw new Error(`Failed to delete ${url}`);
  };
  const mutationOptions = {
    onSuccess: () => notify("api.delete.success"),
    onError: () => notify("api.error"),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  };

  return {
    getRetiredKeys: useQuery({
      queryKey,
      queryFn: async (): Promise<RetiredConfigurationKey[]> => {
        const response = await fetch(baseUrl, {
          headers: { ...headers, Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Failed to load retired keys");
        return await response.json();
      },
    }),
    deleteRetiredKey: useMutation({
      mutationKey: ["deleteRetiredKey"],
      mutationFn: (propertyKey: string) =>
        remove(`${baseUrl}?propertyKey=${encodeURIComponent(propertyKey)}`),
      ...mutationOptions,
    }),
    deleteRetiredVersion: useMutation({
      mutationKey: ["deleteRetiredVersion"],
      mutationFn: (retiredIn: string) =>
        remove(`${baseUrl}?retiredIn=${encodeURIComponent(retiredIn)}`),
      ...mutationOptions,
    }),
  };
};

export default useRetiredConfiguration;
