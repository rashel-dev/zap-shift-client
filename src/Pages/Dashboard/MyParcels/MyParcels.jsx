import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ["myParcels", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        },
    });

    // to delete a specific parcel
    const handleParcelDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/parcels/${id}`)
                    .then((res) => {
                        // console.log(res.data);
                        if (res.data.deletedCount === 1) {
                            // after deleteing a parcel we have to refetch the data to see the updated list. for this we can use refetch function from tanstack query(react query)
                            refetch();
                            Swal.fire({
                                title: "Removed!",
                                text: "Your parcel has been removed.",
                                icon: "success",
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center text-secondary">All of my parcels : {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>
                                    {parcel.paymentStatus === "paid" ? (
                                        <span className="text-green-600 font-bold">Paid</span>
                                    ) : (
                                        <Link to={`/dashboard/payment/${parcel._id}`}>
                                            <button className="btn btn-sm btn-primary text-black ">Pay</button>
                                        </Link>
                                    )}
                                </td>
                                <td>{parcel.deliveryStatus}</td>
                                <td className="flex gap-2">
                                    <button className="btn btn-square hover:bg-primary">
                                        <FaMagnifyingGlass></FaMagnifyingGlass>
                                    </button>
                                    <button className="btn btn-square hover:bg-primary">
                                        <FiEdit></FiEdit>
                                    </button>
                                    <button onClick={() => handleParcelDelete(parcel._id)} className="btn btn-square  hover:bg-primary">
                                        {/* every parcel have an own id. To send this id to the delete function we can do        '(parcel._id)'. Then in the delete function i take this as an id. This like a props driling. we have to send this id because we need to know which parcel want to delete. when we send any parameter we have to make it an arrow function */}
                                        <FaTrashCan></FaTrashCan>
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

export default MyParcels;
