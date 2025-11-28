import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router";

const PaymentCancelled = () => {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-base-100 rounded-xl shadow-2xl p-8 text-center transform transition-all hover:scale-105 duration-300">
                <div className="flex justify-center mb-6">
                    <FaTimesCircle className="text-6xl text-error animate-pulse" />
                </div>

                <h2 className="text-3xl font-extrabold text-base-content mb-2">Payment Cancelled</h2>

                <p className="text-base-content/70 mb-8">Your payment process was cancelled. No charges were made. You can try again or return to the dashboard.</p>

                <div className="space-y-3">
                    <Link to="/dashboard/my-parcels" className="btn btn-primary w-full text-black font-bold shadow-lg hover:shadow-xl transition-all">
                        Try Again
                    </Link>

                    <Link to="/" className="btn btn-ghost w-full">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;
