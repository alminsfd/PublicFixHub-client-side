import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { useState } from 'react';

const AssignIssuepage = () => {
     const { user } = useAuth();
     const axiosSecure = useAxiosSecure();
     const [filterStatus, setFilterStatus] = useState("");
     const [filterPriority, setFilterPriority] = useState("");
     const [statusSelect, setStatusSelect] = useState({});



     const { data: staffIssues = [], isLoading, refetch } = useQuery({
          queryKey: ["staffIssues", user?.email],
          enabled: !!user?.email,
          queryFn: async () => {
               const res = await axiosSecure.get(
                    `/issues/staff/${user.email}`
               );
               return res.data;
          }
     });

     console.log(staffIssues)

     const priorityOrder = {
          high: 1,
          normal: 2
     }

     const statusFlow = {
          pending: ["in-progress"],
          "in-progress": ["working"],
          working: ["resolved"],
          resolved: ["closed"],
          closed: []
     };


     const statusColor = {
          pending: "bg-yellow-100 text-yellow-700",
          rejected: 'bg-red-100 text-red-700',
          "in-progress": "bg-blue-100 text-blue-700",
          working: 'bg-fuchsia-100 text-fuchsia-800',
          resolved: "bg-green-100 text-green-700",
          closed: "bg-gray-200 text-gray-600",
     };



     const handleStatusChange = async (issue, newStatus) => {
          try {
               const res = await axiosSecure.patch(
                    `/issues/${issue._id}/status`,
                    {
                         status: newStatus,
                         trackingId: issue.trackingId

                    }
               );

               if (res.data.modifiedCount > 0) {
                    Swal.fire({
                         icon: "success",
                         title: "Status Updated",
                         timer: 1200,
                         showConfirmButton: false
                    });
                    refetch()
               }
               setStatusSelect(prev => ({ ...prev, [issue._id]: "" }));
          } catch (error) {
               Swal.fire("Error", "Status update failed", error);
          }
     };

     const filteredIssues = staffIssues.filter(issue => {
          if (filterStatus && issue.status !== filterStatus) return false;
          if (filterPriority && issue.priority !== filterPriority) return false;
          return true;
     });


     if (isLoading) {
          return <Loading></Loading>
     }
     return (
          <div>

               {
                    staffIssues.length === 0 ? (<div className="text-center  md:text-4xl min-h-screen  text-gray-500 flex justify-center items-center md:py-10">
                         ❌ No issues found</div>) :

                         <div className="overflow-x-auto">
                              <div className='flex justify-center gap-4 my-4' >


                                   <select className="select select-bordered" onChange={e => setFilterStatus(e.target.value)}>
                                        <option value="">All</option>
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In-progress</option>
                                        <option value="resolved">Resolve</option>
                                        <option value="closed">Closed</option>

                                   </select>
                                   <select className="select select-bordered" onChange={e => setFilterPriority(e.target.value)}>
                                        <option value="">All</option>
                                        <option value="high">High</option>
                                        <option value="normal">normal</option>

                                   </select>

                              </div>
                              <table className="table">
                                   {/* head */}
                                   <thead>
                                        <tr>
                                             <th>Title</th>
                                             <th>category</th>
                                             <th>status</th>
                                             <th>priority</th>
                                             <th>change status</th>
                                        </tr>
                                   </thead>

                                   <tbody>
                                        {

                                             filteredIssues.length === 0 ? <div className="text-center  md:text-4xl text-gray-500 flex justify-center items-center  md:py-10">
                                                  ❌ No issues found</div> :


                                                  [...filteredIssues]
                                                       .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]


                                                       ).map(issue => (
                                                            <tr key={issue._id}>
                                                                 <td className='font-bold' >{issue.title}</td>
                                                                 <td className='font-semibold' >{issue.catagory}</td>

                                                                 <td>
                                                                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor[issue.status]}`}>
                                                                           {issue.status}
                                                                      </span>
                                                                 </td>

                                                                 <td>
                                                                      <span className={` px-2 py-1 rounded-2xl  ${issue.priority === "high"
                                                                           ? "bg-red-100 text-red-700"
                                                                           : " bg-green-100 text-green-700"
                                                                           }`}>
                                                                           {issue.priority}
                                                                      </span>
                                                                 </td>

                                                                 <td>
                                                                      {
                                                                           statusFlow[issue.status]?.length > 0 && (
                                                                                <select
                                                                                     className="select select-bordered select-sm"
                                                                                     value={statusSelect[issue._id] || ""}
                                                                                     onChange={(e) => {
                                                                                          const newStatus = e.target.value;
                                                                                          setStatusSelect(prev => ({ ...prev, [issue._id]: newStatus }));
                                                                                          handleStatusChange(issue, newStatus);
                                                                                     }}
                                                                                >
                                                                                     <option value="" disabled>Change status</option>
                                                                                     {statusFlow[issue.status].map(status => (
                                                                                          <option key={status} value={status}>{status}</option>
                                                                                     ))}
                                                                                </select>

                                                                           )
                                                                      }
                                                                 </td>


                                                            </tr>
                                                       ))
                                        }


                                   </tbody>
                              </table>
                         </div>
               }
          </div>
     );
};

export default AssignIssuepage;