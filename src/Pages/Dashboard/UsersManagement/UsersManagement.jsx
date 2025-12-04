import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            // console.log(res.data);
            return res.data;
        },
    });

    const handleMakeUserAdmin = (user) => {
        const roleInfo = { role: "admin" };
        axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    title: "Succeed",
                    text: `${user.name} Marked as Admin Successfully`,
                    icon: "success",
                    timer: 2500,
                    confirmButtonColor: "#3085d6",
                });
            }
        });
    };

    const handleRemoveAdmin = (user) => {
        const roleInfo = { role: "user" };
        axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    title: "Succeed",
                    text: `${user.name} Removed from Admin Successfully`,
                    icon: "success",
                    timer: 2500,
                    confirmButtonColor: "#3085d6",
                });
            }
        });
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="m-4">
            <h2 className="text-3xl font-bold">Total Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Actions</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td className={`${user.role === "rider" && "text-red-500"}`}>{user.role}</td>
                                <td className="space-x-2">
                                    {user.role === "admin" ? (
                                        <button onClick={() => handleRemoveAdmin(user)}className="btn btn-sm bg-red-500" title="Remove from admin">
                                            <FiShieldOff></FiShieldOff>
                                        </button>
                                    ) : (
                                        <button onClick={() => handleMakeUserAdmin(user)}className="btn btn-sm bg-green-500" title="make admin">
                                            <FaUserShield></FaUserShield>
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;
