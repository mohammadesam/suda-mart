import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import styled from "styled-components";
import LoadingScreen from "./LoadingScreen";
import ErrorPage from "./ErrorPage";
import { useParams } from "react-router-dom";
import { add, getCart } from "../features/cartSlice";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [inCart, setInCart] = useState(false);
  const [rating, setRating] = useState({ rate: 0, numberOfReviews: 0 });
  let cartItems = useSelector(getCart);
  const { data, loading, error } = useFetch(
    `/api/dashboard/product/${id}`,
    (product) => {
      setInCart(checkProduct());

      console.log(product.rates);
      // when no rate available
      if (!product.rates.length) return;

      const total = product.rates.reduce((sum, rateObj) => {
        return sum + rateObj.rating;
      }, 0);
      const rating = Math.round(total / product.rates.length);
      setRating({ rate: rating, numberOfReviews: product.rates.length });
    }
  );
  const product = data;

  console.log(id, data);
  function addToCart() {
    console.log(product);
    dispatch(add({ ...product }));
    setInCart(true);
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function checkProduct() {
    const productInCart = cartItems.find((item) => item.id === id);
    if (productInCart !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  if (error) {
    return <ErrorPage />;
  } else if (loading) {
    return <LoadingScreen />;
  } else {
    let buff = Buffer.from(product.image.data.data);
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
          <div>
            {" "}
            <p className="title"> Rating </p>
            <Rating rating={rating} id={id} setRating={setRating} />
          </div>
          <ButtonsWarper>
            <button disabled={inCart} onClick={addToCart}>
              {inCart ? "in Cart" : "Add to Cart"}
            </button>
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

  button:hover {
    opacity: 0.8;
  }
`;
