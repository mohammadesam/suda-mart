const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [],
  statue: String,
  user: String,
  date: mongoose.Schema.Types.Date,
});

module.exports = mongoose.model("orders", orderSchema);
