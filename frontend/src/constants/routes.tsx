import ConfigurationsPage from "../pages/ConfigurationsPage.tsx";
import {Navigate} from "react-router-dom";
import {paths} from "./paths.ts";
import FeatureConfigurationPage from "../pages/FeatureConfigurationPage.tsx";
import FeaturesPage from "../pages/FeaturesPage.tsx";

export const routes = [
    {
        path: paths.configurations,
        element: <ConfigurationsPage/>,
    },
    {
        path: paths.features,
        element: <FeaturesPage/>,
    },
    {
        path: paths.feature(),
        element: <FeatureConfigurationPage/>,
    },
    {
        path: "*",
        element: <Navigate to={paths.features}/>,
    },
];
