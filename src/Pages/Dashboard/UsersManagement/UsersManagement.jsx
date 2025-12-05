import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState("");

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            // console.log(res.data);
            return res.data;
        },
    });

    const handleMakeAdmin = (user) => {
        const roleInfo = { role: "admin" };
        Swal.fire({
            title: "Are you sure to make this user admin?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
                    // console.log(res.data);
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
            }
        });
    };

    const handleRemoveAdmin = (user) => {
        const roleInfo = { role: "user" };
        Swal.fire({
            title: "Are you sure to remove this user from admin?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove admin!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
                    // console.log(res.data);
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
        });
    };

    return (
        <div className="m-4">
            <h2 className="text-3xl font-bold">Total Users: {users.length}</h2>

            {/* search box  */}

            <div className="my-4 mx-auto text-center">
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={(e) => setSearchText(e.target.value)} type="search" required placeholder="Search user" />
                </label>
            </div>

            {/* table  */}

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
                                        <button onClick={() => handleRemoveAdmin(user)} className="btn btn-sm bg-red-500" title="Remove from admin">
                                            <FiShieldOff></FiShieldOff>
                                        </button>
                                    ) : (
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm bg-green-500" title="make admin">
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
