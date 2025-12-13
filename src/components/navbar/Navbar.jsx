import React from 'react';
import Logo from './LOGO';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useRole from '../../hooks/useRole';


const Navbar = () => {
    const { user, logOut } = useAuth();
    const { role } = useRole()
    const navigate = useNavigate()

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Successfully logout done.",
                    icon: "success",
                    draggable: false
                });
                navigate('login')

            })
            .catch(error => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    text: errorMessage,
                    title: "Something went wrong!",

                });
            })
    }
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/issue">All Issues</NavLink></li>
        <li><NavLink to="/be_a_staff">Be a Staff</NavLink></li>
        <li><NavLink to="/coverage">Coverage Areas</NavLink></li>
        {
            role === 'citizen' && <>
                <li><NavLink to="/dashboard/my-issue">My Issue</NavLink></li>
                <li><NavLink to="/dashboard/my-profile"> Profile </NavLink></li>
                <li><NavLink to="/dashboard/report-issue"> Report Issue </NavLink></li>

            </>
        }
        {/* <li><NavLink to="">About Us</NavLink></li> */}

    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <Logo></Logo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end ">
                {
                    user ?
                        <>

                            <div className="dropdown dropdown-end cursor-pointer  ">
                                <div tabIndex={0} role="button" className="m-1">
                                    <img className='w-12 h-12 rounded-full' src={user?.photoURL} referrerPolicy="no-referrer" alt="" />
                                </div>
                                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li className='hover:bg-gray-300 hover:text-indigo-500' >
                                        <Link to='/dashboard/my-profile' >{user?.displayName}</Link>
                                    </li>
                                    <li className='hover:bg-gray-300 hover:text-indigo-500' >
                                        <Link to='/dashboard' > Dashboard </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogOut} className='btn btn-primary btn-sm text-white' > Logout </button>
                                    </li>
                                </ul>
                            </div>

                        </>
                        : <Link to='login' className=" button px-4 py-2 ">Log IN</Link>

                }

            </div>
        </div>
    );
};

export default Navbar;