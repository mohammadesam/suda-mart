import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";
import ErrorPage from "./ErrorPage";
import { useParams } from "react-router-dom";

function ProductDetails() {
  let { id } = useParams();
  let [product, setProduct] = useState(null);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);

  useEffect(() => {
    async function getProduct() {
      if (id === undefined || id === null)
        setError("opps some thing went wrong, please try again");
      try {
        let response = await fetch(`/api/dashboard/product/${id}`);
        let productData = await response.json();
        setProduct(productData);
        console.log(product);
        setLoading(false);
      } catch (err) {
        setError("some thing went wrong please try to reload the page");
      }
    }
    getProduct();
  }, []);

  if (error) {
    return <ErrorPage />;
  } else if (loading) {
    return <LoadingScreen />;
  } else {
    let buff = new Buffer.from(product.image.data.data);
    let base64Image = buff.toString("base64");
    return (
      <Container>
        <LeftContainer>
          <img
            src={`data:${product.image.contentType};base64,${base64Image}`}
            alt={product.title}
          />
        </LeftContainer>
        <RightContainer>
          <div>
            <h1> {product.title} </h1>
            <p className="desc">{product.description}</p>
          </div>
          <div>
            <p className="title"> Price </p>
            <span>
              {" "}
              <strong>{product.price} $</strong>{" "}
            </span>
          </div>
          <div>
            {" "}
            <p className="title"> Color </p>
            <span> {product.color} </span>
          </div>
          <div>
            {" "}
            <p className="title"> catagories </p>
            <span> {product.label || " "} </span>
          </div>
          <ButtonsWarper>
            <button> Add to Cart </button>
          </ButtonsWarper>
        </RightContainer>
      </Container>
    );
  }
}

export default ProductDetails;
const Container = styled.div`
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;

    div {
      width: 100%;
      padding: 0;
      margin: 1rem 0;
    }
  }
  padding: 5rem 3rem;
  display: flex;
  width: 100vw;
`;

const RightContainer = styled.div`
  padding: 0 2rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  & > * {
    margin: 0 0 1rem 0;

    p {
      margin: 10px 0;
    }
  }

  & > div > .title {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const LeftContainer = styled.div`
  width: 50%;
  padding: 0 3rem;
  img {
    width: 100%;
    height: 60vh;
  }
`;

const ButtonsWarper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    padding: 10px 20px;
    cursor: pointer;
    background: #c0770a;
    color: white;
    border: none;
  }
`;
