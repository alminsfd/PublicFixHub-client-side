import React from 'react';
import { Link } from 'react-router';

const PaymentCencel = () => {
     return (
          <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
               <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center space-y-4">

                         {/* Error Icon */}
                         <div className="w-16 h-16 rounded-full bg-error/20 flex items-center justify-center">
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   className="h-8 w-8 text-error"
                                   fill="none"
                                   viewBox="0 0 24 24"
                                   stroke="currentColor"
                              >
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                         </div>

                         {/* Title */}
                         <h2 className="text-3xl font-bold text-error">
                              Payment Cancelled ❌
                         </h2>

                         {/* Description */}
                         <p className="text-base-content/70">
                              Your payment was cancelled. Please try again to complete your transaction.
                         </p>

                         {/* Button */}
                         <Link to="/dashboard/my-profile" className="w-full">
                              <button className="btn btn-error w-full">
                                   Try Again
                              </button>
                         </Link>

                    </div>
               </div>
          </div>
     );
};

export default PaymentCencel;
