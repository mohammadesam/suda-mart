import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
//import Paypal from "./components/Paypal";
import SuccessPage from "./components/successPage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProductsDashboard from "./components/Dashboard/ProductsDashboard";
import AdminUserDashboard from "./components/Dashboard/Users";
import NormalUser from "./components/Dashboard/NormalUser";
import { ThemeProvider } from "@material-ui/core/styles";
import { DarkDefaultTheme, DefaultTheme } from "./components/theme";
function App() {
  const [theme, setTheme] = useState(false);

  const handleThemeChange = () => {
    setTheme(!theme);
    console.log(theme);
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
            <Route path="/checkout/paypal/:total/">{/* <Paypal /> */}</Route>
            <Route path="/checkout/:total">
              <Checkout />
            </Route>
            <Route path="/dashboard/user">
              <AdminUserDashboard />
            </Route>
            <Route path="/dashboard/products">
              <ProductsDashboard />
            </Route>

            <Route path="/dashboard/normal_user">
              <NormalUser />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
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
