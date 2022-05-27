const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  numberOfOrders: Number,
  role: {
    type: String,
    required: true,
  },
  rates: [
    {
      productID: String,
      rate: Number,
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
