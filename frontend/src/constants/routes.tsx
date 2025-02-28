import ConfigurationPage from "../pages/ConfigurationPage.tsx";
import {Navigate} from "react-router-dom";
import {paths} from "./paths.ts";

export const routes = [
    {
        path: paths.configuration,
        element: <ConfigurationPage/>,
    },
    {
        path: "*",
        element: <Navigate to={paths.configuration}/>,
    },
];
