import {FC} from "react";
import {AuthProvider} from "react-oidc-context";
import {OidcClientSettings, User} from "oidc-client-ts";
import Authenticator from "./Authenticator.tsx";

interface OidcWrapperProps extends OidcClientSettings {
  children?: React.ReactNode;
}

const onSigninCallback = (_user: User | void):void => {
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
                  onSigninCallback={onSigninCallback}>
      <Authenticator>
        {props.children}
      </Authenticator>
    </AuthProvider>
  )
}

export default OidcWrapper;
