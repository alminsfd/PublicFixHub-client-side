import React from 'react';
import { MdHowToVote } from 'react-icons/md';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router';
import IssueTimeline from './IssueTimeline';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Loading from '../../components/Loading/Loading';
import { useEffect } from 'react';

const IssueDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [selectedIssue, setSelectedIssue] = useState({});
    const editModalRef = useRef();
    const categoryData = useLoaderData()
    const { data: myIssuesDetails = {}, refetch, isLoading } = useQuery({
        queryKey: ["my-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues/${id}`);
            return res.data;
        }
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm({})

    useEffect(() => {
        reset({
            photoURL: myIssuesDetails?.photoURL,
            description: myIssuesDetails?.description,
            location: myIssuesDetails?.location,
            title: myIssuesDetails?.title,
            catagory: myIssuesDetails?.catagory,


        })
    }, [myIssuesDetails, reset])
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/issues/${id}`);
                if (res.data.deletedCount) {
                    Swal.fire("Deleted!", "Your issue has been removed.", "success");
                    navigate('/dashboard/my-issue')
                    refetch();
                }
            }
        });
    };

    const openEditModal = (details) => {

        if (details.status === "pending") {
            setSelectedIssue(details);
            editModalRef.current.showModal()
        }
        else {
            Swal.fire("Only pending issues update allow");
        }
    }

    const onSubmitUpdate = async (data) => {
        editModalRef.current.close()
        const res = await axiosSecure.patch(`/issues/${selectedIssue._id}`, data);
        if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", "Issue updated successfully", "success");
            refetch();
        }
    };

    const handlepurchase = (details) => {
        const paymentInfo = {
            Issuetitle: details.title,
            createrEmail: details.createrEmail,
            Issueid: details._id,
            trackingId: details.trackingId,
            price: 100,
        }
        Swal.fire({
            title: "Are you sure to pay 100tk?",
            text: "You pay 100tk for Boosting!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, pay it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.post('/payment-checkout-session/boosting', paymentInfo);
                window.location.href = res.data.url;
            }
        });
    }

    const title = categoryData.map(c => c.name);
    const titleCatagory = useWatch({ control, name: 'title' });
    const Selectcatagory = (catagoryname) => {
        const catagory = categoryData.find(c => c.name === catagoryname);
        return catagory ? catagory.items : [];
    }

    const handleupvotes = async (details) => {
        try {
            const res = await axiosSecure.patch(`/issues/upvote/${details._id}`, {
                email: user?.email
            });
            if (res.data.success) {
                Swal.fire({
                    icon:'success',
                    title: res.data.message
                });
                refetch();
            } else {
                Swal.fire({
                    icon:'warning',
                    title:'Already upvote'

                })
            }
            // err.response?.data?.message || "Upvote failed"
        } catch (err) {
            Swal.fire({
                icon:'warning',
                title: err.response?.data?.message || "Upvote failed"
            });
        }

    }

    if (isLoading) {
       return <Loading></Loading>
    }

    return (
        <>
            
                <div key={myIssuesDetails.createdBy} className="min-h-screen bg-linear-to-b from-sky-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 flex justify-center items-center py-16 px-4 transition-colors duration-500">
                    <div className="max-w-5xl w-full bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 lg:flex gap-10 border border-gray-200 dark:border-gray-700 transition-all duration-300">
                        {/* Image Section */}
                        <div className="flex-1 flex justify-center">
                            <img
                                src={myIssuesDetails.photoURL}
                                className="rounded-3xl w-[380px] h-[300px] object-cover shadow-lg border border-gray-300 dark:border-gray-600"
                            />
                        </div>
                        {/* Details Section */}
                        <div className="flex-1 space-y-5">
                            <h1 className="text-3xl mt-3 md:text-4xl font-bold text-gray-800 dark:text-gray-100">
                                {myIssuesDetails.title}
                            </h1>
                            <p className="text-gray-700 dark:text-gray-300 wrap-anywhere leading-relaxed">
                                {myIssuesDetails.description}
                            </p>
                            {/* Info Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <div className="p-4 rounded-xl bg-sky-50 dark:bg-gray-800 border border-sky-100 dark:border-gray-700">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        Category
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">{myIssuesDetails.catagory

                                    }</p>
                                </div>

                                <div className="p-4 rounded-xl bg-cyan-50 dark:bg-gray-800 border border-cyan-100 dark:border-gray-700">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        Status
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">{myIssuesDetails.status}</p>
                                </div>

                                <div className="p-4 rounded-xl bg-cyan-50 dark:bg-gray-800 border border-cyan-100 dark:border-gray-700">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        Priority
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {myIssuesDetails.priority}
                                    </p>
                                </div>
                                <div className="p-4  flex-1 rounded-xl bg-sky-50 dark:bg-gray-800 border border-sky-100 dark:border-gray-700">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        location
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">{myIssuesDetails.location}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-cyan-50 dark:bg-gray-800 border border-cyan-100 dark:border-gray-700">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        Staff info
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {myIssuesDetails.assignedStaff?.name||'N/A'}
                                    </p>
                                </div>
                                <div className="p-4  rounded-xl bg-cyan-50 dark:bg-gray-800 border border-cyan-100 dark:border-gray-700">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        Upvote number
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {myIssuesDetails.upvotes}
                                    </p>
                                </div>
                            </div>
                            {
                                user.email === myIssuesDetails.createrEmail ? (
                                    <div className="flex flex-wrap gap-4 mt-8">
                                        <>
                                            <button
                                                onClick={() => openEditModal(myIssuesDetails)}
                                                className="px-6 py-3 rounded-xl border-2 border-purple-500 text-purple-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(myIssuesDetails._id)}
                                                className="px-6 py-3 rounded-xl border-2 border-red-500 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-gray-800 transition cursor-pointer "
                                            >
                                                Delete
                                            </button>
                                        </>

                                        <button
                                            onClick={() => handlepurchase(myIssuesDetails)}
                                            className=" mx-6 px-10 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold shadow-md transition cursor-pointer "
                                        >
                                            Boost issue
                                        </button>


                                        <button
                                            onClick={() => navigate(-1)}
                                            className=" text-center w-full px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold shadow-md transition"
                                        >
                                            Go Back
                                        </button>
                                    </div>
                                ) : (
                                    <div className='flex  items-center gap-2' >

                                        <button
                                            onClick={() => handleupvotes(myIssuesDetails)}
                                            className=" w-1/2  px-10 flex  gap-1 items-center justify-center  py-3 rounded-xl bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold shadow-md transition cursor-pointer"><MdHowToVote /> Give upvote</button>

                                        <button
                                            onClick={() => navigate(-1)}
                                            className=" w-1/2 text-center  px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold shadow-md transition"
                                        >
                                            Go Back
                                        </button>

                                    </div>

                                )
                            }
                            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                                Created At:{" "}
                                <span className="font-medium text-gray-700 dark:text-gray-300">
                                    {myIssuesDetails.name}
                                </span>
                            </div>
                        </div>


                    </div>
                </div>
            


            <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="text-xl font-bold mb-4">Edit Issue</h3>
                    <form onSubmit={handleSubmit(onSubmitUpdate)} className="space-y-4">
                        {/* Photo URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Photo URL
                            </label>
                            <input
                                {...register("photoURL")}
                                className="input input-bordered w-full"
                                placeholder="Enter photo URL"
                            />
                        </div>
                        {/* title */}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Title</span>
                            </label>
                            <select
                                {...register('title', { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option disabled value="">Pick your title</option>
                                {title.map((r, i) => (
                                    <option key={i} value={r}>{r}</option>
                                ))}
                            </select>
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">title selection is required</p>
                            )}
                        </div>

                        {/* catagory */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Issue Category</span>
                            </label>
                            <select
                                {...register('catagory', { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option disabled value="">Pick a category</option>
                                {Selectcatagory(titleCatagory).map((r, i) => (
                                    <option key={i} value={r}>{r}</option>
                                ))}
                            </select>
                            {errors.catagory && (
                                <p className="text-red-500 text-sm mt-1">catagory selection is required</p>
                            )}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                {...register("location")}
                                className="input input-bordered w-full"
                                placeholder="Enter location"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                {...register("description")}
                                className="textarea textarea-bordered w-full"
                                placeholder="Enter detailed description"
                                rows={4}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => editModalRef.current.close()}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </div>
                    </form>

                </div>
            </dialog>

            <IssueTimeline id={id} ></IssueTimeline>
        </>
    );
};

export default IssueDetails;