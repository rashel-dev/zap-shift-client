import React from 'react';
import logoImg from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/" className='flex items-center'>
            <img src={logoImg} alt="" />
            <h3 className='text-3xl font-bold -ms-2.5 mt-3'>ZapShift</h3>
        </Link>
    );
};

export default Logo;