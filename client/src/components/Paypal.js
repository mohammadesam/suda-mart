import React from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addPunch } from "../features/cartSlice";
import Cookies from "js-cookie";
import IconButton from "@material-ui/core/IconButton";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

const STYLE = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
};

const buttonStyle = {
  borderRadius: 5,
  padding: "5px 10px",
  background: "#FD4056",
  margin: "10px 0",
  color: "white",
  width: 200,
  height: 35,
  "&:hover": {
    opacity: 0.8,
  },
};

const ArrowBackStyle = {
  position: "absolute",
  top: 5,
  left: 8,
};

function Paypal() {
  let user =
    Cookies.get("user") !== undefined
      ? JSON.parse(Cookies.get("user"))
      : undefined;

  let navigate = useNavigate();
  let dispatch = useDispatch();
  const cartData = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const shippingCost = useParams().shippingCost;

  const HandleTestOrder = async () => {
    await fetch("/api/dashboard/orders/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartData,
        user: user._id,
        shippingCost,
      }),
    });
    localStorage.removeItem("cart");
    dispatch(addPunch([]));
    navigate("/checkout/success");
  };

  function getTotalPrice(cart) {
    return cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  }

  if (!user) {
    return <div>You are not logged in</div>;
  }
  return (
    <div style={STYLE}>
      <Link to="/cart">
        <ArrowBackIcon style={ArrowBackStyle} />
      </Link>
      <Sammary>
        <h3> Summary </h3>
        <div key="1">
          <span> shipping cost </span>
          <span className="bold"> {shippingCost} AED </span>
        </div>

        <div key="2">
          {" "}
          <span>Total Bill </span>{" "}
          <span className="bold">{getTotalPrice(cartData)} AED</span>{" "}
        </div>
        <div>
          <span>discount </span> <span className="bold"> 0% </span>
        </div>
        <div key="3">
          {" "}
          <span>Total To Pay</span>{" "}
          <span className="bold">
            {" "}
            {getTotalPrice(cartData) + Number(shippingCost)} AED{" "}
          </span>{" "}
        </div>
      </Sammary>
      <IconButton style={buttonStyle} onClick={HandleTestOrder}>
        <LocalOfferIcon /> <Typography>Submit The Order</Typography>
      </IconButton>
    </div>
  );
}

export default Paypal;

/* 
sb-73u4d7308977@personal.example.com
System Generated Password:
N+EFOv47
*/

const Sammary = styled.div`
  margin: 0 2rem 2rem 2rem;
  min-width: 250px;
  width: 30%;
  height: 350px;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  h3 {
    color: #2053cd;
    margin: -1rem 0 1rem 0;
  }
  div {
    margin: 1rem 0;
    width: 100%;
    margin: 0.4rem 0;
    display: flex;
    justify-content: space-between;

    .bold {
      font-weight: bold;
    }
  }

  button {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.6rem 0;
    background: #2053cd;
    color: white;
    margin: 5rem 0 0 0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: #3769df;
    }

    &.disabled {
      opacity: 0.6;
      cursor: none;
    }
  }
`;
