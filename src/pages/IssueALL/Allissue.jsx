import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdHowToVote } from 'react-icons/md';
import { Link, useLoaderData, useNavigate } from 'react-router';
import Loading from '../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useEffect } from 'react';

const Allissue = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('')
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("");
    const categoryData = useLoaderData()
    const [page, setPage] = useState(1);
    const limit = 6;
    useEffect(() => {
        if (page !== 1) {
            setPage(1);
        }
    }, [searchText, status, priority, category]);

    const navigate = useNavigate()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["my-issues", searchText, user?.email, status, priority, category, page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues?searchText=${searchText}&page=${page}&limit=${limit}&status=${status}&priority=${priority}&category=${category}`);
            return res.data;
        }
    });



    const allIssues = data?.issues || [];
    const totalPages = data?.totalPages || 1;
  


    const statusColor = {
        pending: "bg-yellow-100 text-yellow-700",
        "in-progress": "bg-blue-100 text-blue-700",
        resolved: "bg-green-100 text-green-700",
        closed: "bg-gray-200 text-gray-600",
    };

    const priorityColor = {
        high: "bg-red-100 text-red-700",
        normal: "bg-green-100 text-green-700",
    };

    const handleupvotes = async (details) => {
        try {
            const res = await axiosSecure.patch(`/issues/upvote/${details._id}`, {
                email: user?.email,
                createrEmail: details.createrEmail
            });
            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: res.data.message
                });
                refetch();
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Already upvote'

                })
            }

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: err.response?.data?.message || "Upvote failed"
            });
        }

        if (!user?.email) {
            navigate("/login");
            return;
        }

    }
    const priorityOrder = {
        high: 1,
        normal: 2
    };



    if (isLoading && !searchText) {
        return <Loading></Loading>
    }
    return (

        <div className="p-4 md:p-6 max-w-7xl mx-auto">

            {/*  Search Bar */}
            <div className="flex justify-center mb-6">
                <label className="input input-bordered flex items-center gap-2 w-full md:w-2/3 lg:w-1/2">
                    <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <input
                        type="search"
                        placeholder="Search issues..."
                        className="grow"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </label>
            </div>

            {/*  Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/*  Filters */}
                <div className="lg:col-span-1">
                    <div className="card bg-base-100 shadow-md p-4 space-y-4">
                        <h3 className="font-semibold text-lg">Filters</h3>
                        <div className="divider m-0"></div>

                        <select
                            className="select select-bordered w-full"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>

                        <select
                            className="select select-bordered w-full"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="">All Priority</option>
                            <option value="high">High</option>
                            <option value="normal">Normal</option>
                        </select>

                        <select
                            className="select select-bordered w-full"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Category</option>
                            {categoryData.map((cat) =>
                                cat.items.map((item, i) => (
                                    <option key={cat.id + "-" + i} value={item}>
                                        {item}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                </div>

                {/*  Issue Cards */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {

                        allIssues.length === 0 ? (<div className="text-center  md:text-4xl max-h-screen col-span-full text-gray-500 flex justify-center items-center md:py-10">
                            ❌ No issues found</div>) :
                            [...allIssues]
                                .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
                                .map((issuelist) => (
                                    <div
                                        key={issuelist._id}
                                        className="card bg-base-100 shadow-md hover:shadow-xl transition"
                                    >
                                        <figure>
                                            <img
                                                src={issuelist.photoURL}
                                                alt={issuelist.title}
                                                className="h-48 w-full object-cover"
                                            />
                                        </figure>

                                        <div className="card-body p-4 space-y-2">
                                            <h2 className="card-title text-lg">{issuelist.title}</h2>

                                            <p className="text-sm text-gray-500">
                                                <span className="font-semibold">Category:</span> {issuelist.catagory}
                                            </p>

                                            <div className="flex gap-2 flex-wrap">
                                                <span className={`badge ${statusColor[issuelist.status]}`}>
                                                    {issuelist.status}
                                                </span>
                                                <span className={`badge ${priorityColor[issuelist.priority]}`}>
                                                    {issuelist.priority}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Location:</span> {issuelist.location}
                                            </p>

                                            <p className="text-sm text-gray-600 line-clamp-3">
                                                {issuelist.description || 'No description available'}
                                            </p>

                                            <div className="flex justify-between items-center pt-2">
                                                <div className="badge badge-outline">
                                                    👍 {issuelist.upvotes}
                                                </div>

                                                <button
                                                    onClick={() => handleupvotes(issuelist)}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    <MdHowToVote /> Upvote
                                                </button>
                                            </div>

                                            <Link
                                                to={`/issueDetails/${issuelist._id}`}
                                                className="btn btn-primary btn-outline btn-sm w-full mt-2"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                </div>
            </div>
            <div className="flex justify-center mt-10 gap-2">

                <button
                    className="btn"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </button>

                {[...Array(totalPages).keys()].map(num => (
                    <button
                        key={num}
                        className={`btn ${page === num + 1 ? "btn-active" : ""}`}
                        onClick={() => setPage(num + 1)}
                    >
                        {num + 1}
                    </button>
                ))}

                <button
                    className="btn"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>

            </div>

        </div>





    );
};

export default Allissue;
