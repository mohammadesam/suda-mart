const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const paypal = require("@paypal/checkout-server-sdk");
const userRouter = require("./routes/users");
const dashboardRoute = require("./routes/dashboard");
const orderRouter = require("./routes/orders");
const cors = require("cors");

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

// routes import
app.use("/api/users", userRouter);
app.use("/api/dashboard/orders", orderRouter);
app.use("/api/dashboard", dashboardRoute);

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
app.get("/", (req, res) => {
  res.send("|hello from /");
});

// payPal order
app.post("/api/makeOrder", async (req, res) => {
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

const PORT = process.env.PORT || 3500;
app.listen(PORT, console.log(`listing at port ${PORT}`));
