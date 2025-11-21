import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if(loading){
        return (
            <div>
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    if(!user){
        return <Navigate to="/login" state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivateRoute;