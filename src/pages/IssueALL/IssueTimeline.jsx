import React from "react";
import { FaUserShield, FaUserTie, FaUser } from "react-icons/fa";

const statusColors = {
  pending: "badge-warning",
  "in-progress": "badge-info",
  resolved: "badge-success",
  closed: "badge-neutral",
  rejected: "badge-error",
  boosted: "badge-primary",
};

const roleIcons = {
  admin: <FaUserShield className="text-xl" />,
  staff: <FaUserTie className="text-xl" />,
  citizen: <FaUser className="text-xl" />,
};

const IssueTimeline = () => {
    const timelineData = [
        {
            status: "pending",
            message: "Issue reported by citizen",
            updatedBy: "citizen",
            date: "2025-12-07 | 10:35 AM",
        },
        {
            status: "in-progress",
            message: "Issue assigned to Staff: John Doe",
            updatedBy: "admin",
            date: "2025-12-07 | 11:00 AM",
        },
        {
            status: "in-progress",
            message: "Work started on the issue",
            updatedBy: "staff",
            date: "2025-12-07 | 12:15 PM",
        },
        {
            status: "resolved",
            message: "Issue marked as resolved",
            updatedBy: "staff",
            date: "2025-12-08 | 09:45 AM",
        },
        {
            status: "closed",
            message: "Issue closed by admin",
            updatedBy: "admin",
            date: "2025-12-08 | 10:10 AM",
        },
    ];
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
              {roleIcons[item.updatedBy] || <FaUser />}
            </div>

            {/* Content */}
            <div className="flex-1 bg-gray-50 p-4 rounded-xl border shadow-sm">
              {/* Status */}
              <span
                className={`badge ${statusColors[item.status]} mb-2 text-xs`}
              >
                {item.status.replace("-", " ").toUpperCase()}
              </span>

              {/* Message */}
              <p className="font-medium text-gray-800">{item.message}</p>

              {/* Updated By + Date */}
              <div className="text-sm text-gray-600 mt-1">
                <span className="font-semibold capitalize">
                  Updated by: {item.updatedBy}
                </span>
                <br />
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueTimeline;
