import React from 'react';
import DashboardHome from './DashboardHome';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default DashboardLayout;