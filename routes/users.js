const express = require("express");
const app = express();
const Router = express.Router();
const mongoose = require("mongoose");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");

// middle wares
Router.use(express.urlencoded({ extended: false }));
Router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
Router.use(passport.initialize());
Router.use(passport.session());
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (username, password, done) => {
      user.findOne({ email: username }, async (err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: "incorrect email" });
        }
        let validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return done(null, false, { message: "incorrect password" });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  user.findById(id, (err, user) => {
    done(err, user);
  });
});
// routes

Router.get("/", (req, res) => {
  user.find({}, (err, result) => {
    if (err) res.send(err);
    else res.send(result);
  });
});

Router.post("/login", passport.authenticate("local"), (req, res) => {
  let { name, email, role, _id } = req.user;
  res.cookie("user", JSON.stringify({ name, email, role, _id }), {
    maxAge: 6000000,
  });
  console.log(req.user);
  if (!req.user) res.redirect("http://localhost:3000/login?msg=error");
  else res.redirect("http://localhost:3000/");
});

Router.post("/register", async (req, res) => {
  let matchEmail = await user.findOne({ email: req.body.email });
  if (matchEmail != undefined) {
    return res.redirect("http://localhost:3000/login?msg=registered");
  } else {
    console.log(req.body);

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
