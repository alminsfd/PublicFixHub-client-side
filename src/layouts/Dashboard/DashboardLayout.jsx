import React from 'react';
import { RiFolderWarningLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink, Outlet } from 'react-router';
import logoImg from '../../assets/Modern Logo with Beveled Gear and Gradient Pin.png';
import { MdAssignmentAdd, MdManageAccounts, MdOutlineAssignmentLate, MdOutlinePayment, MdReport } from 'react-icons/md';
import useRole from '../../hooks/useRole';
import { FaUserShield, FaUserTie } from 'react-icons/fa';

const DashboardLayout = () => {
    const { role } = useRole()
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className=" pt-20 drawer-content">
                {/* Navbar */}
                <nav className=" fixed top-0 z-50  navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <h3 className="hidden md:block playwrite bg-linear-to-r bg-clip-text text-transparent from-gray-800 to-slate-500 text-xl font-bold ">PublicFixHub</h3>
                </nav>
                {/* Page content here */}
                <div className="p-4">
                    <Outlet></Outlet>
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* logo */}
                        <li>
                            < Link className='w-13 h-13 ' to="/"><img src={logoImg} alt="" /></Link>
                        </li>

                        {/* user dashbard links */}
                        {
                            role === 'citizen' && <>

                                <li>
                                    <Link to='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                        {/* Home icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                        <span className="is-drawer-close:hidden">Homepage</span>
                                    </Link>
                                </li>
                                <li>
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Report" to="/dashboard/report-issue">
                                        <MdReport />
                                        <span className="is-drawer-close:hidden">Reporting issue</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right  " data-tip="MyIssues" to="/dashboard/my-issue">
                                        <RiFolderWarningLine />
                                        <span className="is-drawer-close:hidden">My report</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right  " data-tip="myprofile" to="/dashboard/my-profile">
                                        <CgProfile />
                                        <span className="is-drawer-close:hidden">My Profile</span>
                                    </NavLink>
                                </li>

                            </>
                        }

                        {/* Staff Dashboard */}
                        {
                            role === 'staff' && <>

                                <li>
                                    <Link to='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                        {/* Home icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                        <span className="is-drawer-close:hidden">Homepage</span>
                                    </Link>
                                </li>
                                <li>
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assign" to="/dashboard/AssingIssue">
                                        <MdAssignmentAdd />
                                        <span className="is-drawer-close:hidden">Assigned issue</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right  " data-tip="Profile" to="/dashboard/staff-profile">
                                        <CgProfile />
                                        <span className="is-drawer-close:hidden">Profile</span>
                                    </NavLink>
                                </li>


                            </>
                        }

                        {/* admin Dashboard */}
                        {
                            role === 'admin' && <>

                                <li>
                                    <Link to='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                        {/* Home icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                        <span className="is-drawer-close:hidden">Homepage</span>
                                    </Link>
                                </li>
                                <li>
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage issue" to="/dashboard/admin-allIssue">
                                        <MdOutlineAssignmentLate size={16} />
                                        <span className="is-drawer-close:hidden">Manage issue</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage issue" to="/dashboard/manage-user">
                                        <MdManageAccounts size={18} />
                                        <span className="is-drawer-close:hidden">Manage user</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage staff" to="/dashboard/manage-staff">
                                        <FaUserTie />
                                        <span className="is-drawer-close:hidden">Manage staff</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right  " data-tip="Profile" to="/dashboard/admin-profile">
                                        <FaUserShield />
                                        <span className="is-drawer-close:hidden">Profile</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right  " data-tip="Payments" to="/dashboard/allpayment">
                                        <MdOutlinePayment />
                                        <span className="is-drawer-close:hidden">Payments</span>
                                    </NavLink>
                                </li>


                            </>
                        }


                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;