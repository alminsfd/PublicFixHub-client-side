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
          <div>
               {
                    users.length === 0 ? (<div className="text-center  md:text-4xl min-h-screen  text-gray-500 flex justify-center items-center md:py-10">
                         ❌ No issues found</div>) : (
                         <table className="table table-zebra">
                              <thead>
                                   <tr>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Subscription</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        <th>paymentInfo</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        users.map(user => (
                                             <tr key={user._id}>
                                                  <td className="flex items-center gap-2">
                                                       <img src={user.photoURL} className="w-10 rounded-full" />
                                                       <div className='flex flex-col' >
                                                            <small className='font-bold' >name</small>
                                                            <small> {user.displayName}</small>
                                                       </div>
                                                  </td>
                                                  <td className='font-bold' >{user.email}</td>
                                                  <td>
                                                       {user.isPremium ?
                                                            <span className="bg-amber-100 px-2 py-1 rounded-2xl text-yellow-800">Premium</span> :
                                                            <span className="bg-lime-300 text-emerald-900 px-2 py-1 rounded-2xl ">Free</span>
                                                       }
                                                  </td>
                                                  <td>
                                                       {user.isBlocked ?
                                                            <span className="bg-gray-200 px-2 py-1 rounded-2xl  text-gray-950">Blocked</span> :
                                                            <span className="bg-green-600 text-white  px-2 py-1 rounded-2xl  ">Active</span>
                                                       }
                                                  </td>
                                                  <td>
                                                       <button
                                                            onClick={() => handleBlockToggle(user)}
                                                            className={`btn btn-xs ${user.isBlocked ? 'btn-success' : 'btn-error'}`}
                                                       >
                                                            {user.isBlocked ? 'Unblock' : 'Block'}
                                                       </button>
                                                  </td>
                                                  <td>
                                                       <button
                                                            className="btn btn-xs btn-primary"
                                                            onClick={() => viewSubscription(user.email)}
                                                       >
                                                            View Subscription
                                                       </button>

                                                  </td>
                                             </tr>
                                        ))
                                   }
                              </tbody>
                         </table>)
               }

          </div>
     );
};

export default ManageUser;