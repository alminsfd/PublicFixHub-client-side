import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Allissue from "../pages/IssueALL/Allissue";
import Coverage from "../pages/Covrage/Coverage";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import DashboardHome from "../layouts/Dashboard/DashboardHome";
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
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCencel from "../pages/Payment/PaymentCencel";
import PaymentCencelboost from "../pages/Payment/PaymentCencelboost";
import PaymentSuccesboosting from "../pages/Payment/PaymentSuccesboosting";
import StaffRoute from "./StaffRoute";
import AssignIssuepage from "../layouts/Dashboard/AssignIssuepage";
import StaffProfilepage from "../layouts/Dashboard/StaffProfilepage";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../layouts/Dashboard/AdminProfile";
import AdminAllissues from "../layouts/Dashboard/AdminAllissues";
import ManageUser from "../layouts/Dashboard/ManageUser";
import ManageStaff from "../layouts/Dashboard/ManageStaff";
import AdminPayment from "../layouts/Dashboard/AdminPayment";
import Loading from "../components/Loading/Loading";
import About from "../pages/About";
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
                Component: Allissue,
                loader: () => fetch('/Issuecatagory.json').then(res => res.json()),
                hydrateFallbackElement: <Loading></Loading>

            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/coverage',
                Component: Coverage,
                loader: () => fetch('/serviceCenters.json').then(res => res.json()),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/issueDetails/:id',
                element: <PrivateRoute><IssueDetails></IssueDetails></PrivateRoute>,
                loader: () => fetch('/Issuecatagory.json').then(res => res.json()),
                hydrateFallbackElement: <Loading></Loading>
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
                loader: () => fetch('/Issuecatagory.json').then(res => res.json()),
                hydrateFallbackElement:<Loading></Loading>
            },
            {
                path: '/dashboard/my-issue',
                element: <PrivateRoute><UserRoute><MyIssuePage></MyIssuePage></UserRoute></PrivateRoute>,
                loader: () => fetch('/Issuecatagory.json').then(res => res.json()),
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/dashboard/my-profile',
                element: <PrivateRoute><UserRoute><Profile></Profile></UserRoute> </PrivateRoute>
            },
            {
                path: '/dashboard/payment-success',
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: '/dashboard/payment-success-boosting',
                element: <PaymentSuccesboosting></PaymentSuccesboosting>
            },
            {
                path: '/dashboard/payment-cancelled',
                element: <PaymentCencel></PaymentCencel>
            },
            {
                path: '/dashboard/payment-cancelled-boosting',
                element: <PaymentCencelboost></PaymentCencelboost>
            },
            // Staff only routes

            {
                path: '/dashboard/AssingIssue',
                element: <PrivateRoute><StaffRoute><AssignIssuepage></AssignIssuepage></StaffRoute></PrivateRoute>
            },
            {
                path: '/dashboard/staff-profile',
                element: <PrivateRoute><StaffRoute><StaffProfilepage></StaffProfilepage></StaffRoute></PrivateRoute>
            },

            // admin only routes
            {
                path: '/dashboard/admin-profile',
                element: <PrivateRoute><AdminRoute><AdminProfile></AdminProfile></AdminRoute></PrivateRoute>
            },
            {
                path: '/dashboard/admin-allIssue',
                element: <PrivateRoute><AdminRoute><AdminAllissues></AdminAllissues></AdminRoute></PrivateRoute>
            },
            {
                path: '/dashboard/manage-user',
                element: <PrivateRoute><AdminRoute><ManageUser></ManageUser></AdminRoute></PrivateRoute>
            },
            {
                path: '/dashboard/manage-staff',
                element: <PrivateRoute><AdminRoute><ManageStaff></ManageStaff></AdminRoute></PrivateRoute>
            },
            {
                path: '/dashboard/allpayment',
                element: <PrivateRoute><AdminRoute><AdminPayment></AdminPayment></AdminRoute></PrivateRoute>
            },
        ]
    }
]);