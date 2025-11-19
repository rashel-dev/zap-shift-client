import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/Shared/Footer';
import Header from '../Components/Shared/Header';

const RootLayout = () => {
    return (
        <div className="max-w-7xl mx-auto bg-[#eaeced]">
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;