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
