const express = require("express");
const Router = express.Router();
const Products = require("../models/product");
const Users = require("../models/user");
const Orders = require("../models/order");

function AuthorizeAdmin(req, res, next) {
  if (req.user.role !== "admin") return res.redirect("/404");
  next();
}
Router.use(AuthorizeAdmin);

Router.get("/profits", async (req, res) => {
  let ordersData = await Orders.find({});
  const numberOfOrders = ordersData.length;
  const DeliveredOrders = ordersData.filter(
    (order) => order.status === "delivered"
  ).length;
  const DeliverPercent = Math.round((DeliveredOrders / numberOfOrders) * 100);
  let totalProfits = ordersData.reduce(
    (sum, order) => sum + (order.total || 0),
    0
  );
  const finalStatics = [
    { Profits: Math.floor(totalProfits * 100) / 100 },
    { "Total Orders": numberOfOrders },
    { "Delivered Orders": DeliveredOrders, percent: DeliverPercent },
  ];
  console.log(finalStatics);
  res.json(finalStatics);
});

module.exports = Router;
