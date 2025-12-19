import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageUser = () => {
     const axiosSecure = useAxiosSecure();
     const { data: users = [], refetch, isLoading } = useQuery({
          queryKey: ['citizens'],
          queryFn: async () => {
               const res = await axiosSecure.get('/users/citizens');
               return res.data;
          }
     });

     const handleBlockToggle = (user) => {
          Swal.fire({
               title: `Are you sure?`,
               text: user.isBlocked
                    ? "You want to unblock this user?"
                    : "You want to block this user?",
               icon: "warning",
               showCancelButton: true,
               confirmButtonText: "Yes"
          }).then(async (result) => {
               if (result.isConfirmed) {
                    await axiosSecure.patch(`/users/block/${user._id}`, {
                         isBlocked: !user.isBlocked
                    });
                    refetch();
                    Swal.fire("Updated!", "User status changed.", "success");
               }
          });
     };


     const viewSubscription = async (email) => {
          const res = await axiosSecure.get(`/payments/user/${email}`);
          if (res.data) {
               Swal.fire({
                    title: "Subscription Info",
                    html: `
        <p>Amount: ${res.data.amount} BDT</p>
        <p>Status: ${res.data.paymentStatus}</p>
        <p>Paid At: ${new Date(res.data.paidAt).toLocaleString()}</p>
      `
               });
          } else {
               Swal.fire("No Subscription Found");
          }
     };



     if (isLoading) {
          return <Loading></Loading>
     }

     return (
          <div className="w-full">

               {/* EMPTY STATE */}
               {
                    users.length === 0 ? (
                         <div className="text-center min-h-screen flex justify-center items-center text-gray-500 text-xl md:text-4xl">
                              ❌ No users found
                         </div>
                    ) : (
                         <>
                              {/* ===================== */}
                              {/* DESKTOP & TABLET TABLE */}
                              {/* ===================== */}
                              <div className="hidden md:block overflow-x-auto">
                                   <table className="table table-zebra w-full">
                                        <thead>
                                             <tr>
                                                  <th>User</th>
                                                  <th>Email</th>
                                                  <th>Subscription</th>
                                                  <th>Status</th>
                                                  <th>Action</th>
                                                  <th>Payment Info</th>
                                             </tr>
                                        </thead>

                                        <tbody>
                                             {users.map(user => (
                                                  <tr key={user._id}>
                                                       {/* USER */}
                                                       <td>
                                                            <div className="  lg:flex items-center gap-3">
                                                                 <img
                                                                      src={user.photoURL}
                                                                      className="w-10 h-10  hidden lg:block rounded-full object-cover"
                                                                      alt="user"
                                                                 />
                                                                 <div>
                                                                      <p className="font-semibold">Tanvir</p>
                                                                 </div>
                                                            </div>
                                                       </td>

                                                       {/* EMAIL */}
                                                       <td className="font-medium">{user.email}</td>

                                                       {/* SUBSCRIPTION */}
                                                       <td>
                                                            {user.isPremium ? (
                                                                 <span className="bg-amber-100 px-3 py-1 rounded-full text-yellow-800 text-sm">
                                                                      Premium
                                                                 </span>
                                                            ) : (
                                                                 <span className="bg-lime-300 px-3 py-1 rounded-full text-emerald-900 text-sm">
                                                                      Free
                                                                 </span>
                                                            )}
                                                       </td>

                                                       {/* STATUS */}
                                                       <td>
                                                            {user.isBlocked ? (
                                                                 <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-800 text-sm">
                                                                      Blocked
                                                                 </span>
                                                            ) : (
                                                                 <span className="bg-green-600 px-3 py-1 rounded-full text-white text-sm">
                                                                      Active
                                                                 </span>
                                                            )}
                                                       </td>

                                                       {/* ACTION */}
                                                       <td>
                                                            <button
                                                                 onClick={() => handleBlockToggle(user)}
                                                                 className={`btn btn-sm ${user.isBlocked ? 'btn-success' : 'btn-error'
                                                                      }`}
                                                            >
                                                                 {user.isBlocked ? 'Unblock' : 'Block'}
                                                            </button>
                                                       </td>

                                                       {/* PAYMENT */}
                                                       <td>
                                                            <button
                                                                 className="btn btn-sm btn-primary"
                                                                 onClick={() => viewSubscription(user.email)}
                                                            >
                                                                  Subscription
                                                            </button>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>

                              {/* ===================== */}
                              {/* MOBILE CARD VIEW */}
                              {/* ===================== */}
                              <div className="md:hidden space-y-4">
                                   {users.map(user => (
                                        <div
                                             key={user._id}
                                             className="bg-base-100 shadow rounded-xl p-4 space-y-3"
                                        >
                                             {/* USER */}
                                             <div className="flex items-center gap-3">
                                                  <img
                                                       src={user.photoURL}
                                                       className="w-12 h-12 rounded-full object-cover"
                                                       alt="user"
                                                  />
                                                  <div>
                                                       <p className="font-bold">{user.displayName}</p>
                                                       <p className="text-sm text-gray-500">{user.email}</p>
                                                  </div>
                                             </div>

                                             {/* SUBSCRIPTION */}
                                             <div className="flex justify-between">
                                                  <span className="font-semibold">Subscription:</span>
                                                  {user.isPremium ? (
                                                       <span className="text-yellow-700 font-medium">Premium</span>
                                                  ) : (
                                                       <span className="text-emerald-700 font-medium">Free</span>
                                                  )}
                                             </div>

                                             {/* STATUS */}
                                             <div className="flex justify-between">
                                                  <span className="font-semibold">Status:</span>
                                                  {user.isBlocked ? (
                                                       <span className="text-gray-600">Blocked</span>
                                                  ) : (
                                                       <span className="text-green-600">Active</span>
                                                  )}
                                             </div>

                                             {/* ACTION BUTTONS */}
                                             <div className="flex gap-2 pt-2">
                                                  <button
                                                       onClick={() => handleBlockToggle(user)}
                                                       className={`btn btn-sm flex-1 ${user.isBlocked ? 'btn-success' : 'btn-error'
                                                            }`}
                                                  >
                                                       {user.isBlocked ? 'Unblock' : 'Block'}
                                                  </button>

                                                  <button
                                                       onClick={() => viewSubscription(user.email)}
                                                       className="btn btn-sm btn-primary flex-1"
                                                  >
                                                       Subscription
                                                  </button>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </>
                    )
               }
          </div>

     );
};

export default ManageUser;