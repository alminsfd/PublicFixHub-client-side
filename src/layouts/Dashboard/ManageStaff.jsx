import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { useState } from 'react';


const ManageStaff = () => {
     const axiosSecure = useAxiosSecure();
     const updateModalRef = useRef()
     const addStaffModalRef = useRef();
     const [selectedIssue, setSelectedIssue] = useState({});
     const { data: allstaffs = [], isLoading, refetch } = useQuery({
          queryKey: ["my-allstaffs"],
          queryFn: async () => {
               const res = await axiosSecure.get(`/users/staffs`);
               return res.data
          }
     });
     const {
          register,
          handleSubmit,
          reset,
     } = useForm({})
     const addform = useForm()
     useEffect(() => {
          reset({
               photoURL: allstaffs[0]?.photoURL,
               displayName: allstaffs[0]?.displayName,
               email: allstaffs[0]?.email
          })
     }, [allstaffs, reset])

     const onSubmitUpdate = async (data) => {
          updateModalRef.current.close()

          const res = await axiosSecure.patch(`/users/${selectedIssue._id}`, data);
          if (res.data.modifiedCount > 0) {
               Swal.fire("Updated!", " updated successfully");
               refetch();
          }
     };
     const handleDelete = (user) => {

          Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
               if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/users/${user._id}/delete`);
                    if (res.data.deletedCount > 0) {
                         Swal.fire("Deleted!", "Deleted successfully", "success");
                         refetch();
                    }
               }
          });
     };

     const openEditModal = (user) => {
          setSelectedIssue(user);
          updateModalRef.current.showModal()
     }

     const onSubmitAddStaff = async (data) => {
          try {
               const res = await axiosSecure.post("/users/create-staff", data);

               if (res.data.insertedId) {
                    Swal.fire("Success!", "Staff created successfully", "success");
                    addStaffModalRef.current.close();
                    reset();
                    refetch();
               }
          } catch (err) {
               Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
          }
     };


     if (isLoading) {
          return <Loading></Loading>
     }

     return (
          <>

               {
                    allstaffs.length === 0 ? (<div className="text-center  md:text-4xl min-h-screen  text-gray-500 flex justify-center items-center md:py-10">
                         <button
                              onClick={() => addStaffModalRef.current.showModal()}
                              className="btn btn-sm btn-primary "
                         >
                              Add Staff
                         </button>
                    </div>) : (
                         <>

                              <div className="hidden md:block overflow-x-auto">
                                   <table className="table table-zebra w-full">
                                        <thead>
                                             <tr>
                                                  <th>Staff</th>
                                                  <th>Email</th>
                                                  <th>Status</th>
                                                  <th>Admin Action</th>
                                                  <th>Add Action</th>
                                             </tr>
                                        </thead>

                                        <tbody>
                                             {allstaffs.map(user => (
                                                  <tr key={user._id}>
                                                       {/* STAFF */}
                                                       <td>
                                                            <div className="flex items-center gap-3">
                                                                 <img
                                                                      src={user.photoURL}
                                                                      className="w-10 h-10 rounded-full object-cover"
                                                                      alt="staff"
                                                                 />
                                                                 <div>
                                                                      <p className="font-semibold">{user.displayName}</p>
                                                                 </div>
                                                            </div>
                                                       </td>

                                                       {/* EMAIL */}
                                                       <td className="font-medium">{user.email}</td>

                                                       {/* STATUS */}
                                                       <td>
                                                            {user.isBlocked ? (
                                                                 <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-900 text-sm">
                                                                      Blocked
                                                                 </span>
                                                            ) : (
                                                                 <span className="bg-green-600 px-3 py-1 rounded-full text-white text-sm">
                                                                      Active
                                                                 </span>
                                                            )}
                                                       </td>

                                                       {/* ADMIN ACTION */}
                                                       <td className="space-x-2">
                                                            <button
                                                                 onClick={() => handleDelete(user)}
                                                                 className="btn btn-xs btn-error"
                                                            >
                                                                 Delete
                                                            </button>

                                                            <button
                                                                 onClick={() => openEditModal(user)}
                                                                 className="btn btn-xs btn-success"
                                                            >
                                                                 Update
                                                            </button>
                                                       </td>

                                                       {/* ADD ACTION */}
                                                       <td>
                                                            <button
                                                                 className="btn btn-xs btn-primary"
                                                                 onClick={() => addStaffModalRef.current.showModal()}
                                                            >
                                                                 Add Staff
                                                            </button>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>
                              < div className="md:hidden space-y-4">
                                   {allstaffs.map(user => (
                                        <div
                                             key={user._id}
                                             className="bg-base-100 shadow-md rounded-xl p-4 space-y-3"
                                        >
                                             {/* STAFF INFO */}
                                             <div className="flex items-center gap-3">
                                                  <img
                                                       src={user.photoURL}
                                                       className="w-12 h-12 rounded-full object-cover"
                                                       alt="staff"
                                                  />
                                                  <div>
                                                       <p className="font-bold">{user.displayName}</p>
                                                       <p className="text-sm text-gray-500">{user.email}</p>
                                                  </div>
                                             </div>

                                             {/* STATUS */}
                                             <div className="flex justify-between">
                                                  <span className="font-semibold">Status:</span>
                                                  {user.isBlocked ? (
                                                       <span className="text-gray-600 font-medium">Blocked</span>
                                                  ) : (
                                                       <span className="text-green-600 font-medium">Active</span>
                                                  )}
                                             </div>

                                             {/* ACTION BUTTONS */}
                                             <div className="flex gap-2 pt-2">
                                                  <button
                                                       onClick={() => handleDelete(user)}
                                                       className="btn btn-sm btn-error flex-1"
                                                  >
                                                       Delete
                                                  </button>

                                                  <button
                                                       onClick={() => openEditModal(user)}
                                                       className="btn btn-sm btn-success flex-1"
                                                  >
                                                       Update
                                                  </button>
                                             </div>

                                             <button
                                                  onClick={() => addStaffModalRef.current.showModal()}
                                                  className="btn btn-sm btn-primary w-full"
                                             >
                                                  Add Staff
                                             </button>
                                        </div>
                                   ))}
                              </div >
                         </>)


               }
               <dialog ref={updateModalRef} className="modal modal-bottom sm:modal-middle">
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


                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                   </label>
                                   <input
                                        {...register("displayName")}
                                        className="input input-bordered w-full"
                                        placeholder="Enter issue name"
                                   />
                              </div>


                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        email
                                   </label>
                                   <input readOnly
                                        {...register("email")}
                                        className="input input-bordered w-full"
                                        placeholder="Enter your email"
                                   />
                              </div>


                              {/* Buttons */}
                              <div className="mt-4 flex justify-end gap-3">
                                   <button
                                        type="button"
                                        className="btn btn-outline"
                                        onClick={() => updateModalRef.current.close()}
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
               <dialog ref={addStaffModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                         <h3 className="text-xl font-bold mb-4">Add Staff</h3>

                         <form onSubmit={addform.handleSubmit(onSubmitAddStaff)} className="space-y-3">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                   Name
                              </label>
                              <input {...addform.register("displayName", { required: true })}
                                   placeholder="Name"
                                   className="input input-bordered w-full" />
                              {addform.formState.errors.displayName?.type === "required" && (
                                   <p className='text-red-700 text-sm' > name is required</p>
                              )}
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                   Email
                              </label>
                              <input {...addform.register("email", { required: true })}
                                   placeholder="Email"
                                   className="input input-bordered w-full" />
                              {addform.formState.errors.email?.type === "required" && (
                                   <p className='text-red-700 text-sm' > email is required</p>
                              )}
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                   Phone
                              </label>
                              <input {...addform.register("phone", { required: true })}
                                   placeholder="Phone"
                                   className="input input-bordered w-full" />
                              {addform.formState.errors.phone?.type === "required" && (
                                   <p className='text-red-700 text-sm' > phone is required</p>
                              )}
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                   Photo URL
                              </label>
                              <input {...addform.register("photoURL", { required: true })}
                                   placeholder="Photo URL"
                                   className="input input-bordered w-full" />
                              {addform.formState.errors.photoURL?.type === "required" && (
                                   <p className='text-red-700 text-sm' > photo url is required</p>
                              )}
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                   Password
                              </label>
                              <input {...addform.register("password", { required: true })}
                                   type="password"
                                   placeholder="Password"
                                   className="input input-bordered w-full" />
                              {addform.formState.errors.password?.type === "required" && (
                                   <p className='text-red-700 text-sm' > password is required</p>
                              )}

                              <div className="flex justify-end gap-3 mt-4">
                                   <button
                                        type="button"
                                        onClick={() => addStaffModalRef.current.close()}
                                        className="btn btn-outline"
                                   >
                                        Cancel
                                   </button>
                                   <button type="submit" className="btn btn-primary">
                                        Create Staff
                                   </button>
                              </div>
                         </form>
                    </div>
               </dialog>



          </>
     );
};

export default ManageStaff;