import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Allissue from "../pages/IssueALL/Allissue";
import PrivateRoute from "./PrivateRoute";
import StaffRoute from "./StaffRoute";
import AdminRoute from "./AdminRoute";
import Coverage from "../pages/Covrage/Coverage";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import DashboardHome from "../layouts/Dashboard/DashboardHome";
import Bestaff from "../pages/Be a rider/Bestaff";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
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
                path: 'be_a_staff',
                Component: Bestaff
            },
            {
                path: 'coverage',
                Component: Coverage
            }
        ]
    },

    {
        path: 'dashboard',
        element: <DashboardLayout></DashboardLayout>,
        // element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index:true,
                Component: DashboardHome
            },

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