import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../features/cartSlice";
import { addPunch } from "../features/cartSlice";
import Cookies from "js-cookie";
import ErrorPage from "./ErrorPage";
const STYLE = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
};

const style2 = {
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
};
let PayPalButton;
if (window.paypal != undefined) {
  PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
}

function Paypal() {
  let user =
    Cookies.get("user") != undefined
      ? JSON.parse(Cookies.get("user"))
      : undefined;
  console.log(user);
  let cart = useSelector(getCart);
  let history = useHistory();
  let dispatch = useDispatch();
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
    </div>
  );
}

export default Paypal;

/* 
sb-73u4d7308977@personal.example.com
System Generated Password:
N+EFOv47
*/
