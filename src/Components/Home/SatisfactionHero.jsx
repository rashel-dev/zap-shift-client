import React from "react";
import waveBg from "../../assets/be-a-merchant-bg.png";
import locationMerchant from "../../assets/location-merchant.png";

export default function SatisfactionHero() {
    return (
        <section
            className="rounded-xl mx-4 my-8 px-4 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center bg-secondary"
            style={{
                backgroundImage: `url(${waveBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Left Content */}
            <div className="lg:w-full text-white space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold leading-snug">
                    Merchant and Customer Satisfaction <br />
                    is Our First Priority
                </h2>

                <p className="text-sm opacity-90 leading-relaxed">
                    We offer the lowest delivery charge with the highest value along with 100% safety of your product. Our courier delivers your parcels in every corner of Bangladesh right on time.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                    <button className="bg-lime-300 text-black font-medium px-5 py-2 rounded-full hover:bg-lime-500 transition cursor-pointer w-full md:w-auto">Become a Merchant</button>

                    <button className="bg-transparent border border-lime-300 text-lime-300 font-medium px-5 py-2 rounded-full hover:bg-lime-300 hover:text-black transition cursor-pointer w-full md:w-auto">
                        Earn with ZapShift Courier
                    </button>
                </div>
            </div>

            {/* Right-side image */}
            <div className="mt-10 md:mt-0 hidden lg:block">
                <img src={locationMerchant} alt="Parcel Boxes" className="w-[270px] md:w-[320px]" />
            </div>
        </section>
    );
}
