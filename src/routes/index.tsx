import App from "@/App";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { About } from "@/pages/About";
import barcodeNFCtest from "@/pages/barcodeNFCtest";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Verify } from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";

import { role } from "@/constants/role";
import { Booking } from "@/pages/Booking";
import { Homepage } from "@/pages/Homepage";
import Cancel from "@/pages/payment/Cancel";
import { Fail } from "@/pages/payment/Fail";
import { Success } from "@/pages/payment/Success";
import { TourDetails } from "@/pages/TourDetails";
import { Tours } from "@/pages/Tours";
import { Unauthorized } from "@/pages/Unauthorized";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    //  element: <App />
    Component: App,
    children: [
      { Component: Homepage, index: true },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Tours,
        path: "tours",
      },
      { Component: TourDetails, path: "tours/:id" },
      { Component: withAuth(Booking), path: "booking/:id" },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/barcode",
    Component: barcodeNFCtest,
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },

  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    Component: Success,
    path: "/payment/success",
  },
  {
    Component: Fail,
    path: "/payment/fail",
  },
  {
    Component: Cancel,
    path: "/payment/cancel",
  },
]);
