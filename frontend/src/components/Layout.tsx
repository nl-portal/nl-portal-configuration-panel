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

import { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Page as PageWrapper } from "@gemeente-denhaag/page";
import ResponsiveContent from "@gemeente-denhaag/responsive-content";
import Header from "./Header";
import { ConfigPanelPaths } from "../constants/paths.ts";
import styles from "./Layout.module.scss";
import { ToastContainer } from "react-toastify";

interface LayoutComponentProps {
  paths: ConfigPanelPaths;
  headerLogo: ReactElement;
}

const LayoutComponent: FC<LayoutComponentProps> = ({ headerLogo, paths }) => {
  return (
    <PageWrapper>
      <ToastContainer
        position={"bottom-center"}
        hideProgressBar={true}
        autoClose={3000}
        closeOnClick={true}
      />
      <ResponsiveContent className="denhaag-page-content denhaag-responsive-content--sidebar">
        <Header logo={headerLogo} />
        <main
          className={styles["layout-content"] + " denhaag-page-content__main"}
        >
          {<Outlet context={{ paths }} />}
        </main>
      </ResponsiveContent>
    </PageWrapper>
  );
};

const Layout: FC<LayoutComponentProps> = ({ paths, headerLogo }) => (
  <LayoutComponent paths={paths} headerLogo={headerLogo} />
);

export default Layout;
