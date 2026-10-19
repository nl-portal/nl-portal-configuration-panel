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

import React, { ReactElement } from "react";
import styles from "./Header.module.scss";
import { ResponsiveContent } from "@gemeente-denhaag/responsive-content";
import LogoutButton from "./LogoutButton.tsx";
import CurrentUser from "./CurrentUser.tsx";
import LanguageSwitcher from "./LanguageSwitcher.tsx";

interface HeaderProps {
  logo: ReactElement;
}

const Header = ({ logo }: HeaderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headerLogoElement = React.cloneElement<any>(logo, {
    className: styles["header__logo-image"],
  });

  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-wrapper"]}>
        <header className={styles.header}>
          <div className={styles.header}>
            <ResponsiveContent className={styles.header__inner}>
              <div className={styles["header__logo-container"]}>
                {headerLogoElement}
              </div>
              <div className={styles["header__elements-desktop"]}>
                <div className={styles["header__element--start"]}>
                  <LanguageSwitcher />
                </div>
                <CurrentUser />
                <div className={styles["header__element--end"]}>
                  <LogoutButton />
                </div>
              </div>
            </ResponsiveContent>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
