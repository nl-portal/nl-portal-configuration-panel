import {FC} from "react";
import {AuthProvider} from "react-oidc-context";
import {OidcClientSettings} from "oidc-client-ts";
import Authenticator from "./Authenticator.tsx";

interface OidcWrapperProps extends OidcClientSettings {
    children?: React.ReactNode;
}

const onSigninCallback = () => {
    // Cleaning the url after signing in
    window.history.replaceState(
        {},
        document.title,
        "/"
    )
}

const OidcWrapper: FC<OidcWrapperProps> = (props) => {
    return (
        <AuthProvider {...props}
                      onSigninCallback={onSigninCallback}
                      accessTokenExpiringNotificationTimeInSeconds={0}
        >
            <Authenticator>
                {props.children}
            </Authenticator>
        </AuthProvider>
    )
}

export default OidcWrapper;
