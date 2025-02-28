import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routes} from "./constants/routes.tsx";

const router = createBrowserRouter([
    {
        element: <App/>,
        children: routes,
    },
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)
