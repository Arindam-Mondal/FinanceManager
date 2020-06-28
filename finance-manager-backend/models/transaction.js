const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Transaction", transactionSchema);
