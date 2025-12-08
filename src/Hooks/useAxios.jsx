import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
    baseURL: "https://zap-shift-server-murex.vercel.app",
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
