import React from 'react';
import Logo from './LOGO';
import { Link, NavLink } from 'react-router';

import userImg from '../../assets/user.png';


const Navbar = () => {
    const links = <>
        <li><NavLink className='text-base' to="/">Home</NavLink></li>
        <li><NavLink className='text-base' to="/issue">All Issues</NavLink></li>
        <li><NavLink className='text-base' to="/be_a_staff">Be a Staff</NavLink></li>
        <li><NavLink className='text-base' to="/coverage">Coverage Areas</NavLink></li>
        {
            // user && <>
            //     <li><NavLink to="/dashboard/my-parcels">My Issue</NavLink></li>
            //     <li><NavLink to="/dashboard"></NavLink></li>
            // </>
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
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="m-1">
                        <img className='mr-10' src={userImg} alt="" />
                    </div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li className='hover:bg-gray-300 hover:text-indigo-500-300' >
                            <Link>Al Amin Hossain Tanvir</Link>
                        </li>
                        <li className='hover:bg-gray-300 hover:text-indigo-500' >
                            <Link to='dashboard' > Dashboard </Link>
                        </li>
                        <li>
                            <Link  className='btn btn-primary' > Logout </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;