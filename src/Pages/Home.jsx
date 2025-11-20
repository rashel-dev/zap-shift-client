import React from 'react';
import BannerSection from '../Components/Home/BannerSection';
import HowItWorks from '../Components/Home/HowItWorks';
import OurServices from '../Components/Home/OurServices';
import Brands from '../Components/Home/Brands';
import DeliveryServices from '../Components/Home/DeliveryServices';
import Reviews from '../Components/Home/Reviews';
import FAQ from '../Components/Home/FAQ';
import SatisfactionHero from '../Components/Home/SatisfactionHero';
import TrackParcelAndBeRider from '../Components/Home/trackParcelAndBeRider';

const Home = () => {
    return (
        <div>
            <BannerSection></BannerSection>
            <TrackParcelAndBeRider></TrackParcelAndBeRider>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Brands></Brands>
            <DeliveryServices></DeliveryServices>
            <SatisfactionHero></SatisfactionHero>
            <Reviews></Reviews>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;