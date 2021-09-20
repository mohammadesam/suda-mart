const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
