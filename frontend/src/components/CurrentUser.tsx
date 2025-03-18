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

import {useAuth} from "react-oidc-context";
import classNames from "classnames";
import styles from "./CurrentUser.module.scss"
import {Paragraph} from "@gemeente-denhaag/typography";

const CurrentUser = () => {
    const auth = useAuth();

    return (
        <div
            className={classNames(styles["user-name"])}
        >
            <Paragraph className={styles["user-name__paragraph"]}>
              <span translate="no">
                  {auth.user?.profile.given_name || auth.user?.profile.email || "User"}
              </span>
            </Paragraph>
        </div>
    )
};

export default CurrentUser;
