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

import React, { ReactNode } from "react";

interface IConfigPanelSettings {
  clientSettings: {
    applicationName?: string;
  };
  configPanelSettings: {
    restApiUrl?: string;
  };
}

const ConfigPanelSettingsContext = React.createContext<IConfigPanelSettings>({
  clientSettings: {},
  configPanelSettings: {},
});

export const ConfigPanelSettingsProvider = (children?: ReactNode) => {
  return (
    <ConfigPanelSettingsContext.Provider
      value={{
        clientSettings: {},
        configPanelSettings: {},
      }}
    >
      {children}
    </ConfigPanelSettingsContext.Provider>
  );
};

export default ConfigPanelSettingsContext;
