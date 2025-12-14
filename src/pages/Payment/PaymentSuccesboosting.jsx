import React from 'react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useEffect } from 'react';

const PaymentSuccesboosting = () => {
     const [searchParams] = useSearchParams();
     const [paymentInfo, setPaymentInfo] = useState({});
     const sessionId = searchParams.get('session_id');
     const axiosSecure = useAxiosSecure();
     console.log(paymentInfo)
     useEffect(() => {
          if (sessionId) {
               axiosSecure.patch(`/payment-success/boosting?session_id=${sessionId}`)
                    .then(res => {
                         setPaymentInfo({
                              transactionId: res.data.transactionId,
                              trackingId: res.data.trackingId
                         })
                    })
          }

     }, [sessionId, axiosSecure])

     

     return (

          <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
               <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center space-y-3">

                         {/* Success Icon */}
                         <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   className="h-8 w-8 text-success"
                                   fill="none"
                                   viewBox="0 0 24 24"
                                   stroke="currentColor"
                              >
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                         </div>

                         {/* Title */}
                         <h2 className="text-3xl font-bold text-success">
                              Payment Successful
                         </h2>

                         {/* Info */}
                         <div className="bg-base-200 rounded-lg p-4 w-full text-left space-y-2 text-sm">
                              <p>
                                   <span className="font-semibold">Transaction ID:</span><br />
                                   <span className="break-all">{paymentInfo.transactionId}</span>
                              </p>
                              <p>
                                   <span className="font-semibold">Tracking ID:</span><br />
                                   <span className="break-all">{paymentInfo.trackingId}</span>
                              </p>
                         </div>

                         {/* Button */}
                         <Link
                              to="/dashboard/my-issue"
                              className="btn btn-success w-full"
                         >
                              Go Back
                         </Link>
                    </div>
               </div>
          </div>

     );
};

export default PaymentSuccesboosting;