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
                    <LocalizationProvider
                        customMessages={CUSTOM_MESSAGES}
                    >
                        <Layout
                            headerLogo={<img src={HeaderLogo} alt="logo"/>}
                            paths={paths}
                        />
                    </LocalizationProvider>
                </QueryClientProvider>
            </OidcWrapper>
        </StrictMode>
    )
}

export default App
