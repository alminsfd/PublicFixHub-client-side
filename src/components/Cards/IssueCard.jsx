import { Link } from "react-router";
import { MdHowToVote } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useRef } from "react";
import { useForm } from "react-hook-form";
const IssueCard = ({ refetch, issue }) => {
    const axiosSecure = useAxiosSecure();
    const editModalRef = useRef();
    const [selectedIssue, setSelectedIssue] = useState({});
    const {
        register,
        handleSubmit,
    } = useForm()
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
        setSelectedIssue(issue);
        editModalRef.current.showModal()
    }




    const statusColor = {
        pending: "bg-yellow-100 text-yellow-700",
        "in-progress": "bg-blue-100 text-blue-700",
        resolved: "bg-green-100 text-green-700",
        closed: "bg-gray-200 text-gray-600",
    };

    const priorityColor = {
        High: "bg-red-100 text-red-700",
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
                    {
                        console.log(issue)
                    }
                    {/* Location */}
                    <p className="text-sm text-gray-600">
                        <span className="font-bold" >location: </span>{issue.location}
                    </p>
                    <p className="text-sm text-gray-600  leading-relaxed ">
                        <span className="font-bold" > description: </span> {issue.description.split(' ').slice(0, 25).join(' ')}
                        {issue.description.split(' ').length > 25 && '...'}
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
                    <form onSubmit={handleSubmit(onSubmitUpdate)}>
                        <input
                            defaultValue={selectedIssue.photoURL}
                            {...register("photoURL")}
                            className="input input-bordered w-full mb-3"
                        />
                        <input
                            defaultValue={selectedIssue.title}
                            {...register("title")}
                            className="input input-bordered w-full mb-3"
                        />

                        <input
                            defaultValue={selectedIssue.catagory}
                            {...register("catagory")}
                            className="input input-bordered w-full mb-3"
                        />
                        <input
                            defaultValue={selectedIssue.location}
                            {...register("location")}
                            className="input input-bordered w-full mb-3"
                        />
                        <textarea
                            defaultValue={selectedIssue.description}
                            {...register("description")}
                            className="textarea textarea-bordered w-full"
                        />


                        <div className="mt-4 flex justify-end gap-3">
                            <button type="button" className="btn" onClick={() => editModalRef.current.close()}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" type="submit">
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
