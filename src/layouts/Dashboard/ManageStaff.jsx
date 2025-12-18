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
          formState: { errors }
     } = useForm({})
     useEffect(() => {
          reset({
               photoURL: allstaffs[0]?.photoURL,
               displayName: allstaffs[0]?.displayName,
               email: allstaffs[0]?.email
          })
     }, [allstaffs, reset])

     const onSubmitUpdate = async (data) => {
          updateModalRef.current.close()
          console.log(data)
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
          <Loading></Loading>
     }
     return (
          <>

               {
                    allstaffs.length === 0 ? (<div className="text-center  md:text-4xl min-h-screen  text-gray-500 flex justify-center items-center md:py-10">
                         ❌ No issues found</div>) : (
                         <table className="table table-zebra">
                              <thead>
                                   <tr>
                                        <th>staff</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Admin action</th>
                                        <th>Add action</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        allstaffs.map(user => (
                                             <tr key={user._id}>
                                                  <td className="flex items-center gap-2">
                                                       <img src={user.photoURL} className="w-10 h-10 rounded-full" />
                                                       <div className='flex flex-col' >
                                                            <small className='font-bold' >name</small>
                                                            <small> {user.displayName}</small>
                                                       </div>
                                                  </td>
                                                  <td className='font-bold' >{user.email}</td>

                                                  <td>
                                                       {user.isBlocked ?
                                                            <span className="bg-gray-200 px-2 py-1 rounded-2xl  text-gray-950">Blocked</span> :
                                                            <span className="bg-green-600 text-white  px-2 py-1 rounded-2xl  ">Active</span>
                                                       }
                                                  </td>
                                                  <td  >
                                                       <button
                                                            onClick={() => handleDelete(user)}
                                                            className={` mr-2  btn-error btn btn-xs `}
                                                       >
                                                            delete
                                                       </button>
                                                       <button
                                                            onClick={() => openEditModal(user)}
                                                            className={`btn  btn-success btn-xs `}
                                                       >
                                                            update
                                                       </button>
                                                  </td>
                                                  <td>
                                                       <button
                                                            className="btn btn-xs btn-primary"
                                                            onClick={() => addStaffModalRef.current.showModal()}
                                                       >
                                                            add staff
                                                       </button>

                                                  </td>
                                             </tr>
                                        ))
                                   }
                              </tbody>
                         </table>)
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

                         <form onSubmit={handleSubmit(onSubmitAddStaff)} className="space-y-3">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                   Name
                              </label>
                              <input {...register("displayName", { required: true })}
                                   placeholder="Name"
                                   className="input input-bordered w-full" />
                              {errors.displayName?.type === "required" && (
                                   <p className='text-red-700 text-sm' > name is required</p>
                              )}
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                   Email
                              </label>
                              <input {...register("email", { required: true })}
                                   placeholder="Email"
                                   className="input input-bordered w-full" />
                              {errors.email?.type === "required" && (
                                   <p className='text-red-700 text-sm' > email is required</p>
                              )}
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                   Phone
                              </label>
                              <input {...register("phone")}
                                   placeholder="Phone"
                                   className="input input-bordered w-full" />
                              {errors.phone?.type === "required" && (
                                   <p className='text-red-700 text-sm' > phone is required</p>
                              )}
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                   Photo URL
                              </label>
                              <input {...register("photoURL")}
                                   placeholder="Photo URL"
                                   className="input input-bordered w-full" />
                              {errors.photoURL?.type === "required" && (
                                   <p className='text-red-700 text-sm' > photo url is required</p>
                              )}
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                   Password
                              </label>
                              <input {...register("password", { required: true })}
                                   type="password"
                                   placeholder="Password"
                                   className="input input-bordered w-full" />
                              {errors.password?.type === "required" && (
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