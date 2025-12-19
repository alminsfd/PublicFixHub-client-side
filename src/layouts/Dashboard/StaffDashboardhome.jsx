import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const StaffDashboardhome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: dashboard = {}, isLoading } = useQuery({
        queryKey: ['staffDashboard', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard/staff/${user.email}`);
            return res.data;
        }
    });

    console.log(dashboard)
    const COLORS = ["#facc15", "#38bdf8", "#4ade80"];

    const pieData = [
        { name: "assigned", value: dashboard.assigned },
        { name: "resolved", value: dashboard.resolved },
        { name: "Todaytasks", value: dashboard.todayTasks },

    ];

    const barData = [
        {
            name: "Issues",
            Pending: dashboard.assigned,
            Progress: dashboard.resolved,
            Resolved: dashboard.todayTasks,
        },
    ];






    if (isLoading) {
        <Loading></Loading>
    }
    return (

        <div className='p-6 space-y-8' >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card  p-4  stat bg-green-100 shadow rounded-xl ">
                <h2 className="text-xl font-bold">Assigned Issues</h2>
                <p className="text-3xl">{dashboard.assigned}</p>
            </div>


            <div className="card  p-4 stat  bg-sky-100 shadow rounded-xl   ">
                <h2 className="text-xl font-bold">Resolved Issues</h2>
                <p className="text-3xl text-green-600">{dashboard.resolved}</p>
            </div>


            <div className="card bg-purple-100 shadow p-4">
                <h2 className="text-xl font-bold">Today’s Tasks</h2>
                <p className="text-3xl text-blue-600">{dashboard.todayTasks}</p>
            </div>


        </div>
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

export default StaffDashboardhome;