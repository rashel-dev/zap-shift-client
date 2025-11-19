import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import amazon_vector from "../../assets/brands/amazon_vector.png";
import amazon from "../../assets/brands/amazon.png";
import casio from "../../assets/brands/casio.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import star from "../../assets/brands/star.png";
import start_people from "../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const brands = [amazon_vector, amazon, casio, moonstar, randstad, star, start_people];

const Brands = () => {
    return (
        <Swiper slidesPerView={3} centeredSlides={true} spaceBetween={30} grabCursor={true} loop={true} autoplay={{ delay: 0, disableOnInteraction: false }} speed={4000} freeMode={true} modules={[Autoplay]}  className="mt-8">
            {brands.map((brand, index) => (
                <SwiperSlide key={index}>
                    <img src={brand} alt="" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Brands;
