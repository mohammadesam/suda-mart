import React, { useEffect } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { getAmount, getCart } from "../features/cartSlice";
import { changeAmount } from "../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

let myStorage = localStorage;

function Cart() {
  const dispatch = useDispatch(changeAmount);
  let history = useHistory();
  let cart = useSelector(getCart);
  const totalAmount = useSelector(getAmount);
  let totalPrice = cart.reduce(
    (sum, product) => (sum += product.price * product.quantity),
    0
  );

  useEffect(() => {
    // myStorage.removeItem("cart");
    myStorage.setItem("cart", JSON.stringify(cart));
    dispatch(changeAmount(Math.floor(totalPrice * 100) / 100));
  }, [cart]);

  function handleBuyNow() {
    if (totalPrice <= 0) return;
    history.push(`checkout/${totalPrice}`);
  }

  return (
    <Container>
      <h1>Cart</h1>
      {cart.map((item, index) => {
        return (
          <CartItem
            id={item.id}
            quantity={item.quantity}
            {...item}
            key={item._id}
          />
        );
      })}
      <ResultSection>
        <div>
          <span>Total Price</span>
          <span>${totalAmount}</span>
        </div>
        <button onClick={handleBuyNow}> Buy Now </button>
      </ResultSection>
    </Container>
  );
}

export default Cart;
const Container = styled.div`
  margin-top: 2rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 70px;

  hr {
    width: 100vw;
  }
`;

const ResultSection = styled.div`
  margin-top: 5rem;
  @media screen and (max-width: 700px) {
    width: 70%;
  }
  width: 25%;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    justify-content: space-between;
    margin: 0 0 0.4rem 0;
  }

  button {
    padding: 0.5rem 0;
    background: #6ebd52;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    border: none;
    shadow: 2px 1px 2px rgba(255, 255, 255, 0.4);
  }
`;
