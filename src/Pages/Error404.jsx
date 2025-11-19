import React from 'react';
import error404 from '../assets/error404.png'
import Header from '../Components/Shared/Header';
import Footer from '../Components/Shared/Footer';
import { Link } from 'react-router';

const Error404 = () => {
    return (
        <div className="max-w-7xl mx-auto bg-[#eaeced]">
            <Header></Header>
            <div className="flex flex-col justify-center items-center h-screen">
                <img src={error404} alt="" />
                <div className='flex gap-4'>
                    <Link to="/" className="btn btn-primary text-black dark:text-white font-bold mx-auto">
                        Go Home
                    </Link>
                    <Link to={-1} className="btn btn-primary text-black dark:text-white font-bold mx-auto">
                        Go Back
                    </Link>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Error404;