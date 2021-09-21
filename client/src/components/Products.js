import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { addProducts } from "../features/productsSlice";
let PRODUCTS = [
  {
    id: 1,
    title: "Sport shoe",
    image: 1,
    price: 12.99,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "red",
    label: ["shoes", "sport"],
    numberOfOrders: 4,
    stock: 12,
  },

  {
    id: 2,
    title: "Watch",
    image: 2,
    price: 82.99,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "gold",
    label: ["accus", "clothes"],
    numberOfOrders: 15,
    stock: 1,
  },
  {
    id: 3,
    title: "Shampoo",
    image: 4,
    price: 9.99,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "white",
    label: ["clean", "body"],
    numberOfOrders: 15,
    stock: 8,
  },
  {
    id: 4,
    title: "Blue man Perfume",
    image: 5,
    price: 99.75,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    color: "red",
    label: ["perfume", "casual"],
    numberOfOrders: 15,
    stock: 12,
  },
];

function Products() {
  let dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // (function () {
    //   // let response = await fetch("https://fakestoreapi.com/products");
    //   // let productsList = await response.json();
    //   // console.log(productsList);

    // })();
    dispatch(addProducts(PRODUCTS));
    setProducts(PRODUCTS);
    console.log("hiiio");
  }, [products]);
  return (
    <Container>
      <ProductsContainer>
        {PRODUCTS &&
          PRODUCTS.map((product, index) => {
            return (
              <ProductCard {...product} product={{ ...product }} key={index} />
            );
          })}
      </ProductsContainer>
    </Container>
  );
}

export default Products;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  top: 70px;
`;

const ProductsContainer = styled.div`
  margin: 4rem 0;
  width: 100%;
  justify-content: center;
  padding: 0 2em;
  display: flex;
  flex-wrap: wrap;
`;
