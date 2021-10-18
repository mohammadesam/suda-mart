const express = require("express");
const Router = express.Router();
const Order = require("../models/order");
const Products = require("../models/product");
const Users = require("../models/user");
const mongoose = require("mongoose");

Router.get("/detailed/:id", async (req, res) => {
  let detailedOrders = [];
  const orderData = await Order.findById(req.params.id);

  let user = await Users.findOne({ _id: orderData.user });
  let products = [];
  let IDArr = orderData.products.map((p) => p.id);
  for await (const product of Products.find({
    _id: { $in: IDArr },
  })) {
    products.push({
      product,
      quantity: orderData.products.find((p) => p.id == product._id).quantity,
    });
  }

  const productsTotalPrice = products.reduce(
    (sum, product) => sum + product.product.price * product.quantity,
    0
  );
  let currentOrder = {
    _id: orderData._id,
    status: orderData.status,
    date: getTimePassed(orderData.date),
    products,
    user,
    title: products.reduce((sum, product) => sum + product.quantity, 0),
    price: Math.floor(productsTotalPrice * 100) / 100,
  };
  detailedOrders.push(currentOrder);
  res.json(detailedOrders);
});

Router.get("/short", async (req, res) => {
  let detailedOrders = [];
  for await (const orderData of Order.find()) {
    let user = await Users.findOne({ _id: orderData.user });
    let products = [];
    let IDArr = orderData.products.map((p) => p.id);
    for await (const product of Products.find({
      _id: { $in: IDArr },
    })) {
      products.push({
        product,
        quantity: orderData.products.find((p) => p.id == product._id).quantity,
      });
    }

    let productsTotalPrice = products.reduce(
      (sum, product) => sum + product.product.price * product.quantity,
      0
    );
    let currentOrder = {
      id: orderData._id,
      status: orderData.status,
      title:
        products.reduce((sum, product) => sum + product.quantity, 0) +
        " products",
      date: orderData.date,
      price: Math.floor(productsTotalPrice * 100) / 100,
      user: user.name,
    };
    detailedOrders.push(currentOrder);
  }
  res.json(detailedOrders);
});

Router.post("/add", (req, res) => {
  let { user } = req.body;
  let cart = JSON.parse(req.body.cartData);
  console.log(cart, user);
  let newOrder = new Order({
    _id: mongoose.Types.ObjectId(),
    products: cart.map((product) => ({
      id: product._id,
      quantity: product.quantity,
    })),
    status: "paid",
    user,
    total: cart.reduce(
      (sum, product) => (sum += product.price * product.quantity),
      0
    ),
    date: new Date().getTime(),
  });

  newOrder
    .save()
    .then(() => {
      console.log("order saved");
      cart.map((product) => {
        Products.findOneAndUpdate(
          { _id: product._id },
          {
            $inc: { stock: product.quantity * -1 },
          },
          { useFindAndModify: false }
        ).then(() => {
          console.log("product stock number updated");
        });

        Products.findOneAndUpdate(
          { _id: product._id },
          {
            $inc: { numberOfOrders: product.quantity },
          },
          { useFindAndModify: false }
        ).then(() => {
          console.log("product orders number updated");
        });
      });
      res.send("saved");
    })
    .catch((err) => {
      console.log("order not saved /n" + err);
      res.send(err);
    });
});

Router.get("/deliver/:id", (req, res) => {
  if (req.params.id === undefined) res.status(500).send("bad id");
  Order.findByIdAndUpdate(
    req.params.id,
    { status: "delivered" },
    { useFindAndModify: false }
  )
    .then(() => {
      console.log("order updated");
      res.redirect("http://localhost:3000/dashboard/orders");
    })
    .catch((err) => {
      console.log(err);
    });
});

Router.get("/userOrders/:id", async (req, res) => {
  Order.find({ user: req.params.id })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

Router.get("/delete/:id", (req, res) => {
  Order.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("order deleted successfully");
      res.send("order deleted");
    })
    .catch((err) => {
      console.log(err);
      res.send("error");
    });
});

module.exports = Router;

function getTimePassed(date) {
  // dc date Constructor
  let dc = new Date(date).getTime();
  let nowDate = new Date().getTime();

  let diff = nowDate - dc;
  let min = {
    value: Math.floor(diff / (1000 * 60)),
    name: "Minutes Ago",
  };
  let hours = {
    value: Math.floor(diff / (1000 * 60 * 60)),
    name: "Hours Ago",
  };
  let days = {
    value: Math.floor(diff / (1000 * 60 * 60 * 24)),
    name: "Days age",
  };
  let weeks = {
    value: Math.floor(diff / (1000 * 60 * 60 * 24 * 7)),
    name: "Weeks Ago",
  };
  let months = {
    value: Math.floor(diff / (1000 * 60 * 60 * 24 * 30)),
    name: "Months Ago",
  };
  //let years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12) )

  let time = [min, hours, days, weeks, months];
  console.log(min.value);
  if (min.value < 1) return "Just Now";

  for (let i = 0; i < time.length; i++) {
    let one = time[i];
    if (one.value === 0) {
      return `${time[i - 1].value} ${time[i - 1].name}`;
    }
  }
  return `${time[time.length - 1].value} ${time[time.length - 1].name}`;
}
