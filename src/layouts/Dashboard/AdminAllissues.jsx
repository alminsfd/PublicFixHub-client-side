import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';
import { useState } from 'react';
import { useRef } from 'react';
import Swal from 'sweetalert2';

const AdminAllissues = () => {
     const axiosSecure = useAxiosSecure()
     const [selectedIssue, setSelectedIssue] = useState(null);
     const [staffList, setStaffList] = useState([]);
     const [selectedStaff, setSelectedStaff] = useState(null);
     const editModalRef = useRef()

     const { data: adminIssues = [], isLoading, refetch } = useQuery({
          queryKey: ["pending"],
          queryFn: async () => {
               const res = await axiosSecure.get(`/issues/status`);
               return res.data;
          }
     });

     const priorityOrder = {
          high: 1,
          normal: 2
     };
     const openAssignModal = async (issue) => {
          setSelectedIssue(issue)
          const res = await axiosSecure.get("/staff");
          setStaffList(res.data);
          editModalRef.current.showModal()

     }

     const handleAssignStaff = async () => {
          if (!selectedStaff) return;

          await axiosSecure.patch(
               `/issues/assign/${selectedIssue._id}`,
               {
                    staff: {
                         name: selectedStaff.displayName,
                         email: selectedStaff.email,
                         photoURL: selectedStaff.photoURL,
                         staffId: selectedStaff._id
                    }
               }
          );
          editModalRef.current.close();
          refetch()

     }

     const handleReject = async (id) => {
          const result = await Swal.fire({
               title: "Are you sure?",
               text: "This issue will be rejected!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#d33",
               cancelButtonColor: "#3085d6",
               confirmButtonText: "Yes, Reject it!"
          });

          if (result.isConfirmed) {
               rejectIssue(id);
          }
     };

     const rejectIssue = async (id) => {
          try {
               const res = await axiosSecure.patch(`/issues/reject/${id}`);

               if (res.data.modifiedCount > 0) {
                    Swal.fire({
                         icon: "success",
                         title: "Rejected!",
                         text: "Issue has been rejected."
                    });
                    refetch();
               }
          } catch (error) {
               Swal.fire({
                    icon: "error",
                    title: error,
               });
          }
     };

     const statusColor = {
          pending: "bg-yellow-100 text-yellow-700",
          rejected: 'bg-red-100 text-red-700',
          "in-progress": "bg-blue-100 text-blue-700",
          working: 'bg-fuchsia-100 text-fuchsia-100',
          resolved: "bg-green-100 text-green-700",
          closed: "bg-gray-200 text-gray-600",
     };


     if (isLoading) {
          return <Loading></Loading>
     }
     return (
          <div>

               {
                    adminIssues.length === 0 ? (<div className="text-center  md:text-4xl min-h-screen  text-gray-500 flex justify-center items-center md:py-10">
                         ❌ No issues found</div>) :

                         <div className="overflow-x-auto">
                              <table className="table">
                                   {/* head */}
                                   <thead>
                                        <tr>
                                             <th>Title</th>
                                             <th>category</th>
                                             <th>status</th>
                                             <th>priority</th>
                                             <th>assigned info</th>
                                             <th>assigned status</th>
                                             <th>Issue action</th>
                                        </tr>
                                   </thead>

                                   <tbody>
                                        {



                                             [...adminIssues]
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

                                                            {/* Assigned Staff */}
                                                            <td>
                                                                 {
                                                                      issue.assignedStaff !== "N/A"
                                                                           ? issue.assignedStaff.name
                                                                           : <span className="text-gray-400">Not Assigned</span>
                                                                 }
                                                            </td>

                                                            {/* Action */}
                                                            <td>
                                                                 {
                                                                      issue.assignedStaff !== "N/A" || issue.status === 'rejected'
                                                                           ? (
                                                                                <button className="btn btn-sm" disabled>
                                                                                     {issue.status === 'rejected' ? 'Not Assigned' : 'Assigned'}
                                                                                </button>
                                                                           )
                                                                           : (
                                                                                <button
                                                                                     className='btn btn-sm btn-primary'
                                                                                     onClick={() =>
                                                                                          openAssignModal(issue)}
                                                                                >
                                                                                     Assign Staff
                                                                                </button>
                                                                           )
                                                                 }
                                                            </td>
                                                            <td>
                                                                 {
                                                                      issue.status === 'pending' && issue.assignedStaff === "N/A" ? <button
                                                                           onClick={() => handleReject(issue._id)}
                                                                           className="btn btn-error btn-sm"
                                                                      >
                                                                           Reject
                                                                      </button> : <button className="btn btn-sm" disabled>
                                                                           Reject
                                                                      </button>
                                                                 }
                                                            </td>
                                                       </tr>
                                                  ))
                                        }


                                   </tbody>
                              </table>
                         </div>
               }
               <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                         <h3 className="font-bold text-lg mb-4">
                              Assign Staff
                         </h3>

                         <select
                              className="select select-bordered w-full"
                              value={selectedStaff?.email || ""}
                              onChange={(e) => {
                                   const staff = staffList.find(
                                        s => s.email === e.target.value
                                   );
                                   setSelectedStaff(staff);
                              }}
                         >
                              <option value="" disabled >Select Staff</option>

                              {
                                   staffList.map(staff => (
                                        <option key={staff.email} value={staff.email}>
                                             {staff.displayName}
                                        </option>
                                   ))
                              }
                         </select>


                         <div className="modal-action">
                              {
                                   staffList.length === 0 ? <button className="btn" disabled="disabled">Confirm</button> : <button
                                        className="btn btn-primary"
                                        onClick={handleAssignStaff}
                                   >
                                        Confirm
                                        
                                   </button>
                              }

                              <button
                                   className="btn"
                                   onClick={() => editModalRef.current.close()}
                              >
                                   Cancel
                              </button>
                         </div>
                    </div>
               </dialog>
          </div>
     );
};

export default AdminAllissues;