import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

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

    const pieData = [
        { name: "Pending", value: pending },
        { name: "In Progress", value: inProgress },
        { name: "Resolved", value: resolved },
        { name: "Payments", value: payment },
    ];

    const barData = [
        {
            name: "Issues",
            Pending: pending,
            Progress: inProgress,
            Resolved: resolved,
        },
    ];

    const COLORS = ["#facc15", "#38bdf8", "#4ade80"];


    return (
        <div className='p-6 space-y-8' >

            {/* stats */}

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


            {/* piecharts */}


            <div className="bg-base-100 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Issue Status Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            outerRadius={100}
                            label
                        >
                            {pieData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>


            {/* barchats */}

            <div className="bg-base-100 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Issue Comparison</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Pending" fill="#facc15" />
                        <Bar dataKey="Progress" fill="#38bdf8" />
                        <Bar dataKey="Resolved" fill="#4ade80" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default UserDashboardhome;