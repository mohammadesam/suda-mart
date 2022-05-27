const mongoose = require("mongoose");

let ProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  color: String,
  numberOfOrders: Number,
  stock: Number,
  image: {
    data: Buffer,
    contentType: String,
  },
  label: [String],
  rates: [{ user: String, rating: Number }],
  offer: { available: Boolean, percent: Number },
});

module.exports = mongoose.model("products", ProductSchema);
