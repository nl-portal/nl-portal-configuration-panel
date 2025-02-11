import {FC, ReactNode, useEffect} from "react";
import {AuthProvider, useAuth} from "react-oidc-context";
import {OidcClientSettings} from "oidc-client-ts";

interface OidcWrapperProps extends OidcClientSettings {
  children?: React.ReactNode
  autoIdleSessionLogout?: boolean;
  idleTimeoutMinutes?: number;
  minValiditySeconds?: number;
}

const Authenticator: FC<{ children?: ReactNode}> = ({children}) => {
  const auth = useAuth();

  useEffect(() => {
    if(!auth.isAuthenticated && !auth.isLoading) {
      void auth.signinRedirect()
    }
  }, [auth])

  if (auth.isLoading) {
    return <div>Loading...</div>
  }

  if (auth.error) {
    return <div>Oops ... {auth.error.message}</div>
  }

  if (auth.isAuthenticated) {
    return (
      <>
        <div style={{margin: "20px"}}>
            Hello {auth.user?.profile.email}{" "}
            <button className="log-button" onClick={() => void auth.signoutRedirect()}>Log out</button>
        </div>

        {children}
      </>
    )
  }
};

// TODO:
// - Voeg idle timer toe
// - Voeg autoRefreshtoken optie toe
// - Voeg updateToken mogelijkheid toe

const OidcWrapper: FC<OidcWrapperProps> = (props) => {
  return (
    <AuthProvider {...props}>
      <Authenticator>
        {props.children}
      </Authenticator>
    </AuthProvider>
  )
}

export default OidcWrapper;
