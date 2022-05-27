import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import Products from "./Products";
const ProductsRoutesWarper = () => {
  return (
    <Routes>
      <Route path="/:id" element={<ProductDetails />} />
      <Route path="/" index element={<Products />} />
    </Routes>
  );
};

export default ProductsRoutesWarper;
