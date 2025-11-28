import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GridLoader } from "react-spinners";

const Payment = () => {
    // in the router we create a router name /parcels/:parcelId . Thats why we will get a id here. we can access this by useParams().
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: parcel, isLoading } = useQuery({
        queryKey: ["parcels", parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        },
    });

    const handlePayment = async () => {
        const paymentInfo = {
            parcelId: parcel._id,
            cost: parcel.cost,
            parcelName: parcel.parcelName,
            senderEmail: parcel.senderEmail,
        };

        const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
        if(res.data.url){
            window.location.href = res.data.url;
        }
        console.log(res.data);
    };

    // const handlePayment = async () => {
    //     const paymentInfo = {
    //         parcelId: parcel._id,
    //         cost: parcel.cost,
    //         parcelName: parcel.parcelName,
    //         senderEmail: parcel.senderEmail,
    //         senderName: parcel.senderName,
    //     };

    //     try {
    //         const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    //         if (res.data.url) {
    //             window.location.href = res.data.url;
    //         }
    //     } catch (error) {
    //         console.error("Payment Error: ", error);
    //     }
    // };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <GridLoader color="#12ff00"></GridLoader>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-base-100 p-10 rounded-xl shadow-2xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-base-content">Complete Payment</h2>
                    <p className="mt-2 text-sm text-base-content/70">Secure payment for your parcel delivery</p>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="bg-base-200 p-6 rounded-lg space-y-4">
                        <div className="flex justify-between items-center border-b border-base-300 pb-2">
                            <span className="text-base-content/70 font-medium">Parcel Name</span>
                            <span className="text-base-content font-bold">{parcel.parcelName}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-base-300 pb-2">
                            <span className="text-base-content/70 font-medium">Parcel Type</span>
                            <span className="badge badge-primary font-bold text-black uppercase text-xs">{parcel.parcelType}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-base-300 pb-2">
                            <span className="text-base-content/70 font-medium">Receiver Name</span>
                            <span className="text-base-content font-bold">{parcel.receiverName}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-base-300 pb-2">
                            <span className="text-base-content/70 font-medium">Receiver Phone</span>
                            <span className="text-base-content font-bold">{parcel.receiverPhone}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-base-300 pb-2">
                            <span className="text-base-content/70 font-medium">Delivery Address</span>
                            <span className="text-base-content font-bold text-right truncate w-48">{parcel.receiverAddress}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-lg font-bold text-secondary">Total Cost</span>
                            <span className="text-2xl font-extrabold text-secondary">${parcel.cost}</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        className="group text-black font-bold relative w-full flex justify-center py-3 px-4 border border-transparent text-sm rounded-md  bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:-translate-y-1 shadow-lg cursor-pointer"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
