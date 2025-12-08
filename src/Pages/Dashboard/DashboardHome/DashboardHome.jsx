import React from 'react';
import Loader from '../../../Components/Shared/Loader';
import useRole from '../../../Hooks/useRole';
import AdminDashboardHome from './AdminDashboardHome';
import RiderDashboardHome from './RiderDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {

    const {role, roleLoading} = useRole();

    if(roleLoading){
        return <Loader></Loader>
    }

    if(role === "admin"){
        return <AdminDashboardHome></AdminDashboardHome>
    }

    else if(role === "rider"){
        return <RiderDashboardHome></RiderDashboardHome>
    }
    
    else{
        return <UserDashboardHome></UserDashboardHome>
    }
};

export default DashboardHome;