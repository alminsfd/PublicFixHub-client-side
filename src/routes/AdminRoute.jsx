import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading/Loading';
import Forbidden from '../components/Forbiddern/Forbidden';

const AdminRoute = ({ children}) => {
    const { loading, user } = useAuth();
    const { role, roleLoading, } = useRole()
    if (loading || !user || roleLoading) {
        return <Loading></Loading>
    }
    if (role !== 'staff') {
        return <Forbidden></Forbidden>
    } 
    return children
};

export default AdminRoute;