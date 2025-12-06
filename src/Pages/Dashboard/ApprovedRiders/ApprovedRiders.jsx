import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrash, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";

const ApprovedRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);

    const { refetch, data: riders = [] } = useQuery({
        queryKey: ["riders", "pedding"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders");
            return res.data;
        },
    });

    const updateRiderStatus = (status, rider) => {
        const id = rider._id;
        const email = rider.email;
        const updateInfo = { status: status, email: email };
        axiosSecure.patch(`/riders/${id}`, updateInfo).then((res) => {
            if (res.data.modifiedCount > 0) {
                toast.success(`Rider status updated to ${status}`);
                refetch();
            }
        });
    };

    const handleApproval = (rider) => {
        // console.log(id)
        updateRiderStatus("approved", rider);
    };

    const handleReject = (rider) => {
        updateRiderStatus("rejected", rider);
    };

    const handleViewDetails = (rider) => {
        setSelectedRider(rider);
        document.getElementById("my_modal_3").showModal();
    };

    return (
        <div className="m-4">
            <ToastContainer />
            <h2 className="text-3xl font-bold">Riders Pending Approval: {riders?.length}</h2>

            <div className="overflow-x-auto mt-4">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Application Status</th>
                            <th>Work Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders?.map((rider, index) => (
                            <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.riderDistrict}</td>
                                <td className={`font-bold ${rider.status === "approved" ? "text-green-500" : rider.status === "rejected" ? "text-red-500" : "text-yellow-500"}`}>{rider.status}</td>
                                <td>{rider.workStatus}</td>
                                <td className="flex gap-4">
                                    <button onClick={() => handleViewDetails(rider)} className="btn btn-sm btn-secondary">
                                        <FaEye />
                                        Details
                                    </button>
                                    <button onClick={() => handleApproval(rider)} className="btn btn-sm btn-success">
                                        <FaUserCheck />
                                        Approve
                                    </button>
                                    <button onClick={() => handleReject(rider)} className="btn btn-sm btn-warning">
                                        <IoPersonRemove />
                                        Reject
                                    </button>
                                    <button className="btn btn-sm btn-error">
                                        <FaTrash />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/*-----------modal-------------------*/}

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {selectedRider && (
                        <>
                            <h3 className="font-bold text-lg">Rider Details</h3>
                            <div className="py-4 space-y-2">
                                <p>
                                    <strong>Name:</strong> {selectedRider.name}
                                </p>
                                <p>
                                    <strong>Email:</strong> {selectedRider.email}
                                </p>
                                <p>
                                    <strong>District:</strong> {selectedRider.riderDistrict}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span className={`font-bold ${selectedRider.status === "approved" ? "text-green-500" : selectedRider.status === "rejected" ? "text-red-500" : "text-yellow-500"}`}>
                                        {selectedRider.status}
                                    </span>
                                </p>
                            </div>
                        </>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ApprovedRiders;
