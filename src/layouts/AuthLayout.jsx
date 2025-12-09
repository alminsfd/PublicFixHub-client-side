 import React from 'react';
import Logo from '../components/navbar/LOGO';
import { Outlet } from 'react-router';
 
 const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Logo></Logo>
                <div>
                    <Outlet></Outlet>
                </div>
        </div>
    );
 };
 
 export default AuthLayout;