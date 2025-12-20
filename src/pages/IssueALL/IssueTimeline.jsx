import React from "react";
import { FaUserShield, FaUserTie, FaUser } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";




const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  rejected: 'bg-red-100 text-red-700',
  "in-progress": "bg-blue-100 text-blue-700",
  working: 'bg-fuchsia-100 text-fuchsia-700',
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-200 text-gray-600",
  boosted: "badge-primary",
};


const roleIcons = {
  admin: <FaUserShield className="text-xl" />,
  staff: <FaUserTie className="text-xl" />,
  citizen: <FaUser className="text-xl" />,
};

const IssueTimeline = ({ id }) => {

  const axiosSecure = useAxiosSecure();
  const { data: timelineData = [], } = useQuery({
    queryKey: ['issueTimeline', id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/issue-timeline/${id}`);
      return res.data;
    }
  });



  return (

    <div className="w-full bg-white p-5 rounded-xl shadow-lg border">
      <h2 className="text-xl font-semibold mb-4">Issue Timeline</h2>

      <div className="flex flex-col gap-6">
        {timelineData.map((item, index) => (
          <div key={index} className="flex items-start gap-4 relative">
            {/* Line */}
            {index !== timelineData.length - 1 && (
              <div className="absolute left-5 top-10 w-1 h-full bg-gray-300 rounded-full"></div>
            )}

            {/* Icon */}
            <div className="w-10 h-10 flex justify-center items-center bg-gray-100 rounded-full shadow">
              {roleIcons[item.role] || <FaUser />}
            </div>

            {/* Content */}
            <div className="flex-1 bg-gray-50 p-4 rounded-xl border shadow-sm">
              {/* Status */}
              <span
                className={`badge ${statusColor[item.status]} mb-2 text-xs`}
              >
                {item.status.replace("-", " ").toUpperCase()}
              </span>

              {/* Message */}
              <p className="font-medium text-gray-800">{item.message}</p>

              {/* Updated By + Date */}
              <div className="text-sm text-gray-600 mt-1">
                <span className="font-semibold capitalize">
                  Updated by: {item.role}
                </span>
                <br />
                <span className="font-semibold capitalize" >Date & time:{new Date(item.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueTimeline;
