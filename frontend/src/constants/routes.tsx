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

import { Navigate } from "react-router-dom";
import { paths } from "./paths.ts";
import FeaturePage from "../pages/FeaturePage.tsx";
import NLPortalConfigurationPage from "../pages/NLPortalConfigurationPage.tsx";
import ThemePage from "../pages/ThemePage.tsx";

export const routes = [
  {
    path: paths.configuration,
    element: <NLPortalConfigurationPage />,
  },
  {
    path: paths.feature(),
    element: <FeaturePage />,
  },
  {
    path: paths.theme(),
    element: <ThemePage />,
  },
  {
    path: "*",
    element: <Navigate to={paths.configuration} />,
  },
];
