import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Paypal from "./components/Paypal";
import SuccessPage from "./components/successPage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProductsDashboard from "./components/Dashboard/ProductsDashboard";
import AdminUserDashboard from "./components/Dashboard/Users";
import NormalUser from "./components/Dashboard/NormalUser";
import Order from "./components/Dashboard/Orders";
import PageNotFound from "./components/PageNotFound";
import { ThemeProvider } from "@material-ui/core/styles";
import { DarkDefaultTheme, DefaultTheme } from "./components/theme";
import { useSelector } from "react-redux";
import { getUser } from "./features/userSlice";

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
          <Switch>
            {/* todo  add functionality to the page*/}
            <Route path="/products/:id">
              <NavBar changeTheme={handleThemeChange} />
              <ProductDetails />
            </Route>
            <Route path="/checkout/paypal/success">
              <SuccessPage />
            </Route>
            <Route path="/checkout/paypal/:total/">
              {user !== null ? <Paypal /> : <PageNotFound />}
            </Route>
            <Route path="/checkout/:total">
              <Checkout />
            </Route>
            <Route path="/dashboard/order">
              {userRole === "admin" ? <Order /> : <PageNotFound />}
            </Route>
            <Route path="/dashboard/user">
              {userRole === "admin" ? <AdminUserDashboard /> : <PageNotFound />}
            </Route>
            <Route path="/dashboard/products">
              {userRole === "admin" ? <ProductsDashboard /> : <PageNotFound />}
            </Route>

            <Route exact path="/dashboard/normal_user">
              {user !== null ? <NormalUser /> : <PageNotFound />}
            </Route>

            <Route path="/dashboard">
              {userRole === "admin" ? <Dashboard /> : <PageNotFound />}
            </Route>
            <Route path="/cart">
              <NavBar changeTheme={handleThemeChange} />
              <Cart />
            </Route>
            <Route path="/products">
              <NavBar changeTheme={handleThemeChange} />
              <Products />
            </Route>
            <Route path="/login">
              <Login type="login" />
            </Route>
            <Route path="/register">
              <Login type="register" />
            </Route>
            <Route path="/">
              <NavBar changeTheme={handleThemeChange} /> <Home />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
