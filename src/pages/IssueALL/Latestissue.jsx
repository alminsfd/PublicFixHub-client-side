import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const Latestissue = () => {
     const axiosSecure = useAxiosSecure();
     const { data: LeastestIssues = [] } = useQuery({
          queryKey: ["latestResolvedIssues"],
          queryFn: async () => {
               const res = await axiosSecure.get("/issues/resolved/latest");
               return res.data;
          }
     });

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
     console.log(LeastestIssues)
     return (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10' >
               {
                    LeastestIssues.map(issue =>
                         <div key={issue._id} className="card bg-base-100   ">
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
                                        <p className="text-sm wrap-anywhere text-gray-600 leading-relaxed">
                                             {issue.description
                                                  ? issue.description.split(' ').slice(0, 25).join(' ') +
                                                  (issue.description.split(' ').length > 25 ? '...' : '')
                                                  : 'No description available'}
                                        </p>
                                                  
                                        <Link
                                             to={`/issueDetails/${issue._id}`}
                                             className=" btn button px-3 py-2 w-full "
                                        >
                                             View Details
                                        </Link>
                                   </div>
                              </div>
                         </div>
                    )
               }
          </div>
     );
};

export default Latestissue;