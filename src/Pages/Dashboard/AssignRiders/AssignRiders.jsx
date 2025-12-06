import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssignRiders = () => {
    const [selectedParcel, setSelectedParcel] = useState(null);

    const axiosSecure = useAxiosSecure();

    const riderModalRef = useRef();

    const { data: parcels = [] } = useQuery({
        queryKey: ["parcels", "pending-pickup"],
        queryFn: async () => {
            const res = await axiosSecure.get("/parcels?deliveryStatus=pending-pickup");
            return res.data;
        },
    });

    // console.log(selectedParcel);

    const { data: riders = [] } = useQuery({
        queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&riderDistrict=${selectedParcel.senderDistrict}&workStatus=available`);
            return res.data;
        },
    });

    const openAssignRiderModal = (parcel) => {
        setSelectedParcel(parcel);

        riderModalRef.current.showModal();
    };

    return (
        <div className="m-4">
            <h2 className="text-3xl font-bold">Assign Riders: {parcels.length} </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Created At</th>
                            <th>Pickup Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.senderAddress}</td>
                                <td>
                                    <button onClick={() => openAssignRiderModal(parcel)} className="btn btn-sm btn-primary text-black">
                                        Assign Rider
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* modal  */}
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Available Riders: {riders.length}</h3>
                    <div className="py-4">
                        {riders.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>District</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {riders.map((rider) => (
                                            <tr key={rider._id}>
                                                <td>{rider.name}</td>
                                                <td>{rider.riderDistrict}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary text-black">
                                                        Assign
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-red-500">No available riders found in this district.</p>
                        )}
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;
