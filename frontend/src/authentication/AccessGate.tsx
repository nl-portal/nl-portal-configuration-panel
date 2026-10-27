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

import { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import { useAuth } from "react-oidc-context";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import ConfigPanelSettingsContext from "../contexts/ConfigPanelSettingsContext.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";

const AccessGate = () => {
  const auth = useAuth();
  const { configPanelSettings } = useContext(ConfigPanelSettingsContext);

  const { data: status, isPending } = useQuery({
    queryKey: ["session"],
    queryFn: async (): Promise<number> => {
      const response = await fetch(
        `${configPanelSettings.restApiUrl || ""}/v1/session`,
        { headers: { Authorization: "Bearer " + auth.user?.access_token } },
      );
      return response.status;
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (status === 401) void auth.signoutRedirect();
  }, [status]);

  if (isPending || status === 401) return <Skeleton height={60} />;
  if (status === 204) return <Outlet />;
  return <ErrorPage />;
};

export default AccessGate;
