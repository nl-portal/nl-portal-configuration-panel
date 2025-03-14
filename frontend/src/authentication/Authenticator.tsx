import {FC, Fragment, ReactNode, useEffect} from "react";
import {useAuth} from "react-oidc-context";
import {Paragraph} from "@gemeente-denhaag/typography";

const Authenticator: FC<{ children?: ReactNode }> = ({children}) => {
    const auth = useAuth();

    useEffect(() => {
        if (!auth.isAuthenticated && !auth.isLoading) {
            void auth.signinRedirect()
        }
    }, [auth])

    useEffect(() => {
        const handleTokenExpired = () => auth.signoutRedirect();

        auth.events.addAccessTokenExpired(handleTokenExpired);
    }, [auth]);

    if (auth.isLoading) {
        return <Paragraph>Loading...</Paragraph>
    }

    if (auth.error) {
        return <Paragraph>{auth.error.message}</Paragraph>
    }

    if (auth.isAuthenticated) {
        return (
            <Fragment>
                {children}
            </Fragment>
        )
    }
};

export default Authenticator;
