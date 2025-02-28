export declare global {
  interface Window {
    OIDC_URL: string;
    OIDC_REALM: string;
    OIDC_CLIENT_ID: string;
    OIDC_REDIRECT_URI: string;
    OIDC_POST_LOGOUT_REDIRECT_URI: string;
  }
}
