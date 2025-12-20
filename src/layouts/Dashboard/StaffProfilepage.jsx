import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../components/Loading/Loading';
import Swal from 'sweetalert2';
import { SlBadge } from 'react-icons/sl';

const StaffProfilepage = () => {
     const axiosSecure = useAxiosSecure();
     const [selectedIssue, setSelectedIssue] = useState({});
     const updateModalRef = useRef()
     const { user } = useAuth();
     const { data: staff = [], isLoading, refetch } = useQuery({
          queryKey: ["saffprofile", user?.email],
          queryFn: async () => {
               const res = await axiosSecure.get(`/users/saff?email=${user?.email}`);
               return res.data
          }
     });
     const {
          register,
          handleSubmit,
          reset
     } = useForm({})
     useEffect(() => {
          reset({
               photoURL: staff[0]?.photoURL,
               displayName: staff[0]?.displayName,
               email: staff[0]?.email
          })
     }, [staff, reset])
     if (isLoading) {
       return   <Loading></Loading>
     }
     const onSubmitUpdate = async (data) => {
          updateModalRef.current.close()
       
          const res = await axiosSecure.patch(`/users/${selectedIssue._id}`, data);
          if (res.data.modifiedCount > 0) {
               Swal.fire("Updated!", "profile updated successfully", "success");
               refetch();
          }
     };
     const openEditModal = (user) => {
          setSelectedIssue(user);
          updateModalRef.current.showModal()
     }
   
     return (
          <>
               {

                    staff.map(user =>
                         <div key={user._id} className=" mt-7 md:mt-20 p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
                              <div className="flex items-center space-x-4">
                                   <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="w-16 h-16 rounded-full"
                                   />
                                   <div  >
                                        <h2 className="text-xl  flex gap-1.5 items-center font-bold">
                                             {user.displayName}{" "}

                                             <span className="text-lime-700  text-sm flex items-center justify-start font-semibold gap-1">
                                                  <SlBadge />staff</span>

                                        </h2>
                                        <p className=" wrap-anywhere text-gray-500">{user.email}</p>
                                   </div>
                              </div>

                              {user.isBlocked && (
                                   <div className="p-4 bg-red-100 text-red-700 rounded">
                                        You are blocked. Please contact the authorities.
                                   </div>
                              )}
                              <div className='flex justify-between items-center' >
                                   <button onClick={() => openEditModal(user)} className='button w-full mx-1  py-2 px-3' >update  profile</button>

                              </div>
                         </div>

                    )

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

                              {/* Title */}
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

                              {/* Category */}
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

          </>
     );
};

export default StaffProfilepage;