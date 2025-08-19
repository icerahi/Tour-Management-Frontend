import { AddDivision } from "@/pages/admin/AddDivision";
import { AddTour } from "@/pages/admin/AddTour";
import { addTourType } from "@/pages/admin/AddTourType";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      { title: "Analytics", url: "/admin/analytics", component: Analytics },
    ],
  },

  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: addTourType,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
      },
      { title: "Add Tour", url: "/admin/add-tour", component: AddTour },
    ],
  },
];
