import App from "@/App";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { About } from "@/pages/About";
import barcodeNFCtest from "@/pages/barcodeNFCtest";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Verify } from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";

import { role } from "@/constants/role";
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
      {
        Component: withAuth(About),
        path: "about",
      },
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
]);
