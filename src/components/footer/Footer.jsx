// src/components/footer/Footer.jsx

import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import logo from '../../assets/Modern Logo with Beveled Gear and Gradient Pin.png';
import { Link } from "react-router";


export default function Footer({ links }) {
    return (
        <footer className="bg-indigo-900 text-gray-300 py-12 mt-10 ">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

                {/* Logo + About */}
                <div className="text-justify">
                    <div className="flex items-start justify-start gap-1 " >
                        <img className="w-8 rounded-full" src={logo} alt="" />
                        <h2 className="text-2xl font-bold text-white mb-3">PublicFixHub</h2>
                    </div>
                    <p className="text-sm leading-relaxed">
                        A modern platform to report and track public infrastructure issues
                        quickly and transparently.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        {links.map((item, i) => (
                            <li
                                key={i}
                                className="hover:text-white transition cursor-pointer hover:underline"
                            >
                                <Link

                                    to={
                                        item === "Home" ? "/" :
                                            item === "Report Issue" ? "/dashboard/report-issue" :
                                                item === "Track Status" ? "/dashboard/my-issue" :
                                                    item === "Premium" ? "/dashboard/my-profile" :
                                                        "/about"
                                    }

                                >{item}</Link>


                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Contact</h3>
                    <ul className="space-y-3 text-sm ">
                        <li className="flex items-center gap-2 ">
                            <FaMapMarkerAlt /> Dhaka, Bangladesh
                        </li>
                        <li className="flex items-center gap-2 ">
                            <FaPhone /> +880 1234-567890
                        </li>
                        <li className="flex items-center gap-2 ">
                            <FaEnvelope /> support@issue.com
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex items-center gap-4 text-2xl">
                        <a href="https://www.facebook.com/ah5232041"><FaFacebook className="hover:text-white cursor-pointer transition" /></a>
                        <a href="https://x.com/al_amin30023"><FaTwitter className="hover:text-white cursor-pointer transition" /></a>
                        <a href="https://www.instagram.com/ah5232041/"><FaInstagram className="hover:text-white cursor-pointer transition" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm">
                © {new Date().getFullYear()} IssueReport. All Rights Reserved.
            </div>
        </footer>
    );
}


