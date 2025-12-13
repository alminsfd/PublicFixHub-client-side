import { Link } from "react-router";
import { MdHowToVote } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useRef } from "react";
import { useForm, useWatch, } from "react-hook-form";
const IssueCard = ({ refetch, issue, categoryData }) => {
    const axiosSecure = useAxiosSecure();
    const editModalRef = useRef();
    const [selectedIssue, setSelectedIssue] = useState({});
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({
        defaultValues: {
            catagory: issue.catagory,
            description: issue.description,
            location: issue.location,
            photoURL: issue.photoURL,
            title: issue.title
        }
    })


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
                    refetch();
                }
            }
        });
    };

    const onSubmitUpdate = async (data) => {
        editModalRef.current.close()
        const res = await axiosSecure.patch(`/issues/${selectedIssue._id}`, data);
        if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", "Issue updated successfully", "success");
            refetch();
        }
    };


    const openEditModal = (issue) => {
        if (issue.status === "pending") {
            setSelectedIssue(issue);
            editModalRef.current.showModal()
        }
        else {
            Swal.fire("Only pending issues update allow");
        }
    }

    const title = categoryData.map(c => c.name);
    const titleCatagory = useWatch({ control, name: 'title' });
    const Selectcatagory = (catagoryname) => {
        const catagory = categoryData.find(c => c.name === catagoryname);
        return catagory ? catagory.items : [];
    }


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



    return (

        <>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition ">
                {/* Image */}
                <img
                    src={issue.photoURL}
                    alt={issue.title}
                    className="w-full h-48 object-cover"
                />

                <div className="p-4 space-y-3">
                    {/* Title */}
                    <h2 className="text-xl font-semibold">{issue.title}</h2>

                    {/* Category */}
                    <p className="text-gray-500 text-sm"> <span className="font-bold" >Category:</span>  {issue.catagory}</p>

                    {/* Badges */}
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor[issue.status]}`}>
                            {issue.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColor[issue.priority]}`}>
                            {issue.priority} priority
                        </span>
                    </div>
                    {/* Location */}
                    <p className="text-sm text-gray-600">
                        <span className="font-bold" >location: </span>{issue.location}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {issue.description
                            ? issue.description.split(' ').slice(0, 25).join(' ') +
                            (issue.description.split(' ').length > 25 ? '...' : '')
                            : 'No description available'}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3">
                        <button onClick={() => openEditModal(issue)} className="btn button " >Edit</button>
                        <button onClick={() => handleDelete(issue._id)} className="btn button " >Delete</button>

                        {/* View Details */}
                    </div>
                    <Link
                        to={`/issueDetails/${issue._id}`}
                        className=" btn button px-3 py-2 w-full "
                    >
                        View Details
                    </Link>
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

        </>

    );


};

export default IssueCard;
