const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { authenticate } = require("passport");
const upload = multer({ dest: path.join(__dirname + "/uploads/") });
Router.use(express.json({ limit: "10mb" }));
Router.use(
  express.urlencoded({ extended: true, limit: "10mb", parameterLimit: 10000 })
);

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

Router.get("/products", async (req, res) => {
  Product.find({}, (err, products) => {
    if (err) res.send(err + "err");
    else {
      res.json(products);
    }
  });
});

Router.get("/products/:category", async (req, res) => {
  if (req.params.category === "الكل") {
    Product.find({}, (err, products) => {
      if (err) res.send(err + "err");
      else {
        res.json(products);
      }
    });
  } else if (req.params.category === "العروض المميزة") {
    try {
    const filteredProducts = await Product.find({'offer.available': true})
    res.json(filteredProducts)   
    } catch(err) {
      res.json({message: "cant retrive products", err: err})
    }
  } 
  
  else {
    console.log(req.params.category);
    Product.find({ label: req.params.category }, (err, products) => {
      if (err) res.send(err + "err");
      else {
        console.log(products);
        res.json(products);
      }
    });
  }
});

// Router.get("/clean-labels", (req, res) => {
//   Product.find({}, (err, products) => {
//     if (err) res.send(err + "err");
//     else {
//       products.forEach((product) => {
//         product.label = [];
//         product.save().then(() => console.log("saved"));
//       });
//       res.send("done");
//     }
//   });
// });

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
      rates: [],
    });

    product
      .save()
      .then(() => {
        console.log("product add successfully");
        deleteFile(path.join(req.file.destination + req.file.filename));
        res.redirect("/dashboard/products");
      })
      .catch((err) => console.log("something went wrong", err));
  }
);

Router.get("/product/:id", (req, res) => {
  console.log("current route is /product/id");
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

Router.post("/rate-product/:id", async (req, res) => {
  const { id } = req.params;
  const { rate, user_id } = req.body;

  if (!user_id)
    return res.send({
      success: false,
      msg: "user is not found please make sure you are logged in",
    });

  const product = await Product.findById(id);
  const user = await User.findById(user_id);
  const isRatedIndex = user.rates.findIndex((rate) => rate.productID == id);

  if (!user) {
    return res.json({
      success: false,
      message: "No such user is found please make sure you are logged in",
    });
  }

  if (isRatedIndex != -1) {
    return res.json({
      message: "You Already Rated this product before",
      success: false,
    });
  }

  product.rates.push({
    user: user._id,
    rating: rate,
  });

  try {
    await product.save();
    user.rates.push({
      productID: product._id,
      rate: rate,
    });
    await user.save();
    res.json({ success: true, message: "Voted ✔" });
  } catch (error) {
    res.json({
      success: false,
      message: "error happened while rating the product",
    });
  }
});

Router.get("/check-vote/:user_id/:product_id", async (req, res) => {
  const { user_id, product_id } = req.params;

  if (user_id === undefined || user_id === "undefined") {
    return res.json({
      success: false,
      message: "To Vote please make sure you are logged in",
    });
  }

  if (!product_id || product_id === "undefined") {
    return res.json({
      success: false,
      message: "Sorry No such product is found",
    });
  }

  const user = await User.findById(user_id);
  const isVoted = user.rates.find((rate) => rate.productID == product_id);
  if (isVoted)
    return res.json({
      success: false,
      message: "You Already Rated this product before",
    });
  res.json({ success: true });
});

Router.post(
  "/offers/add",
  checkAuthentication,
  AuthorizeAdmin,
  async (req, res) => {
    const { offer, id } = req.body;

    console.log(id, offer);

    if (!offer)
      return res.send({
        success: false,
        msg: "offer data is not valid",
      });

    const product = await Product.findById(id);
    product.offer = offer;

    try {
      await product.save();
      res.json({ success: true, message: "Offer Added ✔", product });
    } catch (error) {
      res.json({
        success: false,
        message: "error happened while adding offer",
      });
    }
  }
);

// Router.get("/repair", async (req, res) => {
//   const products = await Product.find({});
//   const users = await User.find({});

//   products.forEach(async (product) => {
//     product.rates = [];
//     await product.save();
//   });

//   users.forEach(async (user) => {
//     user.rates = [];
//     await user.save();
//   });

//   res.json(users);
// });

function deleteFile(filename) {
  fs.unlinkSync(filename);
}

module.exports = Router;
