import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Allissue from "../pages/IssueALL/Allissue";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'/issue',
                Component:Allissue

            }
        ]
    },
]);