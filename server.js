const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const paypal = require("@paypal/checkout-server-sdk");
const userRouter = require("./routes/users");
const dashboardRoute = require("./routes/dashboard");
const orderRouter = require("./routes/orders");
const staticsRoute = require("./routes/statics");
const cors = require("cors");
const user = require("./models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const path = require("path");
const Environment =
  process.env.NODE_ENV === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET_KEY)
);
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());
app.use(express.json());

// passport initialize
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    maxAge: null,
  })
);

app.use(passport.initialize());
app.use(passport.session());
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

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}
// routes import
app.use("/api/users", userRouter);
app.use("/api/dashboard/orders", orderRouter);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/statics", staticsRoute);
//db
mongoose.connect(process.env.DATA_BASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => console.log("connection error"));
db.once("open", () => {
  console.log("database connected successfully");
});

// routes

// payPal order
app.post("/api/makeOrder", checkAuthentication, async (req, res) => {
  // request data
  const totalAmount = req.body.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const roundedAmount = Math.floor(totalAmount * 100) / 100;
  let shippingCost = req.body.shippingCost;
  let tax_total = req.body.tax_total;
  let discount = req.body.discount;
  let items = req.body.items.map((item) => {
    return {
      name: item.title,
      description: item.description,
      unit_amount: {
        currency_code: "USD",
        value: item.price,
      },
      quantity: item.quantity,
    };
  });

  const request = new paypal.orders.OrdersCreateRequest();
  // order
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: roundedAmount + tax_total + shippingCost - discount,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: roundedAmount,
            },
            shipping: {
              currency_code: "USD",
              value: shippingCost,
            },
            tax_total: {
              currency_code: "USD",
              value: tax_total,
            },
            discount: {
              currency_code: "USD",
              value: discount,
            },
          },
        },
        items: items,
      },
    ],
  });

  let order;
  try {
    order = await paypalClient.execute(request);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }

  console.log(order.result.id);
  res.status(200).json({
    orderId: order.result.id,
  });
});

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build"));
  });
}

const port = process.env.PORT || 3500;
app.listen(port, console.log(`listing at port ${port}`));
