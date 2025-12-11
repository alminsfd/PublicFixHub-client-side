import { Link } from "react-router";
import { MdHowToVote } from "react-icons/md";
const IssueCard = ({ issue }) => {


    const {
        _id,
        photoURL,
        title,
        catagory,
        status,
        priority, 
        location,
        upvotes,
    } = issue;

    const statusColor = {
        pending: "bg-yellow-100 text-yellow-700",
        "In-Progress": "bg-blue-100 text-blue-700",
        resolved: "bg-green-100 text-green-700",
        closed: "bg-gray-200 text-gray-600",
    };

    const priorityColor = {
        High: "bg-red-100 text-red-700",
        normal: "bg-green-100 text-green-700",
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition ">
            {/* Image */}
            <img
                src={photoURL}
                alt={title}
                className="w-full h-48 object-cover"
            />

            <div className="p-4 space-y-3">
                {/* Title */}
                <h2 className="text-xl font-semibold">{title}</h2>

                {/* Category */}
                <p className="text-gray-500 text-sm">Category: {catagory}</p>

                {/* Badges */}
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor[status]}`}>
                        {status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColor[priority]}`}>
                        {priority} priority
                    </span>
                </div>

                {/* Location */}
                <p className="text-sm text-gray-600">
                   location: {location}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3">
                    {/* Upvote Button */}
                    <p className="flex items-center gap-1 px-3 py-1 rounded-lg border hover:bg-gray-100 transition">
                        <span>{upvotes}</span>
                    </p>

                    <button className="btn button " ><MdHowToVote/>upvote</button>

                    {/* View Details */}
                </div>
                <Link
                    to={`/issueDetails/${_id}`}
                    className=" btn button px-3 py-2 w-full "
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default IssueCard;
