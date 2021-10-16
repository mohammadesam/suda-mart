import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../features/cartSlice";
import { addPunch } from "../features/cartSlice";
import Cookies from "js-cookie";
import ErrorPage from "./ErrorPage";
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

const style2 = {
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
};

const buttonStyle = {
  borderRadius: 5,
  padding: "5px 10px",
  background: "#FD4056",
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

let PayPalButton;
if (window.paypal !== undefined) {
  PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
}

function Paypal() {
  let user =
    Cookies.get("user") !== undefined
      ? JSON.parse(Cookies.get("user"))
      : undefined;
  console.log(user);
  let cart = useSelector(getCart);
  let history = useHistory();
  let dispatch = useDispatch();

  const HandleTestOrder = async () => {
    await fetch("/api/dashboard/orders/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartData: localStorage.getItem("cart"),
        user: user._id,
      }),
    });
    localStorage.removeItem("cart");
    dispatch(addPunch([]));
    history.push("success");
  };
  const createOrder = () => {
    return fetch("/api/makeOrder", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        shippingCost: 5,
        discount: 0,
        tax_total: 2,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        return data.orderId;
      });
  };

  //   action.order.create({
  //     intent: "CAPTURE",
  //     purchase_units: [
  //       {
  //         description: "Your description",
  //         amount: {
  //           currency_code: "USD",
  //           value: amount,
  //         },
  //       },
  //     ],
  //   });

  const onApprove = async (data, action) => {
    const order = await action.order.capture();
    console.log(order);
    // todo make recite

    await fetch("/api/dashboard/orders/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartData: localStorage.getItem("cart"),
        user: user._id,
      }),
    });
    localStorage.removeItem("cart");
    dispatch(addPunch([]));
    history.push("success");
  };

  const onError = (err) => {
    console.log(err);
    // todo make detailed ui
    history.push("/");
  };

  return (
    <div style={STYLE}>
      <Link to="/cart">
        <ArrowBackIcon style={ArrowBackStyle} />
      </Link>
      {PayPalButton === undefined ? (
        <ErrorPage msg="Failed to Load paypal page please check your connection and reload the page" />
      ) : (
        <PayPalButton
          style={style2}
          createOrder={(data, action) => createOrder(data, action)}
          onApprove={(data, action) => onApprove(data, action)}
          onError={(err) => onError(err)}
        />
      )}
      <IconButton style={buttonStyle} onClick={HandleTestOrder}>
        <LocalOfferIcon /> <Typography>Test for Free</Typography>
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
