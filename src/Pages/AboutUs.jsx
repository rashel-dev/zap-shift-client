import React, { useState } from "react";

const tabs = ["Story", "Mission", "Success", "Team & Others"];

export default function AboutUs() {
    const [active, setActive] = useState("Story");

    const content = {
        Story: [
            `We started with a simple promise — to make parcel delivery fast, reliable,
    and stress-free. Over the years, our commitment to real-time tracking,
    efficient logistics, and customer-first service has made us a trusted partner
    for thousands. Whether it's a personal gift or business shipment, we ensure it
    reaches on time — every time.`,

    `Whether it's a personal gift or business shipment, we ensure it reaches 
    on time — every time`,
        ],

        Mission: [`Our mission is to deliver convenience through tech-driven parcel services.
    Real-time tracking, efficient logistics, and honest service — that's our core.`],

        Success: [`We've grown from a small startup to a national delivery partner. Our
    accuracy, speed, and customer experience have become our success pillars.`],

        "Team & Others": [`Our team includes logistics experts, tech engineers, and support
    specialists. Together, we ensure your parcel reaches safely, fast, and with care.`],
    };

    return (
        <section className="w-full max-w-6xl mx-auto px-12 py-12 md:py-20 bg-white rounded-2xl my-8">
            {/* Header */}
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-gray-600 max-w-2xl">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
            </p>

            <div className="divider my-10"></div>

            {/* DaisyUI Tabs */}
            <div className="tabs tabs-bordered mb-8 overflow-x-auto">
                {tabs.map((tab) => (
                    <button key={tab} onClick={() => setActive(tab)} className={`tab font-bold whitespace-nowrap ${active === tab ? "tab-active text-green-700" : ""}`}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="prose max-w-none text-gray-700 space-y-4">
                {content[active].map((para, index) => (
                    <p key={index}>{para}</p>
                ))}
            </div>
        </section>
    );
}
