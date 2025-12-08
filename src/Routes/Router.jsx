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
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ApprovedRiders from "../Pages/Dashboard/ApprovedRiders/ApprovedRiders";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDeliveries from "../Pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";

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
                loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
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
            {
                path: "/parcel-track/:trackingId",
                element: <ParcelTrack></ParcelTrack>
            }
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
                index: true,
                element: <DashboardHome></DashboardHome>
            },
            {
                path: "my-parcels",
                element: <MyParcels></MyParcels>,
            },
            {
                path: "payment/:parcelId",
                element: <Payment></Payment>,
            },
            {
                path: "payment-success",
                element: <PaymentSuccess></PaymentSuccess>,
            },
            {
                path: "payment-cancelled",
                element: <PaymentCancelled></PaymentCancelled>,
            },
            {
                path: "payment-history",
                element: <PaymentHistory></PaymentHistory>,
            },
            // rider only routes below
            {
                path: "assigned-deliveries",
                element: (
                    <RiderRoute>
                        <AssignedDeliveries></AssignedDeliveries>
                    </RiderRoute>
                ),
            },
            {
                path: "completed-deliveries",
                element: (
                    <RiderRoute>
                        <CompletedDeliveries></CompletedDeliveries>
                    </RiderRoute>
                ),
            },

            // admin only routes below
            {
                path: "approved-riders",
                element: (
                    <AdminRoute>
                        <ApprovedRiders></ApprovedRiders>
                    </AdminRoute>
                ),
            },
            {
                path: "assign-riders",
                element: (
                    <AdminRoute>
                        <AssignRiders></AssignRiders>
                    </AdminRoute>
                ),
            },
            {
                path: "users-management",
                element: (
                    <AdminRoute>
                        <UsersManagement></UsersManagement>
                    </AdminRoute>
                ),
            },
        ],
    },
    {
        path: "/*",
        element: <Error404></Error404>,
    },
]);

export default router;
