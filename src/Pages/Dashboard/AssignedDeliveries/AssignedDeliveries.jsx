import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ["parcels", user.email, "driver_assigned"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/riders?riderEmail=${user.email}&deliveryStatus=driver_assigned`);
            return res.data;
        },
    });

    const handleAcceptDelivery = (parcel, status) => {
        const statusInfo = {
            deliveryStatus: status,
        }

        let message = `Parcel status is updated to ${status.split("_").join(" ")}`;
        
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
         .then(res => {
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    title: "Success",
                    text: message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                })
                refetch();
            }
         })
    }

    return (
        <div className="m-4">
            <h2 className="text-3xl font-bold">Parcels Pending Pickup: {parcels.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Actions</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td>{index + 1}</td>
                                <td>{parcel.parcelName}</td>
                                <td className="flex gap-2">
                                    {parcel.deliveryStatus === "driver_assigned" ? (
                                        <>
                                            <button onClick={() => handleAcceptDelivery(parcel, "rider_arriving")} className="btn btn-sm btn-primary text-black">
                                                Accept
                                            </button>
                                            <button className="btn btn-sm btn-warning text-black">Reject</button>
                                        </>
                                    ) : (
                                        <span>Parcel Accepted</span>
                                    )}
                                </td>
                                <td className="space-x-2">
                                    <button onClick={() => handleAcceptDelivery(parcel, "picked_up")} className="btn btn-sm btn-primary text-black">Mark as Picked Up</button>
                                    <button onClick={() => handleAcceptDelivery(parcel, "parcel_delivered")}className="btn btn-sm btn-primary text-black">Mark as Delivered</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDeliveries;
