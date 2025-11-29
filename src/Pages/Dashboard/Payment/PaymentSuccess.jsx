import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();

    const sessionId = searchParams.get("session_id");
    // console.log(sessionId);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            })
        }
    },[sessionId, axiosSecure])

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-base-100 rounded-xl shadow-2xl p-8 text-center transform transition-all hover:scale-105 duration-300">
                <div className="flex justify-center mb-6">
                    <FaCheckCircle className="text-6xl text-success animate-bounce" />
                </div>

                <h2 className="text-3xl font-extrabold text-base-content mb-2">Payment Successful!</h2>

                <p className="text-base-content/70 mb-8">Thank you for your payment. Your transaction has been completed successfully and your parcel is being processed.</p>

                <div className="space-y-3">
                    <Link to="/dashboard/my-parcels" className="btn btn-primary w-full text-black font-bold shadow-lg hover:shadow-xl transition-all">
                        View My Parcels
                    </Link>

                    <Link to="/" className="btn btn-ghost w-full">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
