import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";

const ApprovedRiders = () => {
    const axiosSecure = useAxiosSecure();

    const {refetch, data: riders = [] } = useQuery({
        queryKey: ["riders", "pedding"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders");
            return res.data; 
        },
    });

    const updateRiderStatus = (status, rider) => {
        const id = rider._id;
        const email= rider.email;
        const updateInfo = {status: status, email: email}
        axiosSecure.patch(`/riders/${id}`, updateInfo)
        .then(res => {
            if(res.data.modifiedCount > 0){
                toast.success(`Rider status updated to ${status}`);
                refetch();
            }
        })
    }


    const handleApproval = (rider) => {
        // console.log(id)
        updateRiderStatus("approved", rider);
    }

    const handleReject = (rider) => {
        updateRiderStatus("rejected", rider);
    }

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
                            <th>Status</th>
                            <th>District</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders?.map((rider, index) => (
                            <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td className={`font-bold ${rider.status === "approved" ? "text-green-500" : rider.status === "rejected" ? "text-red-500": "text-yellow-500"}`}>{rider.status}</td>
                                <td>{rider.riderDistrict}</td>
                                <td className="flex gap-4">
                                    <button onClick={() => handleApproval(rider)} className="btn btn-sm btn-success">
                                        <FaUserCheck />
                                        Approve
                                    </button>
                                    <button onClick={() => handleReject(rider)}className="btn btn-sm btn-warning">
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
        </div>
    );
};

export default ApprovedRiders;
