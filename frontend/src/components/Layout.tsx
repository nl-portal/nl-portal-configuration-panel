import {FC, ReactElement} from "react";
import {Outlet} from "react-router-dom";
import {Page as PageWrapper,} from "@gemeente-denhaag/page";
import ResponsiveContent from "@gemeente-denhaag/responsive-content";
import Header from "./Header";
import {ConfigPanelPaths} from "../constants/paths.ts";
import styles from "./Layout.module.scss"

interface LayoutComponentProps {
    paths: ConfigPanelPaths;
    headerLogo: ReactElement;
}

const LayoutComponent: FC<LayoutComponentProps> = ({
                                                       headerLogo,
                                                       paths
                                                   }) => {

    return (
        <PageWrapper>
            <ResponsiveContent className="denhaag-page-content denhaag-responsive-content--sidebar">
                <Header
                    logo={headerLogo}
                />
                <main className={styles["layout-content"] + " denhaag-page-content__main"}>
                    {<Outlet context={{paths}}/>}
                </main>
            </ResponsiveContent>
        </PageWrapper>
    );
};

const Layout: FC<LayoutComponentProps> = ({
                                              paths,
                                              headerLogo
                                          }) => (

    <LayoutComponent
        paths={paths}
        headerLogo={headerLogo}
    />
);

export default Layout;
