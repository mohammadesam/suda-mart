const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const upload = multer({ dest: path.join(__dirname + "/uploads/") });
Router.use(express.urlencoded({ extended: false }));

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

function AuthorizeAdmin(req, res, next) {
  console.log(req.user);
  if (req.user.role !== "admin") return res.redirect("/404");
  next();
}

Router.get("/products", (req, res) => {
  Product.find({}, (err, products) => {
    if (err) res.send(err + "err");
    else {
      res.json(products);
    }
  });
});

Router.post(
  "/product",
  checkAuthentication,
  AuthorizeAdmin,
  upload.single("image"),
  (req, res) => {
    let { title, price, description, color, quantity, image, label } = req.body;
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
      label,
    });

    product
      .save()
      .then(() => {
        console.log("product add successfully");
        deleteFile(path.join(req.file.destination + req.file.filename));
        res.redirect("http://localhost:3000/dashboard/products");
      })
      .catch((err) => console.log("something went wrong", err));
  }
);

Router.get("/product/:id", async (req, res) => {
  console.log("test");
  Product.findById(req.params.id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.status(500).send("product not found");
    });
});

Router.post("/deleteProduct", AuthorizeAdmin, (req, res) => {
  Product.deleteOne({ _id: req.body.id }, (err) => {
    if (err) console.log(err);
    else console.log("deleted successfully");
    res.send("done");
  });
});

Router.post(
  "/product/update/:id",
  checkAuthentication,
  AuthorizeAdmin,
  (req, res) => {
    let { title, label, color, price, stock, description } = req.body;
    Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        label,
        description,
        color,
        stock,
        price,
      },
      { useFindAndModify: false }
    )
      .then(() => {
        console.log("product updated");
        res.json({ success: true });
      })
      .catch((err) => {
        res.send({ success: false, msg: "error happened" });
        console.log(err);
      });
  }
);

function deleteFile(filename) {
  fs.unlinkSync(filename);
}

module.exports = Router;
