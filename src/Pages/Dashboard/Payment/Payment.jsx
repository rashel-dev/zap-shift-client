import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { GridLoader } from 'react-spinners';

const Payment = () => {
    // in the router we create a router name /parcels/:parcelId . Thats why we will get a id here. we can access this by useParams().
    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure(); 

    const {data: parcel, isLoading} = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })
    if(isLoading){
        return (
            <div className="flex justify-center items-center h-screen">
                <GridLoader color="#12ff00"></GridLoader>
            </div>
        );
        
    }
    
    return (
        <div>
            <h2>{parcel.parcelName}</h2>
            
        </div>
    );
};

export default Payment;