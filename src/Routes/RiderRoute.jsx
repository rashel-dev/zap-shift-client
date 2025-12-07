import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import { GridLoader } from "react-spinners";

const RiderRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || !user || roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <GridLoader color="#12ff00"></GridLoader>
            </div>
        );
    }

    if (role !== "rider") {
        return <Forbidden></Forbidden>;
    }

    return children;
};

export default RiderRoute;
