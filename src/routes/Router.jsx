import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Allissue from "../pages/IssueALL/Allissue";
import Coverage from "../pages/Covrage/Coverage";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import DashboardHome from "../layouts/Dashboard/DashboardHome";
import Bestaff from "../pages/Be a staff/Bestaff";
import Errorpage from "../pages/Errorpage/Errorpage";
import IssueDetails from "../pages/IssueALL/IssueDetails";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/FORM/Register";
import Login from "../pages/FORM/Login";
import PrivateRoute from "./PrivateRoute";
import Report_issue from "../layouts/Dashboard/Report_issue";
import MyIssuePage from "../layouts/Dashboard/MyIssuePage";
import Profile from "../layouts/Dashboard/Profile";
import UserRoute from "./UserRoute";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <Errorpage></Errorpage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/issue',
                Component: Allissue

            },
            {
                path: '/be_a_staff',
                element: <PrivateRoute><Bestaff></Bestaff></PrivateRoute>
            },
            {
                path: '/coverage',
                Component: Coverage
            },
            {
                path: '/issueDetails/:id',
                element: <PrivateRoute><IssueDetails></IssueDetails></PrivateRoute>
            }
        ],

    },

    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: '/dashboard/report-issue',
                element: <PrivateRoute><UserRoute><Report_issue></Report_issue></UserRoute>  </PrivateRoute>,
                loader: () => fetch('../../public/Issuecatagory.json').then(res => res.json())
            },
            {
                path: '/dashboard/my-issue',
                element: <PrivateRoute><UserRoute><MyIssuePage></MyIssuePage></UserRoute></PrivateRoute>
            },
            {
                path: '/dashboard/my-profile',
                element: <PrivateRoute><UserRoute><Profile></Profile></UserRoute> </PrivateRoute>
            }
            // Staff only routes

            //   {
            //     path: 'completed-deliveries',
            //     element: <StaffRoute><CompletedDeliveries></CompletedDeliveries></StaffRoute>
            //   },

            // admin only routes
            //   {
            //     path: 'approve-riders',
            //     element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
            //   },
        ]
    }
]);