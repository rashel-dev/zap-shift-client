import React from "react";
import live_tracking from "../../assets/live-tracking.png";
import safe_delivery from "../../assets/safe-delivery.png";
import call_center from "../../assets/safe-delivery.png";

const services = [
    {
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
        icon: live_tracking,
    },
    {
        title: "100% Safe Delivery",
        description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        icon: safe_delivery,
    },
    {
        title: "24/7 Call Center Support",
        description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        icon: call_center,
    },
];

const DeliveryServices = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
            {services.map((service, index) => (
                <div key={index} className="flex items-start gap-4 bg-white shadow-md rounded-lg p-6">
                    <img src={service.icon} alt={service.title} className="w-20 h-20 object-cover"/>

                    <div className="border-l-2 border-dashed border-secondary pl-3">
                        <h3 className="text-xl font-semibold text-secondary">{service.title}</h3>
                        <p className="mt-2 text-gray-600">{service.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DeliveryServices;
