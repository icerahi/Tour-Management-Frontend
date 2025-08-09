import App from "@/App";
import { About } from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Verify } from "@/pages/Verify";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    //  element: <App />
    Component: App,
    children: [
      {
        Component: About,
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
]);
