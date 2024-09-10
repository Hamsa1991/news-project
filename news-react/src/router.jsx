import {Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/login";
import NotFound from "./views/NotFound";
import Signup from "./views/signup";
import GuestLayout from "./components/GuestLayout";
import ArticlesLayout from "./components/ArticlesLayout";
import News from "./views/News";
import Settings from "./views/Settings";

const router = createBrowserRouter([
    {
        path: '/',
        element:<ArticlesLayout />,
        children:[
            {
                path: '/',
                element: <Navigate to="/news" />
            },
            {
                path: '/news',
                element:<News />
            },
            {
                path: '/settings',
                element:<Settings />
            }
        ]
    },
    {
        path: '/',
        element:<GuestLayout />,
        children:[
            {
                path: '/signup',
                element:<Signup />
            },
            {
                path: '/login',
                element:<Login />
            }
        ]
    },
    {
        path: '*',
        element:<NotFound />
    }
]);

export default router;
