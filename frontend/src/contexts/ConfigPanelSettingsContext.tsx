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
