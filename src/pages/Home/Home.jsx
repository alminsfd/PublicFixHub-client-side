import React from 'react';
import Banner from '../../components/Banner/Banner';
import Feature from '../../components/Feature/Feature';
import HowItWorks from '../../components/Workflow/HowItWorks';
import WhyChooseUs from '../../components/Workflow/WhyChooseUs';
import StatusFlow from '../../components/Workflow/StatusFlow';
import IssueList from '../../components/Cards/IssueList';


const Home = () => {
    return (
        <>
           <Banner></Banner>
           <IssueList></IssueList>
           <Feature></Feature>
           <HowItWorks></HowItWorks>
           <WhyChooseUs></WhyChooseUs>
           <StatusFlow></StatusFlow>
        </>
    );
};

export default Home;