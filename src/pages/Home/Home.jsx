import React from 'react';
import Banner from '../../components/Banner/Banner';
import Feature from '../../components/Feature/Feature';
import HowItWorks from '../../components/Workflow/HowItWorks';


const Home = () => {
    return (
        <>
           <Banner></Banner>
           <Feature></Feature>
           <HowItWorks></HowItWorks>
        </>
    );
};

export default Home;