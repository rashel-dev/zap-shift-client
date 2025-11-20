import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";
import { GoArrowUpRight } from "react-icons/go";


const BannerSection = () => {
    return (
        <div>
            <Carousel autoPlay={true} infiniteLoop={true} interval={2500}>
                <div className="relative">
                    <img src={banner1} />
                    <div className="absolute lg:bottom-20 lg:left-20 flex items-center gap-5">
                        <div className="flex items-center gap-1">
                            <button className="btn bg-primary text-black rounded-full">Track Your Parcel</button>
                            <GoArrowUpRight className="bg-black text-primary rounded-full font-bold text-2xl p-1 cursor-pointer" />
                        </div>
                        <div>
                            <button className="btn bg-primary text-black rounded-full font-bold">Be A Rider</button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={banner2} />
                    <div className="absolute lg:bottom-25 lg:left-20 flex items-center gap-5">
                        <div className="flex items-center gap-1">
                            <button className="btn bg-primary text-black rounded-full">Track Your Parcel</button>
                            <GoArrowUpRight className="bg-black text-primary rounded-full font-bold text-2xl p-1 cursor-pointer" />
                        </div>
                        <div>
                            <button className="btn bg-primary text-black rounded-full font-bold">Be A Rider</button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={banner3} />
                    <div className="absolute lg:bottom-30 lg:left-20 flex items-center gap-5">
                        <div className="flex items-center gap-1">
                            <button className="btn bg-primary text-black rounded-full">Track Your Parcel</button>
                            <GoArrowUpRight className="bg-black text-primary rounded-full font-bold text-2xl p-1 cursor-pointer" />
                        </div>
                        <div>
                            <button className="btn bg-primary text-black rounded-full font-bold">Be A Rider</button>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default BannerSection;
