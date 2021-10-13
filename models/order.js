const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [],
  status: String,
  user: String,
  total: Number,
  date: mongoose.Schema.Types.Date,
});

module.exports = mongoose.model("orders", orderSchema);
