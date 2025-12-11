import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import IssueCard from '../../components/Cards/IssueCard';
import { useState } from 'react';
import { useLoaderData } from 'react-router';

const MyIssuePage = () => {
    const { user } = useAuth();
    const categoryData = useLoaderData()
    const axiosSecure = useAxiosSecure();
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const { data: myIssues = [], refetch, isLoading } = useQuery({
        queryKey: ["my-issues", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues?email=${user?.email}`);
            return res.data;
        }
    });
    const filteredIssues = myIssues.filter(issue =>
        (statusFilter ? issue.status === statusFilter : true) &&
        (categoryFilter ? issue.catagory === categoryFilter : true)
    );
    return (
        <>
            <div className="flex justify-center gap-4 my-4">
                <select className="select select-bordered"
                    onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>

                <select className="select select-bordered"
                    onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="">All Catagory</option>
                    {categoryData.map((cat) =>
                        cat.items.map((item, i) => (
                            <option key={cat.id + "-" + i} value={item}>
                                {item}
                            </option>
                        ))
                    )}
                </select>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {filteredIssues.length === 0 ? (
                    <div className="text-center  md:text-4xl col-span-full text-gray-500 py-10">
                        ❌ No issues found
                    </div>
                ) : (

                    filteredIssues.map(issue => <IssueCard key={issue._id} issue={issue} ></IssueCard>)

                )}
                {


                }

            </div>


        </>


    );
};

export default MyIssuePage;