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

import "@gemeente-denhaag/design-tokens-components";
import "@nl-portal/nl-portal-user-interface/style.css";
import "./styles/nl-portal-design-tokens.css";
import Layout from "./components/Layout.tsx";
import HeaderLogo from "./assets/header-logo.svg";
import {paths} from "./constants/paths.ts";
import {StrictMode} from "react";
import OidcWrapper from "./authentication/OidcWrapper.tsx";
import {config} from "./constants/config.ts";
import {LocalizationProvider} from "@nl-portal/nl-portal-localization";
import {CUSTOM_MESSAGES} from "./i18n/custom-messages/custom-messages.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ConfigPanelSettingsContext from "./contexts/ConfigPanelSettingsProvider.tsx";


function App() {
    const queryClient = new QueryClient();

    return (
        <StrictMode>
            <OidcWrapper authority={config.OIDC_URL}
                         client_id={config.OIDC_CLIENT_ID}
                         redirect_uri={config.OIDC_REDIRECT_URI}
                         post_logout_redirect_uri={config.OIDC_POST_LOGOUT_REDIRECT_URI}
            >
                <QueryClientProvider client={queryClient}>
                    <ConfigPanelSettingsContext.Provider
                    value={{
                        clientSettings: {
                            applicationName: config.CLIENT_APPLICATION_NAME
                        },
                    }}
                    >
                        <LocalizationProvider
                            customMessages={CUSTOM_MESSAGES}
                        >
                            <Layout
                                headerLogo={<img src={HeaderLogo} alt="logo"/>}
                                paths={paths}
                            />
                        </LocalizationProvider>
                    </ConfigPanelSettingsContext.Provider>
                </QueryClientProvider>
            </OidcWrapper>
        </StrictMode>
    )
}

export default App
