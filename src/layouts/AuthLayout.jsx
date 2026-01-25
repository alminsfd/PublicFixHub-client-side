import React from 'react';
import Logo from '../components/navbar/LOGO';
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';

const AuthLayout = () => {
    return (
        <div className='max-w-full mx-auto'>
            <Navbar></Navbar>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;