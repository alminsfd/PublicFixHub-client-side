
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
const MainLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='max-w-11/12 mx-auto space-y-10' >
                <Outlet></Outlet>
            </div>
            <Footer
                links={
                    [
                        "Home",
                        "Report Issue",
                        "Track Status",
                        "Premium",
                        "About",
                    ]
                }
            ></Footer>
        </>

    );
};

export default MainLayout;