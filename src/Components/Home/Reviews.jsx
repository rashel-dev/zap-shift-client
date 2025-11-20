import React, { useEffect, useState } from "react";
import "swiper/css";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import reviewQuote from "../../assets/reviewQuote.png";
import customer_top from '../../assets/customer-top.png';
import Loader from "../Shared/Loader";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetch("/reviews.json")
    //         .then((res) => res.json())
    //         .then((data) => setReviews(data));
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch("/reviews.json");
            const data = await res.json();
            setReviews(data);
            setLoading(false);
        }
        fetchData();
    },[])

    if(loading){
        return <Loader></Loader>
    }
    return (
        <div className="mb-8">
            <div className="max-w-1/2 mx-auto text-center">
                <img src={customer_top} alt="" className="mx-auto my-8" />
                <h2 className="text-secondary font-bold text-3xl text-center my-8">What our customers are saying</h2>
                <p className="text-center text-gray-500 my-8">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>
            </div>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                loop={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                coverflowEffect={{
                    rotate: 30,
                    stretch: "50%",
                    depth: 200,
                    scale: 0.75,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="mySwiper"
                breakpoints={{
                    320: {
                        slidesPerView: "auto",
                    },
                    640: {
                        slidesPerView: "auto",
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id} className="p-4 lg:p-8 bg-white rounded-lg">
                        <img src={reviewQuote} alt="" />
                        <p>{review.review}</p>
                        <hr className="border border-dashed border-secondary my-4" />
                        <div className="flex items-center gap-4 flex-col md:flex-row">
                            <img src={review.user_photoURL} alt="" className="h-10 w-10 rounded-full" />
                            <div className="text-center md:text-left">
                                <h3 className="font-bold text-secondary">{review.userName}</h3>
                                <p>{review.user_email}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Reviews;
