const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const upload = multer({ dest: path.join(__dirname + "/uploads/") });
Router.use(express.urlencoded({ extended: false }));

Router.get("/products", (req, res) => {
  Product.find({}, (err, products) => {
    if (err) res.send(err + "err");
    else {
      res.json(products);
    }
  });
});

Router.post("/product", upload.single("image"), (req, res) => {
  let { title, price, description, color, quantity, image } = req.body;
  console.log(req.file, image);
  let product = new Product({
    _id: mongoose.Types.ObjectId(),
    title,
    price,
    description,
    color,
    stock: quantity,
    numberOfOrder: 0,
    image: {
      data: fs.readFileSync(
        path.join(req.file.destination + req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
  });

  product
    .save()
    .then(() => {
      console.log("product add successfully");
      res.redirect("http://localhost:3000/dashboard/products");
    })
    .catch((err) => console.log("something went wrong", err));
});

module.exports = Router;
