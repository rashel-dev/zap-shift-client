import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user } = useAuth();
    const AxiosSecure = useAxiosSecure();

    const { data: role = "user", isLoading:roleLoading } = useQuery({
        queryKey: ["user-role", user.email],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/users/${user.email}/role`);
            return res.data.role;
        },
    });
    return { role, roleLoading };
};

export default useRole;
