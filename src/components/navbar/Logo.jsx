import React from 'react';

import logo from '../../assets/Modern Logo with Beveled Gear and Gradient Pin.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/">
            <div className='flex items-center justify-center gap-1'>
                <img className='w-12' src={logo} alt="" />
                <h3 className="hidden md:block playwrite bg-linear-to-r bg-clip-text text-transparent from-gray-800 to-slate-500 text-xl font-bold ">PublicFixHub</h3>
            </div>
        </Link>
    );
};

export default Logo;