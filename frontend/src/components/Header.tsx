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

import React, {Fragment, ReactElement} from "react";
import styles from "./Header.module.scss";
import classNames from "classnames";
import ResponsiveContent from "@gemeente-denhaag/responsive-content";
import LogoutButton from "./LogoutButton.tsx";
import CurrentUser from "./CurrentUser.tsx";

interface HeaderProps {
    logo: ReactElement;
}

const Header = ({
                    logo,
                }: HeaderProps) => {
    const headerLogoElement = React.cloneElement(logo, {
        className: styles["header__logo-image"],
    });

    return (
        <div
            className={styles["header-container"]}
            ref={null}
            style={{marginBlockStart: 0}}
        >
            <div
                className={classNames(styles["header-wrapper"], {
                    [styles["header-wrapper--fullscreen"]]: false,
                })}
            >
                <header
                    className={styles.header}
                >
                    <div
                        className={classNames(styles.header, {
                            [styles["header--fullscreen"]]: false,
                        })}
                    >
                        <ResponsiveContent className={styles.header__inner}>
                            <div
                                className={classNames(styles["header__logo-container"], {
                                    [styles["header__logo-container--fullscreen"]]: false,
                                })}
                            >
                                {headerLogoElement}

                            </div>
                            <div className={styles["header__elements-desktop"]}>
                                <Fragment>
                                    <div className={styles["header__element--large-spacing"]}>
                                        <CurrentUser/>
                                    </div>
                                    <div className={styles["header__element--medium-spacing"]}>
                                        <LogoutButton></LogoutButton>
                                    </div>
                                </Fragment>
                            </div>
                        </ResponsiveContent>
                    </div>
                </header>
            </div>
        </div>
    )
}

export default Header;
