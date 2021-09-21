import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, getCart, remove } from "../features/cartSlice";
function ProductCard({ image, title, price, description, id, product }) {
  console.log(product);
  let history = useHistory();
  let dispatch = useDispatch();
  let cartItems = useSelector(getCart);
  let inCart = cartItems.filter((item) => item.id === id);
  function addToCart() {
    dispatch(add({ ...product }));
  }

  function removeFromCart() {
    dispatch(remove(id));
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Container>
      <img
        src={`${image}`}
        onClick={() => history.push(`/products/${id}`)}
        alt="product"
      />
      <h2> {title.length > 20 ? title.substr(0, 20) + " ..." : title} </h2>
      <p>{description.substr(0, 50)}</p>
      <div className="desc">
        {inCart.length ? (
          <button className="removeFromCartBtn" onClick={removeFromCart}>
            <span className="badge">{inCart[0].quantity}</span>X
          </button>
        ) : (
          <button onClick={addToCart}>add to cart</button>
        )}
        <span> {price} $ </span>
      </div>
    </Container>
  );
}

export default ProductCard;
const Container = styled.div`
  @media screen and (max-width: 600px) {
    width: 70%;
  }

  @media screen and (max-width: 900px) and (min-width: 600px) {
    width: 35%;
    margin: 1rem;
  }
  min-width: 250px;
  display: flex;
  flex-direction: column;
  width: 20%;
  margin: 3rem 2rem;
  height: 340px;
  box-shadow: 0px 10px 20px rgb(0 0 0 / 20%);
  //border: solid 1px black;
  img {
    height: 150px;
    cursor: pointer;
  }

  h2 {
    padding: 5px 10px;
    min-height: 74px;
  }

  p {
    min-width: 250px;
    margin: 1rem 0 1.5rem 0;
    font-size: 0.9rem;
    font-family: Roboto, serif;
    padding: 0 10px;
  }

  .desc {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 0.9rem 0 11px;
    transition: 0.25s;

    .removeFromCartBtn {
      padding: 0 5px 0 0;
      font-weight: bold;
      background: #c0770a;
      color: white;
      border: none;
      .badge {
        background: white;
        color: black;
        padding: 2px 7px;
        margin: 1px 10px 1px 1px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.25s;
      }

      &:hover {
        .badge {
          background: white;
        }
      }
    }
  }

  .desc > button {
    background: #fff;
    border-radius: 20px;
    padding: 3px 10px;
    border: solid 1px #c0770a;
    cursor: pointer;
    transition: 0.25s;
    color: #c0770a;
    font-weight: bold;
    transform: scale(1.1);

    &:hover {
      transform: scale(1.2);
      background: #c0770a;
      border-color: #c0770a;
      color: white;
    }
  }

  .desc > span {
    font-weight: 900;
  }
`;
