import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UserDashboardhome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: issues = [], isLoading } = useQuery({
        queryKey: ["userIssues", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/user/${user.email}`);
            return res.data;
        },
    })
    return (
        <div>
            <h1>I am user Dashboard</h1>
        </div>
    );
};

export default UserDashboardhome;