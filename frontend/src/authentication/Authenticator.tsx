import {FC, ReactNode, useEffect} from "react";
import {useAuth} from "react-oidc-context";

const Authenticator: FC<{  children?: ReactNode }> = ({children}) => {
  const auth = useAuth();

  useEffect(() => {
    if(!auth.isAuthenticated && !auth.isLoading) {
      void auth.signinRedirect()
    }
  }, [auth])

  useEffect(() => {
    const handleTokenExpiring = async () => {
      try {
        await auth.revokeTokens();
      } catch (error) {
        console.error("Error revoking tokens: ", error);
      }
    };

    // addAccessTokenExpiring() returns a cleanup function
    return auth.events.addAccessTokenExpiring(handleTokenExpiring);
  }, [auth.events]);

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

export default Authenticator;
