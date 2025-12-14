import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdHowToVote } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';
import Loading from '../../components/Loading/Loading';
import Swal from 'sweetalert2';

const Allissue = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    const { data: allIssues = [], isLoading, refetch } = useQuery({
        queryKey: ["my-issues", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/issues');
            return res.data;
        }
    });
    console.log(allIssues)

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


    if (isLoading) {
       return <Loading></Loading>
    }
    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10" >

            {
                [...allIssues].sort((a, b) => {
                  return   priorityOrder[a.priority] - priorityOrder[b.priority]

                }).map(issuelist =>

                    <div key={issuelist._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition ">
                        {/* Image */}
                        <img
                            src={issuelist.photoURL}
                            alt={issuelist.title}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-4 space-y-3">
                            {/* Title */}
                            <h2 className="text-xl font-semibold">{issuelist.title}</h2>

                            {/* Category */}
                            <p className="text-gray-500 text-sm"> <span className="font-bold" >Category:</span>  {issuelist.catagory}</p>

                            {/* Badges */}
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor[issuelist.status]}`}>
                                    {issuelist.status}
                                </span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColor[issuelist.priority]}`}>
                                    {issuelist.priority} priority
                                </span>
                            </div>
                            {/* Location */}
                            <p className="text-sm text-gray-600">
                                <span className="font-bold" >location: </span>{issuelist.location}
                            </p>
                            <p className="text-sm wrap-anywhere text-gray-600 leading-relaxed">
                                {issuelist.description
                                    ? issuelist.description.split(' ').slice(0, 25).join(' ') +
                                    (issuelist.description.split(' ').length > 25 ? '...' : '')
                                    : 'No description available'}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3">

                                <div className="p-4 flex w-12 h-12 rounded-full justify-center items-center bg-cyan-50 dark:bg-gray-800 border border-cyan-100 dark:border-gray-700">
                                    <p className="text-gray-600 text-center  dark:text-gray-400">
                                        {issuelist.upvotes}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleupvotes(issuelist)}
                                    className="btn button " > <MdHowToVote /> upvote
                                </button>


                            </div>
                            <Link
                                to={`/issueDetails/${issuelist._id}`}
                                className=" btn button px-3 py-2 w-full "
                            >
                                View Details
                            </Link>
                        </div>
                    </div>

                )
            }
        </div>



    );
};

export default Allissue;