const mongoose = require("mongoose");

const AppSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  myID: Number,
  aedRate: Number,
  catagories: [],
});

module.exports = mongoose.model("app", AppSchema);
