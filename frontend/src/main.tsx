import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {config} from "./constants/config.ts";
import OidcWrapper from "./authentication/OidcWrapper.tsx";
import {StrictMode} from "react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OidcWrapper authority={config.OIDC_URL}
                 client_id={config.OIDC_CLIENT_ID}
                 redirect_uri={config.OIDC_REDIRECT_URI}>
      <App />
    </OidcWrapper>
  </StrictMode>
)
