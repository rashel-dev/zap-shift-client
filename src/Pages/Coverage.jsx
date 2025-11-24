import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { FaSearch } from "react-icons/fa";

const Coverage = () => {
    const position = [23.8103, 90.4125];
    const serviceCenters = useLoaderData();
    const mapRef = useRef(null);
    
    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = serviceCenters.find(serviceCenter => serviceCenter.district.toLowerCase().includes(location.toLowerCase()));
        if(district){
            const coord = [district.latitude, district.longitude];
            mapRef.current.flyTo(coord, 10);
        }
        
        }
    
    return (
        <div className="bg-white px-8 py-8 m-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-8">We are available in 64 districts</h2>

            <div>
                <form onSubmit={handleSearch}>
                    <div className="flex items-cente p-2 rounded-md max-w-md mb-8">
                        {/* Icon + Input */}
                        <div className="flex items-center grow bg-gray-200 px-3 py-2 rounded-l-md">
                            <FaSearch className="text-gray-400 mr-2" />
                            <input name="location" type="text" placeholder="Search here" className="bg-transparent text-black placeholder-gray-500 outline-none w-full" />
                        </div>

                        {/* Search Button */}
                        <button className="bg-lime-500 text-black font-semibold px-4 py-2 rounded-r-md hover:bg-lime-400 transition cursor-pointer" type="submit">Search</button>
                    </div>
                </form>
            </div>

            {/* map container  */}
            <div className="border w-full h-[600px] ">
                <MapContainer center={position} zoom={7} scrollWheelZoom={false} className="h-[600px]" ref={mapRef}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {serviceCenters.map((serviceCenter, index) => (
                        <Marker key={index} position={[serviceCenter.latitude, serviceCenter.longitude]}>
                            <Popup>
                                <strong>{serviceCenter.district}</strong> <br />
                                Service Area : {serviceCenter.covered_area.join(", ")}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;
