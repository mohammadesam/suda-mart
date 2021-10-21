const express = require("express");
const app = express();
const Router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const user = require("../models/user");

// middle wares
Router.use(express.urlencoded({ extended: false }));

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

function AuthorizeAdmin(req, res, next) {
  if (req.user.role !== "admin") return res.redirect("/404");
  next();
}
// routes

Router.get("/", checkAuthentication, AuthorizeAdmin, (req, res) => {
  user.find({}, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
});

Router.post("/login", passport.authenticate("local"), (req, res) => {
  if (!req.user)
    return res.json({
      success: false,
      msg: "your email or password are not correct please check them and try again",
    });

  // if user successfully logged in
  let { name, email, role, _id } = req.user;
  res.cookie("user", JSON.stringify({ name, email, role, _id }), {
    maxAge: 6000000,
  });
  res.send({ success: true });
});

Router.post("/register", async (req, res) => {
  let matchEmail = await user.findOne({ email: req.body.email });
  if (matchEmail != undefined) {
    return res.redirect("http://localhost:3000/login?msg=registered");
  } else {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = new user({
      _id: mongoose.Types.ObjectId(),
      name: req.body.firstName,
      email: req.body.email,
      password: hashedPassword,
      role: "client",
    });

    newUser.save().then(() => {
      console.log("successfully registered");
      res.redirect("http://localhost:3000/login");
    });
  }
});

Router.get("/logout", (req, res) => {
  req.logOut();
  res.clearCookie("user");
  res.redirect("http://localhost:3000");
});

module.exports = Router;
