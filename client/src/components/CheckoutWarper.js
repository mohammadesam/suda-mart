import React from "react";
import { Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import SuccessPage from "./successPage";
import Paypal from "./Paypal";

const CheckoutWarper = () => {
  return (
    <Routes>
      <Route path=":total" element={<Checkout />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="paypal/:shippingCost/" element={<Paypal />} />
    </Routes>
  );
};

export default CheckoutWarper;
