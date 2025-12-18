import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';


const AdminPayment = () => {
     const [paymentType, setPaymentType] = useState('');
     const axiosSecure = useAxiosSecure();
     const { data: payments = [],  isLoading } = useQuery({
          queryKey: ['payments', paymentType],
          queryFn: async () => {
               const res = await axiosSecure.get(
                    paymentType ? `/payments?type=${paymentType}` : '/payments'
               );
               return res.data;
          }
     });


     if (isLoading) {
          return <Loading></Loading>
     }
     return (
          <div>
               <div className='flex justify-center gap-4 my-4' >

                    <select
                         className="select select-bordered"
                         value={paymentType}
                         onChange={(e) => setPaymentType(e.target.value)}
                    >
                         <option value="" disabled>All Payments</option>
                         <option value="premium">Premium</option>
                         <option value="Boosting">Boosting</option>
                    </select>
               </div>
               <table className="table table-zebra mt-4">
                    <thead>
                         <tr>
                              <th>#</th>
                              <th>Email</th>
                              <th>Type</th>
                              <th>Amount</th>
                              <th>Transaction</th>
                              <th>Paid At</th>
                         </tr>
                    </thead>
                    <tbody>
                         {
                              payments.map((pay, index) => (
                                   <tr key={pay._id}>
                                        <td>{index + 1}</td>
                                        <td>{pay.customerEmail}</td>
                                        <td>
                                             <span className={`badge ${pay.paymentType === 'premium' ? 'badge-success' : 'badge-info'}`}>
                                                  {pay.paymentType}
                                             </span>
                                        </td>
                                        <td>{pay.amount} {pay.currency.toUpperCase()}</td>
                                        <td>{pay.transactionId}</td>
                                        <td>{new Date(pay.paidAt).toLocaleString()}</td>
                                   </tr>
                              ))
                         }
                    </tbody>
               </table>


          </div>
     );
};

export default AdminPayment;