import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';

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
    const { data: issuesPayment = [] } = useQuery({
        queryKey: ["userIssuesPayment", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`userpayment/${user.email}`);
            return res.data;
        },
    })
    console.log(issuesPayment)
    console.log(issues)
    if (isLoading) {
        <Loading></Loading>
    }
    //calculating
    const totalIssues = issues.length;
    const pending = issues.filter(i => i.status === "pending").length;
    const inProgress = issues.filter(i => i.status === "in-progress").length;
    const resolved = issues.filter(i => i.status === "resolved").length;
    const payment = issuesPayment.filter(i => i.paymentStatus === "paid").length;

    

    return (
        <div className='p-6 space-y-8' >


            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="stat bg-base-100 shadow rounded-xl">
                    <div className="stat-title">Total Issues</div>
                    <div className="stat-value">{totalIssues}</div>
                </div>

                <div className="stat bg-yellow-100 shadow rounded-xl">
                    <div className="stat-title">Pending</div>
                    <div className="stat-value text-yellow-600">{pending}</div>
                </div>

                <div className="stat bg-sky-100 shadow rounded-xl">
                    <div className="stat-title">In Progress</div>
                    <div className="stat-value text-sky-600">{inProgress}</div>
                </div>

                <div className="stat bg-green-100 shadow rounded-xl">
                    <div className="stat-title">Resolved</div>
                    <div className="stat-value text-green-600">{resolved}</div>
                </div>

                <div className="stat bg-purple-100 shadow rounded-xl">
                    <div className="stat-title">Total Payments</div>
                    <div className="stat-value text-purple-600">
                        ৳ {payment}
                    </div>
                </div>
            </div>




        </div>
    );
};

export default UserDashboardhome;