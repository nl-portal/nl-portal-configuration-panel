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

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { useContext } from "react";
import ConfigPanelSettingsContext from "../contexts/ConfigPanelSettingsContext.tsx";
import { toast } from "react-toastify";
import { Heading4 } from "@gemeente-denhaag/typography";
import { FormattedMessage } from "react-intl";

export type ThemeStyle = {
  styleId: string;
  styles: string;
  application: string;
  profile?: string;
  label?: string;
};

const useThemeStyle = () => {
  const auth = useAuth();
  const { configPanelSettings, clientSettings } = useContext(
    ConfigPanelSettingsContext,
  );
  const getThemeStyles = async (): Promise<ThemeStyle[]> => {
    const response = await fetch(
      `${configPanelSettings.restApiUrl || ""}/v1/theme/${clientSettings.applicationName || ""}/style`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + auth.user?.access_token,
        },
      },
    );
    return await response.json();
  };
  const createThemeStyle = async (styles: string): Promise<ThemeStyle> => {
    const methodUrl = `${configPanelSettings.restApiUrl || ""}/v1/theme/${clientSettings.applicationName || ""}/style`;
    const response = await fetch(methodUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.user?.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ styles: styles }),
    });
    return await response.json();
  };
  const updateThemeStyle = async (themeStyle: {
    styleId: string;
    styles: string;
  }): Promise<ThemeStyle> => {
    const methodUrl = `${configPanelSettings.restApiUrl || ""}/v1/theme/${clientSettings.applicationName || ""}/style/${themeStyle.styleId}`;
    const response = await fetch(methodUrl, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.user?.access_token}`,
        "Content-Type": "text/css",
      },
      body: themeStyle.styles,
    });
    return await response.json();
  };
  const deleteThemeStyle = async (themeStyleId: string): Promise<void> => {
    await fetch(
      `${configPanelSettings.restApiUrl || ""}/v1/theme/${clientSettings.applicationName || ""}/style/${themeStyleId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.user?.access_token,
        },
      },
    );
  };

  return {
    getThemeStyles: useQuery({
      queryKey: ["getThemeStyles"],
      queryFn: getThemeStyles,
    }),
    createThemeStyle: useMutation({
      mutationKey: ["createThemeStyle"],
      mutationFn: createThemeStyle,
      onSuccess: () => {
        void toast(() => (
          <Heading4>
            <FormattedMessage id={"api.save.success"} />
          </Heading4>
        ));
      },
      onError: () => {
        void toast(() => (
          <Heading4>
            <FormattedMessage id={"api.error"} />
          </Heading4>
        ));
      },
    }),
    updateThemeStyle: useMutation({
      mutationKey: ["updateThemeStyle"],
      mutationFn: updateThemeStyle,
      onSuccess: () => {
        void toast(() => (
          <Heading4>
            <FormattedMessage id={"api.save.success"} />
          </Heading4>
        ));
      },
      onError: () => {
        void toast(() => (
          <Heading4>
            <FormattedMessage id={"api.error"} />
          </Heading4>
        ));
      },
    }),
    deleteThemeStyle: useMutation({
      mutationKey: ["deleteThemeStyle"],
      mutationFn: deleteThemeStyle,
      onSuccess: () => {
        void toast(() => (
          <Heading4>
            <FormattedMessage id={"api.save.success"} />
          </Heading4>
        ));
      },
      onError: () => {
        void toast(() => (
          <Heading4>
            <FormattedMessage id={"api.error"} />
          </Heading4>
        ));
      },
    }),
  };
};

export default useThemeStyle;
