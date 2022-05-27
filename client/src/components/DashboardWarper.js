import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import LoadingScreen from "./LoadingScreen";

const Dashboard = lazy(() => import("./Dashboard"));
const ProductsDashboard = lazy(() => import("./Dashboard/ProductsDashboard"));
const AdminUserDashboard = lazy(() => import("./Dashboard/Users"));
const Settings = lazy(() => import("./Dashboard/Settings"));
const Order = lazy(() => import("./Dashboard/Orders"));

const DashboardWarper = ({ userRole }) => {
  if (userRole !== "admin") {
    return <PageNotFound />;
  }
  return (
    <Routes>
      <Route
        path="/order"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Order />
          </Suspense>
        }
      />

      <Route
        path="/user"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <AdminUserDashboard />
          </Suspense>
        }
      />

      <Route
        path="/products"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <ProductsDashboard />
          </Suspense>
        }
      />

      <Route
        path="/settings"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Settings />
          </Suspense>
        }
      />

      <Route
        path="/"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Dashboard />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default DashboardWarper;
