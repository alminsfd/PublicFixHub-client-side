
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';

const MainLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='max-w-11/12 mx-auto ' >
                <Outlet></Outlet>
            </div>
        </>

    );
};

export default MainLayout;