import React from 'react';
import { MdHowToVote } from 'react-icons/md';
import { Link } from 'react-router';
import IssueTimeline from './IssueTimeline';

const IssueDetails = () => {
    
    return (
        <>
            <div className="min-h-screen bg-linear-to-b from-sky-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 flex justify-center items-center py-16 px-4 transition-colors duration-500">
                <div className="max-w-5xl w-full bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 lg:flex gap-10 border border-gray-200 dark:border-gray-700 transition-all duration-300">
                    {/* Image Section */}
                    <div className="flex-1 flex justify-center">
                        <img
                            src={'https://www.designboom.com/wp-content/uploads/2023/09/facebook-new-logo-change-designboom-02.jpg'}
                            className="rounded-3xl w-[380px] h-[300px] object-cover shadow-lg border border-gray-300 dark:border-gray-600"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 space-y-5">
                        <h1 className="text-3xl mt-3 md:text-4xl font-bold text-gray-800 dark:text-gray-100">
                            Broken Streetlight in Road 12
                        </h1>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quibusdam voluptates modi molestiae debitis ratione at sequi qui earum id explicabo facere officiis corporis nostrum aliquid reiciendis nulla commodi minus tempore vero accusamus, ducimus dicta amet rerum. Debitis fuga quisquam hic porro, neque quo corrupti! Similique minima quas necessitatibus temporibus.
                        </p>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-gray-800 border border-sky-100 dark:border-gray-700">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    Category
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">fRSAM</p>
                            </div>

                            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-gray-800 border border-cyan-100 dark:border-gray-700">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    Status
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">Streetlight</p>
                            </div>

                            <div className="p-4 rounded-xl bg-sky-50 dark:bg-gray-800 border border-sky-100 dark:border-gray-700">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    Badage
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">Pending</p>
                            </div>

                            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-gray-800 border border-cyan-100 dark:border-gray-700">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    Priority
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Purchased 50 times
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-gray-800 border border-cyan-100 dark:border-gray-700">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    Upvote number
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    50
                                </p>
                            </div>
                            <button className="btn button p-10 " ><MdHowToVote />Give upvote</button>
                            <div className="p-4  flex-1 rounded-xl bg-sky-50 dark:bg-gray-800 border border-sky-100 dark:border-gray-700">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    location
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">Pending</p>
                            </div>
                            <div className="p-4 rounded-xl bg-cyan-50 dark:bg-gray-800 border border-cyan-100 dark:border-gray-700">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    Staff info
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Tanvir Rahman Sovo
                                </p>
                                <small>Dep:- Water management</small>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            {/* {isCreator ? ( */}
                            <>
                                <Link
                                    to={`/updatemodel/123`}
                                    className="px-6 py-3 rounded-xl border-2 border-purple-500 text-purple-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                                >
                                    Edit
                                </Link>

                                <button
                                    // onClick={handleDelete}
                                    className="px-6 py-3 rounded-xl border-2 border-red-500 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-gray-800 transition cursor-pointer "
                                >
                                    Delete
                                </button>
                            </>

                            <button
                                // onClick={handlepurchase}
                                className=" mx-6 px-10 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold shadow-md transition cursor-pointer "
                            >
                                Boost issue
                            </button>


                            <Link
                                to="/viewmodels"
                                className=" text-center w-full px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold shadow-md transition"
                            >
                                Go Back
                            </Link>
                        </div>

                        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                            Created At:{" "}
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                Mirpur-10, Dhaka
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            <IssueTimeline  ></IssueTimeline>
        </>
    );
};

export default IssueDetails;