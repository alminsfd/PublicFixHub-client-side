
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';

const MainLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='max-w-11/12 mx-auto space-y-10' >
                <Outlet></Outlet>
            </div>
        </>

    );
};

export default MainLayout;