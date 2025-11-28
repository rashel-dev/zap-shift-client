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
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";

import Loader from "../Components/Shared/Loader";
import Payment from "../Pages/Dashboard/Payment/Payment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        hydrateFallbackElement: <Loader></Loader>,
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
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>
        ),
        children: [
            {
                path: "my-parcels",
                element: <MyParcels></MyParcels>,
            },
            {
                path: "payment/:parcelId",
                element: <Payment></Payment>
            }
        ],
    },
    {
        path: "/*",
        element: <Error404></Error404>,
    },
]);

export default router;
