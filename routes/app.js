const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const App = require("../models/app");

Router.get("/", async (req, res) => {
  const setting = await App.find({ myID: 1 });
  res.json(setting);
});

Router.post("/catagories", async (req, res) => {
  const { catagories } = req.body;
  const app = await App.findOneAndUpdate(
    { myID: 1 },
    { catagories },
    { useFindAndModify: false }
  )
    .then(() => res.json({ status: "success", message: "catagories updated" }))
    .catch((err) => res.json({ status: "error", message: err }));
});

Router.post("/aedRate", (req, res) => {
  const { aedRate } = req.body;
  const app = App.findOneAndUpdate(
    { myID: 1 },
    { aedRate },
    { useFindAndModify: false }
  )
    .then(() =>
      res.json({ status: "success", message: "aedRate updated", aedRate })
    )
    .catch((err) => res.json({ status: "error", message: err }));
});

module.exports = Router;
