import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Login from "./components/Login";
import NormalUser from "./components/Dashboard/NormalUser";
import PageNotFound from "./components/PageNotFound";
import { ThemeProvider } from "@material-ui/core/styles";
import { DarkDefaultTheme, DefaultTheme } from "./components/theme";
import { useSelector } from "react-redux";
import { getUser } from "./features/userSlice";
import LoadingScreen from "./components/LoadingScreen";

const ProductsRoutesWarper = lazy(() =>
  import("./components/ProductsRoutesWarper")
);
const CheckoutWarper = lazy(() => import("./components/CheckoutWarper"));
const DashboardWarper = lazy(() => import("./components/DashboardWarper"));

function App() {
  const [theme, setTheme] = useState(false);
  const user = useSelector(getUser);
  const userRole = user ? user.role : null;
  const handleThemeChange = () => {
    setTheme(!theme);
  };
  return (
    <div className="App">
      <ThemeProvider theme={theme ? DarkDefaultTheme : DefaultTheme}>
        <Router>
          <Routes>
            {/* <Route path="/map" element={<Map />} /> */}
            <Route
              path="/checkout/*"
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <CheckoutWarper />
                </Suspense>
              }
            />
            <Route
              path="/dashboard/normal_user"
              element={<NormalUser user={user} />}
            />
            <Route
              path="/dashboard/*"
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <DashboardWarper userRole={userRole} />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <>
                  <NavBar changeTheme={handleThemeChange} /> <Cart />
                </>
              }
            />
            <Route
              path="/products/*"
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <NavBar changeTheme={handleThemeChange} />
                  <ProductsRoutesWarper />
                </Suspense>
              }
            />
            <Route path="/login" element={<Login type="login" />} />
            <Route path="/register" element={<Login type="register" />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <NavBar changeTheme={handleThemeChange} /> <Home />{" "}
                </>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
