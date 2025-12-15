import React from 'react';
import useRole from '../../hooks/useRole';
import Loading from '../../components/Loading/Loading';
import AdminDashboarhome from './AdminDashboarhome';
import StaffDashboardhome from './StaffDashboardhome';
import UserDashboardhome from './UserDashboardhome';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading></Loading>
    }
    if (role === 'admin') {
        return <AdminDashboarhome></AdminDashboarhome>
    }
    else if (role === 'staff') {
        return <StaffDashboardhome></StaffDashboardhome>
    }
    else {
        return <UserDashboardhome></UserDashboardhome>
    };
};

export default DashboardHome;