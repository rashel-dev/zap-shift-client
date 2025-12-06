import React from 'react';
import { GridLoader } from "react-spinners";

const GridLoading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <GridLoader color="#12ff00"></GridLoader>
        </div>
    );
};

export default GridLoading;