import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Error404 from "../Pages/Error404";
import Home from "../Pages/Home";
import Coverage from "../Pages/Coverage";
import AboutUs from "../Pages/AboutUs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/coverage",
                element: <Coverage></Coverage>,
                loader: () => fetch("/serviceCenter.json").then(res => res.json()),
            },
            {
                path: "/about-us",
                element: <AboutUs></AboutUs>
            }
        ]

    },
    {
        path: "/*",
        element: <Error404></Error404>
    }

]);

export default router;