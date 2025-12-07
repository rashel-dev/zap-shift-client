import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ["parcels", user.email, "driver_assigned"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/riders?riderEmail=${user.email}&deliveryStatus=parcel_delivered`);
            return res.data;
        },
    });

    const calculatePayout = (parcel) => {
        if (parcel.senderAddress === parcel.receiverAddress) {
            return parcel.cost * 0.8;
        }else{
            return parcel.cost * 0.6;
        }
    };

    return (
        <div className="m-4 text-3xl font-bold">
            <h2>Completed Deliveries: {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Pickup Location</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.senderAddress}</td>
                                <td>{parcel.cost}</td>
                                <td>{calculatePayout(parcel).toFixed(2)}</td>
                                <td>
                                    <button className="btn btn-sm btn-primary text-black">CashOut</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;
