import React from 'react';
import BannerSection from '../Components/Home/BannerSection';
import HowItWorks from '../Components/Home/HowItWorks';
import OurServices from '../Components/Home/OurServices';
import Brands from '../Components/Home/Brands';
import DeliveryServices from '../Components/Home/DeliveryServices';
import Reviews from '../Components/Home/Reviews';
import FAQ from '../Components/Home/FAQ';

const Home = () => {
    return (
        <div>
            <BannerSection></BannerSection>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Brands></Brands>
            <DeliveryServices></DeliveryServices>
            <Reviews></Reviews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;