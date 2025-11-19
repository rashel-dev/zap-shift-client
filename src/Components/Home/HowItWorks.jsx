import React from "react";
import { FaTruck } from "react-icons/fa6";

const items = [
    {
        title: "Booking Pick & Drop",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        title: "Cash On Delivery",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        title: "Delivery Hub",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        title: "Booking SME & Corporate",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
];

export default function HowItWorks() {
    return (
        <section className="w-full py-12">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                <h2 className="text-3xl font-bold text-[#004B50] mb-8">How it Works</h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, index) => (
                        <div key={index} className="rounded-2xl shadow-sm p-6 bg-gray-100 border border-gray-200 flex flex-col items-start text-left skeleton">
                            <FaTruck className="w-10 h-10 text-[#004B50] mb-4" />
                            <h3 className="font-semibold text-lg text-[#004B50] mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
