import React, {ReactNode} from "react";

interface IConfigPanelSettings {
    clientSettings: {
        applicationName: string;
    }
}

interface IConfigPanelSettingsProviderProps {
    applicationName?: string;
    children?: ReactNode
}

const ConfigPanelSettingsContext = React.createContext<IConfigPanelSettings>({
    clientSettings: {
        applicationName: ''
    },
});

export const ConfigPanelSettingsProvider = ({
                                                applicationName = 'nl-portal-app',
                                                children,
                                            }: IConfigPanelSettingsProviderProps) => {
    return (
        <ConfigPanelSettingsContext.Provider
            value={{
                clientSettings: {applicationName: applicationName},
            }}
        >
            {children}
        </ConfigPanelSettingsContext.Provider>
    );
};

export default ConfigPanelSettingsContext;
