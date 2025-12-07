import React from 'react';
import Banner from '../../components/Banner/Banner';
import Feature from '../../components/Feature/Feature';
import HowItWorks from '../../components/Workflow/HowItWorks';
import { StatusFlow } from '../../components/Workflow/StatusFlow';
import WhyChooseUs from '../../components/Workflow/WhyChooseUs';


const Home = () => {
    return (
        <>
           <Banner></Banner>
           <Feature></Feature>
           <HowItWorks></HowItWorks>
           <WhyChooseUs></WhyChooseUs>
           <StatusFlow></StatusFlow>
        </>
    );
};

export default Home;