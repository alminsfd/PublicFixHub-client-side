import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AdminDashboarhome = () => {

    const axiosSecure = useAxiosSecure();
    const { data: issueStats = {}, isLoading } = useQuery({
        queryKey: ['issueStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/issues-stats');
            return res.data;
        }
    });
    const { data: latestIssues = [] } = useQuery({
        queryKey: ['latestIssues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/latest-issues');
            return res.data;
        }
    });

    const { data: latestPayments = [] } = useQuery({
        queryKey: ['latestPayments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/latest-payments');
            return res.data;
        }
    });

    const { data: latestUsers = [] } = useQuery({
        queryKey: ['latestUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/latest-users');
            return res.data;
        }
    });


    console.log(issueStats)

    const COLORS = ["#facc15", "#38bdf8", "#4ade80"];

    const piedata = [
        { name: 'Resolved', value: issueStats.resolved },
        { name: 'Pending', value: issueStats.pending },
        { name: 'Rejected', value: issueStats.rejected },
        { name: 'total', value: issueStats.total }
    ];

    const barData = [
        {
            name: "Issues",
            Resolved: issueStats.resolved,
            Pending: issueStats.pending,
            Rejected: issueStats.rejected,
            total: issueStats.total,
        },
    ];

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='p-6 space-y-8' >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card  p-4  stat bg-green-100 shadow rounded-xl ">
                    <h2 className="text-xl font-bold">Total Issues</h2>
                    <p className="text-3xl">{issueStats.total}</p>
                </div>


                <div className="card  p-4 stat  bg-sky-100 shadow rounded-xl   ">
                    <h2 className="text-xl font-bold">Resolved Issues</h2>
                    <p className="text-3xl text-green-600">{issueStats.resolved}</p>
                </div>


                <div className="card bg-purple-100 shadow p-4">
                    <h2 className="text-xl font-bold">Pending Issues</h2>
                    <p className="text-3xl text-blue-600">{issueStats.pending}</p>
                </div>
                <div className="stat bg-base-100 shadow rounded">
                    <div className="stat-title">Rejected Issues</div>
                    <div className="stat-value text-red-500">{issueStats.rejected}</div>
                </div>


            </div>
            <div className="bg-base-100 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Issue Status Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={piedata}
                            dataKey="value"
                            outerRadius={100}
                            label
                        >
                            {piedata.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-base-100 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Issue Comparison</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Pending" fill="#facc15" />
                        <Bar dataKey="Resolved" fill="#38bdf8" />
                        <Bar dataKey="Rejected" fill="#4ade80" />
                        <Bar dataKey="total" fill="4ade80" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-base-100 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Latest Issues</h2>

                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            latestIssues.map((issue, index) => (
                                <tr key={issue._id}>
                                    <td>{index + 1}</td>
                                    <td>{issue.title}</td>
                                    <td className="capitalize">{issue.status}</td>
                                    <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="bg-base-100 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Latest Payments</h2>

                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            latestPayments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td>{index + 1}</td>
                                    <td>{payment.customerEmail}</td>
                                    <td>{payment.amount} {payment.currency}</td>
                                    <td>{new Date(payment.
                                        paidAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="bg-base-100 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Latest Users</h2>

                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            latestUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.displayName || 'N/A'}</td>
                                    <td>{user.email}</td>
                                    <td className="capitalize">{user.role}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default AdminDashboarhome;