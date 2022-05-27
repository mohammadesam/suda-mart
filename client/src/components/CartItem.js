import React from "react";
import styled from "styled-components";
import { remove, addOne } from "../features/cartSlice";
import { useDispatch } from "react-redux";
import { Buffer } from "buffer";

function CartItem({ _id, title, image, price, quantity }) {
  let dispatch = useDispatch();

  let handleQuantityUpdate = (value) => {
    if (quantity === 1 && value === -1) return;
    dispatch(addOne({ _id, value }));
  };

  let handleDelete = () => {
    dispatch(remove(_id));
  };
  let buff = Buffer.from(image.data.data);
  let base64Image = buff.toString("base64");
  return (
    <Container>
      <div>
        <img
          src={`data: ${image.contentType};base64,${base64Image}`}
          alt={title}
        />
        <div className="details">
          <h5> {title} </h5>
          <span>
            <strong>{`${price} $`}</strong>
          </span>
          {/* <span>
            {" "}
            Total:{" "}
            <span style={{ color: "green" }}>{` ${
              Math.floor(price * quantity * 100) / 100
            } $`}</span>{" "}
          </span> */}
        </div>
      </div>

      <Buttons>
        <button onClick={() => handleQuantityUpdate(-1)}> - </button>
        <span> {quantity} </span>
        <button onClick={() => handleQuantityUpdate(1)}> + </button>
        <img src="/images/trash-alt.svg" alt="" onClick={handleDelete} />
      </Buttons>
    </Container>
  );
}

export default CartItem;
const Container = styled.div`
  @media screen and (max-width: 600px) and (min-width: 350px) {
    width: 80%;
  }

  @media screen and (max-width: 450px) {
    width: 95%;
  }
  width: 50%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.7rem;
  img {
    width: 59px;
    height: 50px;
    margin: 0 5px;
  }

  div {
    display: flex;
    .details {
      display: flex;
      flex-direction: column;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 20px;
    margin: 0 1rem;
  }

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: 0.25s;

    &:hover {
      transform: scale(1.2);
    }
  }

  span {
    background: #6ebd52;
    padding: 4px 8px;
    border-radius: 5px;
    color: white;
  }
`;
