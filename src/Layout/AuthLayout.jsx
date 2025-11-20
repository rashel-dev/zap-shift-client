import React from 'react';
import Logo from '../Components/ui/logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png'

const AuthLayout = () => {
    return (
        <div className="max-w-7xl mx-auto px-8 py-4">
            <Logo></Logo>
            <div className="flex gap-4 items-center">
                <div className="flex-1 mt-8">
                    <Outlet></Outlet>
                </div>
                <div className="flex-1 hidden md:block bg-[#fafdf0]
                ">
                    <img src={authImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;