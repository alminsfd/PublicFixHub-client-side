import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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
    const { data: Totalpayments = {} } = useQuery({
        queryKey: ['totalpayments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/payment-stats');
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


   


    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#845EC2",
        "#D65DB1"
    ];


    const piedata = [
        { name: 'Resolved', value: issueStats.resolved },
        { name: 'Pending', value: issueStats.pending },
        { name: 'Rejected', value: issueStats.rejected },
        { name: 'total', value: issueStats.total },
        { name: 'totalamount', value: Totalpayments.totalAmount },
        { name: 'totalpayment', value: Totalpayments.totalPayments },
    ];



    const barData = [
        {
            name: "Issues",
            Resolved: issueStats.resolved,
            Pending: issueStats.pending,
            Rejected: issueStats.rejected,
            total: issueStats.total,
            totalamount: Totalpayments.totalAmount,
            totalpayment: Totalpayments.totalPayments,
        },
    ];

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='p-3 sm:p-4 md:p-6 space-y-6 md:space-y-8' >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-green-100 shadow rounded-xl p-4 ">
                    <h2 className="text-sm sm:text-base md:text-lg font-bold">Total Issues</h2>
                    <p className="text-xl sm:text-2xl md:text-3xl font-semibold">{issueStats.total}</p>
                </div>


                <div className="card  p-4 stat  bg-sky-100 shadow rounded-xl   ">
                    <h2 className="text-sm sm:text-base md:text-lg font-bold">Resolved Issues</h2>
                    <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-green-600">{issueStats.resolved}</p>
                </div>


                <div className="card bg-purple-100 shadow p-4">
                    <h2 className="text-sm sm:text-base md:text-lg font-bold">Pending Issues</h2>
                    <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-600">{issueStats.pending}</p>
                </div>
                <div className="stat bg-base-100 shadow rounded">
                    <div className=" text-sm sm:text-base md:text-lg font-bold stat-title">Rejected Issues</div>
                    <div className="  text-xl sm:text-2xl md:text-3xl stat-value text-red-500">{issueStats.rejected}</div>
                </div>
                <div className="stat bg-red-100 shadow rounded">
                    <div className=" text-sm sm:text-base md:text-lg font-bold  stat-title">Total payments</div>
                    <div className="  text-xl sm:text-2xl md:text-3xl stat-value text-pink-500">{Totalpayments.totalPayments}</div>
                </div>
                <div className="stat bg-teal-100 shadow rounded">
                    <div className=" text-sm sm:text-base md:text-lg font-bold stat-title">Total amounts</div>
                    <div className="  text-xl sm:text-2xl md:text-3xl stat-value text-pink-500">{Totalpayments.totalAmount}</div>
                </div>


            </div>
            <div className="bg-base-100 p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Issue Status Overview</h2>
                <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                        <Pie
                            data={piedata}
                            dataKey="value"
                            outerRadius={70}
                            label={({ name }) => name}

                        >
                            {piedata.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>

                </ResponsiveContainer>


            </div>

            <div className="overflow-x-auto">
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={barData}>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Pending" fill="#facc15" />
                        <Bar dataKey="Resolved" fill="#38bdf8" />
                        <Bar dataKey="Rejected" fill="#f87171" />
                        <Bar dataKey="total" fill="#4ade80" />
                        <Bar dataKey="totalamount" fill="#AC25D9" />
                        <Bar dataKey="totalpayment" fill="#E67A85" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-base-100 p-4 rounded-xl shadow overflow-x-auto">
                <h2 className="lg:text-lg font-semibold mb-4 table table-zebra min-w-[400px] ">Latest Issues</h2>

                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th >Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            latestIssues.map((issue, index) => (
                                <tr key={issue._id}>
                                    <td>{index + 1}</td>
                                    <td>{issue.title}</td>
                                    <td className="capitalize">{issue.status}</td>
                                    <td className="" >{new Date(issue.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="bg-base-100 p-4 rounded-xl shadow">
                <h2 className="text-base md:text-lg font-semibold mb-4">
                    Latest Payments
                </h2>

                <div className="overflow-x-auto">
                    <table className="table table-zebra min-w-[600px]">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Amount</th>
                                <th className="hidden md:table-cell">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestPayments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td>{index + 1}</td>
                                    <td className="max-w-[200px] truncate">
                                        {payment.customerEmail}
                                    </td>
                                    <td>{payment.amount} {payment.currency}</td>
                                    <td className="hidden md:table-cell">
                                        {new Date(payment.paidAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-base-100 p-4 rounded-xl shadow">
                <h2 className="text-base md:text-lg font-semibold mb-4">
                    Latest Users
                </h2>

                <div className="overflow-x-auto">
                    <table className="table table-zebra min-w-[600px]">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th className="hidden md:table-cell">Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {latestUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>

                                    <td className="max-w-[150px] truncate">
                                        {user.displayName || 'N/A'}
                                    </td>

                                    <td className="max-w-[220px] truncate">
                                        {user.email}
                                    </td>

                                    <td className="hidden md:table-cell capitalize">
                                        {user.role}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>




        </div>
    );
};

export default AdminDashboarhome;