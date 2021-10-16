import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../features/productsSlice";
import { selectTheme } from "../features/appSlice";
import ErrorPage from "./ErrorPage";
import LoadingScreen from "./LoadingScreen";

function Products() {
  let dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    (async function () {
      try {
        let response = await fetch("/api/dashboard/products");
        console.log(response.url);
        let productsList = await response.json();
        setProducts(productsList);
        dispatch(addProducts(productsList));
        setLoading(false);
      } catch (err) {
        setError("ops Some thing went wrong try to reload the page");
      }
    })();
  }, []);
  return (
    <Container theme={theme}>
      {!error ? (
        loading ? (
          <LoadingScreen />
        ) : (
          <ProductsContainer>
            {products.map((product, index) => {
              return (
                <ProductCard
                  {...product}
                  product={{ ...product }}
                  key={index}
                />
              );
            })}
          </ProductsContainer>
        )
      ) : (
        <ErrorPage msg={error} />
      )}
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
  background: ${({ theme }) => theme.primary};
`;

const ProductsContainer = styled.div`
  margin: 4rem 0;
  width: 100%;
  justify-content: center;
  padding: 0 2em;
  display: flex;
  flex-wrap: wrap;
`;
