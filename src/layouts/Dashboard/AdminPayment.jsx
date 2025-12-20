import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/Loading/Loading';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFcomponent from '../../pages/IssueALL/PDFcomponent';




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
               <div className='overflow-x-auto' >
                    <table className=" mt-4 table table-zebra min-w-[600px] space-y-3.5 ">
                         <thead>
                              <tr>
                                   <th>#</th>
                                   <th>Email</th>
                                   <th>Type</th>
                                   <th>Amount</th>
                                   <th className='hidden md:table-cell' >Transaction</th>
                                   <th>  Invoice</th>
                                   <th className='hidden md:table-cell' >Paid At</th>
                              </tr>
                         </thead>
                         <tbody>
                              {
                                   payments.map((pay, index) => (
                                        <tr key={pay._id}>
                                             <td>{index + 1}</td>
                                             <td className='max-w-[150px] truncate' >{pay.customerEmail}</td>
                                             <td className='max-w-[220px] truncate' >
                                                  <span className={`badge ${pay.paymentType === 'premium' ? 'bg-amber-300 text-amber-700 rounded-2xl p-2 ' : 'bg-green-300 text-green-700 border border-green-100 rounded-2xl p-2'}`}>
                                                       {pay.paymentType}
                                                  </span>
                                             </td>
                                             <td className='max-w-[220px] truncate' >{pay.amount} {pay.currency.toUpperCase()}</td>
                                             <td className='hidden md:table-cell capitalize' >{pay.transactionId}</td>
                                             <td className=' max-w-[150px] truncate ' >

                                                  <PDFDownloadLink
                                                       document={<PDFcomponent payment={pay} />}
                                                       fileName={`invoice-${pay.transactionId}.pdf`}
                                                  >
                                                       {({ loading }) =>
                                                            loading ? (
                                                                 <button className="btn btn-sm btn-disabled">Loading...</button>
                                                            ) : (
                                                                 <button className="btn btn-sm btn-primary">Download</button>
                                                            )
                                                       }
                                                  </PDFDownloadLink>
                                             </td>
                                             <td className='hidden md:table-cell capitalize ' >{new Date(pay.paidAt).toLocaleString()}</td>
                                        </tr>
                                   ))
                              }
                         </tbody>
                    </table>
               </div>
               


          </div>
     );
};

export default AdminPayment;