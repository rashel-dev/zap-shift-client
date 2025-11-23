import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import { GridLoader } from "react-spinners";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if(loading){
        return (
            <div className="flex justify-center items-center h-screen">
                <GridLoader color="#12ff00"></GridLoader>
            </div>
        );
    }

    if(!user){
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivateRoute;