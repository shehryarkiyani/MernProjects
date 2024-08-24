import { lazy } from "react";
import { TCommonRoutesProps } from "types";
import PrivateRoute from "../PrivateRoute";
import { Navigate } from "react-router-dom";
import Layout from "layout";
// import { Layout } from "Layout";

const AdminDashboard = lazy(() => import("../../pages/Dashboard"));
const AdminRoutes: TCommonRoutesProps[] = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
];
export default AdminRoutes;
