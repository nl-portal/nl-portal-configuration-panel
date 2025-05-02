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
        const handleTokenExpired = () => auth.startSilentRenew();

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
