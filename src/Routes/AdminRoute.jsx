import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Forbidden from "../Pages/Forbidden";
import { GridLoader } from "react-spinners";

const AdminRoute = ({children}) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <GridLoader color="#12ff00"></GridLoader>
            </div>
        );
    }

    if (role !== "admin") {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;
