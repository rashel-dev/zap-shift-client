import React from "react";
import { FaTruck, FaHome, FaWarehouse, FaUndoAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { GiFactory } from "react-icons/gi";

const services = [
    {
        title: "Express & Standard Delivery",
        desc: "We deliver parcels within 24–72 hours in Dhaka, Chattogram, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: <FaTruck className="text-4xl text-[#004B50]" />,
    },
    {
        title: "Nationwide Delivery",
        desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: <MdLocalShipping className="text-4xl text-[#004B50]" />,
        highlight: true,
    },
    {
        title: "Fulfillment Solution",
        desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        icon: <GiFactory className="text-4xl text-[#004B50]" />,
    },
    {
        title: "Cash on Home Delivery",
        desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: <FaHome className="text-4xl text-[#004B50]" />,
    },
    {
        title: "Corporate Service / Contract In Logistics",
        desc: "Customized corporate services which includes warehouse and inventory management support.",
        icon: <FaWarehouse className="text-4xl text-[#004B50]" />,
    },
    {
        title: "Parcel Return",
        desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: <FaUndoAlt className="text-4xl text-[#004B50]" />,
    },
];

export default function OurServices() {
    return (
        <section className="py-16 bg-[#003C3F] rounded-3xl mx-4">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-white mb-4">Our Services</h2>
                <p className="text-center text-gray-200 max-w-2xl mx-auto mb-12">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((item, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-2xl shadow-sm border transition-all duration-300 cursor-pointer hover:shadow-md hover:scale-[1.02] hover:bg-primary bg-gray-100 skeleton`}
                        >
                            <div className="flex flex-col items-start text-center gap-3">
                                <div className="w-14 h-14 bg-[#EAF5F5] rounded-full flex items-center justify-center mx-auto">{item.icon}</div>
                                <h3 className="font-semibold text-lg text-[#004B50] mx-auto">{item.title}</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
