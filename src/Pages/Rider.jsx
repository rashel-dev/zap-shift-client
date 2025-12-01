import React, { useCallback } from "react";
import agent_pending from "../assets/agent-pending.png";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
    const { register, handleSubmit, control } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // loading services centers regions from json
    const serviceCenters = useLoaderData();
    const regionsWithDuplicate = serviceCenters.map((serviceCenter) => serviceCenter.region);
    const regions = [...new Set(regionsWithDuplicate)];

    const riderRegion = useWatch({ control, name: "riderRegion", defaultValue: "" });

    //get all the district by their region
    const districtsByRegion = useCallback(
        (region) => {
            const regionDistricts = serviceCenters.filter((serviceCenter) => serviceCenter.region === region);
            const districts = regionDistricts.map((d) => d.district);
            return districts;
        },
        [serviceCenters]
    );

    const handleRiderApplication = (data) => {
        // console.log(data);
        axiosSecure.post("/riders", data)
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Succeed",
                        text: "Your application has been submitted successfully. We will contact you soon.",
                        icon: "success",
                        timer: 2500,
                        confirmButtonColor: "#3085d6",
                    });
                } else {
                    Swal.fire({
                        title: "Already Applied",
                        text: "You have already submitted an application. Please wait for approval.",
                        icon: "warning",
                        confirmButtonColor: "#3085d6",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex gap-8 p-8 bg-white">
            {/* left div  */}
            <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-secondary">Be A Rider</h2>
                <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>

                <h3 className="text-2xl font-bold mt-8 text-secondary">Tell us about yourself</h3>
                <form onSubmit={handleSubmit(handleRiderApplication)} className="w-full max-w-xl bg-base-100 py-6 rounded-2xl space-y-4">
                    <label className="flex flex-col gap-1">
                        Your Name
                        <input {...register("name")} type="text" placeholder="Your Name" className="input w-full" defaultValue={user?.displayName} readOnly={true} />
                    </label>
                    <label className="flex flex-col gap-1">
                        Driving License Number
                        <input {...register("drivingLicense")} type="text" placeholder="Driving License Number" className="input w-full" />
                    </label>
                    <label className="flex flex-col gap-1">
                        Your Email
                        <input {...register("email")} type="email" placeholder="Your Email" className="input w-full" defaultValue={user?.email} readOnly={true} />
                    </label>

                    <label className="flex flex-col gap-1">
                        Your Region
                        <select {...register("riderRegion")} defaultValue="Select your Region" className="select w-full">
                            <option disabled={true}>Select your Region</option>
                            {regions.map((region, index) => (
                                <option key={index}>{region}</option>
                            ))}
                        </select>
                    </label>
                    <label className="flex flex-col gap-1">
                        Your District
                        <select {...register("riderDistrict")} defaultValue="Select your District" className="select w-full">
                            <option disabled={true}>Select your District</option>
                            {districtsByRegion(riderRegion).map((district, index) => (
                                <option key={index} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="flex flex-col gap-1">
                        NID No
                        <input {...register("nid")} type="text" placeholder="NID" className="input w-full" />
                    </label>
                    <label className="flex flex-col gap-1">
                        Phone Number
                        <input {...register("phone")} type="text" placeholder="Phone Number" className="input w-full" />
                    </label>
                    <label className="flex flex-col gap-1">
                        Bike Brand Model and Year
                        <input {...register("bikeModel")} type="text" placeholder="Bike Brand Model and Year" className="input w-full" />
                    </label>
                    <label className="flex flex-col gap-1">
                        Bike Registration Number
                        <input {...register("bikeRegistration")} type="text" placeholder="Bike Registration Number" className="input w-full" />
                    </label>
                    <label className="flex flex-col gap-1">
                        Tell Us About Yourself
                        <textarea {...register("aboutRider")} placeholder="Tell Us About Yourself" className="textarea w-full" rows="3"></textarea>
                    </label>
                    <button className="btn bg-primary w-full">Submit</button>
                </form>
            </div>

            {/* right div  */}
            <div className="hidden lg:block lg:w-1/2">
                <img src={agent_pending} alt="Be a rider here" />
            </div>
        </div>
    );
};

export default Rider;
