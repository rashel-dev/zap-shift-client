import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const SendParcel = () => {
    const {
        register,
        handleSubmit,
        control,
        // formState: { errors },
    } = useForm();

    const { user } = useAuth();
    console.log(user);

    const axiosSecure = useAxiosSecure();

    // loading services centers regions from json
    const serviceCenters = useLoaderData();
    const regionsWithDuplicate = serviceCenters.map((serviceCenter) => serviceCenter.region);
    const regions = [...new Set(regionsWithDuplicate)];

    const senderRegion = useWatch({ control, name: "senderRegion" });
    const receiverRegion = useWatch({ control, name: "receiverRegion" });

    //get all the district by their region
    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter((serviceCenter) => serviceCenter.region === region);
        const districts = regionDistricts.map((d) => d.district);
        return districts;
    };

    const handleSendParcel = (data) => {
        console.log(data);
        const isDocument = data.parcelType === "document";
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);
        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        } else {
            if (parcelWeight <= 3) {
                cost = isSameDistrict ? 110 : 150;
            } else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }

        Swal.fire({
            title: "Are you sure to send this parcel?",
            text: `You will be charged ${cost} Taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I agree!",
        }).then((result) => {
            if (result.isConfirmed) {
                //save the parcel info to the database
                axiosSecure
                    .post("/parcels", data)
                    .then((res) => {
                        console.log("after saving parcel to the database", res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                Swal.fire({
                    title: "Your parcel has been sent successfully",
                    text: "",
                    icon: "success",
                });
            }
        });
    };

    return (
        <div className="w-full bg-[#F8F9FA] py-10 px-4 md:px-10">
            <div className="max-w-6xl mx-auto bg-white shadow rounded-2xl p-8">
                <h1 className="text-3xl font-bold mb-6">Send A Parcel</h1>
                <p className="font-medium mb-6">Enter your parcel details</p>
                <form onSubmit={handleSubmit(handleSendParcel)}>
                    {/* Parcel Type */}
                    <div className="flex items-center gap-6 mb-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="document"
                                {...register("parcelType")}
                                defaultChecked
                                className="radio bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600"
                            />{" "}
                            Document
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="non-document"
                                {...register("parcelType")}
                                className="radio bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600"
                            />{" "}
                            Not-Document
                        </label>
                    </div>

                    {/* Parcel Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Parcel Name</label>
                            <input placeholder="Parcel Name" {...register("parcelName")} className="border rounded-lg p-3 w-full" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium">Parcel Weight (KG)</label>
                            <input type="number" placeholder="Parcel Weight (KG)" {...register("parcelWeight")} className="border rounded-lg p-3 w-full" />
                        </div>
                    </div>

                    {/* Sender & Receiver  */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Sender */}
                        <div>
                            <h2 className="font-semibold mb-4">Sender Details</h2>
                            <div className="grid gap-4">
                                <input placeholder="Sender Name" {...register("senderName")} className="border p-3 rounded-lg" defaultValue={user?.displayName} />
                                <input placeholder="Sender Email" {...register("senderEmail")} className="border p-3 rounded-lg" defaultValue={user?.email} />

                                {/* sender region */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Sender Regions</legend>
                                    <select {...register("senderRegion")} defaultValue="Pick a region" className="select w-full rounded-lg">
                                        <option disabled={true}>Pick a region</option>
                                        {regions.map((region, index) => (
                                            <option key={index} value={region}>
                                                {region}
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>

                                {/* sender district */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Sender District</legend>
                                    <select {...register("senderDistrict")} defaultValue="Pick a district" className="select w-full rounded-lg">
                                        <option disabled={true}>Pick a District</option>
                                        {districtsByRegion(senderRegion).map((district, index) => (
                                            <option key={index} value={district}>
                                                {district}
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>

                                <input placeholder="Address" {...register("senderAddress")} className="border p-3 rounded-lg" />
                                <input placeholder="Sender Phone No" {...register("senderPhone")} className="border p-3 rounded-lg" />
                                <textarea {...register("pickupInstruction")} placeholder="Pickup Instruction" className="border p-3 rounded-lg h-24"></textarea>
                            </div>
                        </div>

                        {/* Receiver */}
                        <div>
                            <h2 className="font-semibold mb-4">Receiver Details</h2>
                            <div className="grid gap-4">
                                <input placeholder="Receiver Name" {...register("receiverName")} className="border p-3 rounded-lg" />
                                <input placeholder="Receiver Email" {...register("receiverEmail")} className="border p-3 rounded-lg" />

                                {/* receiver region */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Receiver Regions</legend>
                                    <select {...register("receiverRegion")} defaultValue="Pick a region" className="select w-full rounded-lg">
                                        <option disabled={true}>Pick a region</option>
                                        {regions.map((region, index) => (
                                            <option key={index} value={region}>
                                                {region}
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>

                                {/* receiver district */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Receiver District</legend>
                                    <select {...register("receiverDistrict")} defaultValue="Pick a district" className="select w-full rounded-lg">
                                        <option disabled={true}>Pick a District</option>
                                        {districtsByRegion(receiverRegion).map((district, index) => (
                                            <option key={index} value={district}>
                                                {district}
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>

                                <input placeholder="Receiver Address" {...register("receiverAddress")} className="border p-3 rounded-lg" />
                                <input placeholder="Receiver Contact No" {...register("receiverPhone")} className="border p-3 rounded-lg" />
                                <textarea placeholder="Delivery Instruction" {...register("deliveryInstruction")} className="border p-3 rounded-lg h-24"></textarea>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-6">* PickUp Time 4pm-7pm Approx.</p>

                    <button type="submit" className="mt-6 bg-[#B9D86D] text-black font-semibold px-6 py-3 rounded-lg">
                        Proceed to Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendParcel;
