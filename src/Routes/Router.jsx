import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Error404 from "../Pages/Error404";
import Home from "../Pages/Home";
import Coverage from "../Pages/Coverage";
import AboutUs from "../Pages/AboutUs";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Rider from "../Pages/Rider";
import PrivateRoute from "../Routes/PrivateRoute";
import SendParcel from "../Pages/SendParcel";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: "/rider",
                element: (
                    <PrivateRoute>
                        <Rider></Rider>
                    </PrivateRoute>
                ),
            },
            {
                path: "/send-parcel",
                element: (
                    <PrivateRoute>
                        <SendParcel></SendParcel>
                    </PrivateRoute>
                ),
                loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
            },
            {
                path: "/coverage",
                element: <Coverage></Coverage>,
                loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
            },
            {
                path: "/about-us",
                element: <AboutUs></AboutUs>,
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "",
            },
        ],
    },
    {
        path: "/*",
        element: <Error404></Error404>,
    },
]);

export default router;
