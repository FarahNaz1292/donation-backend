const mongoose = require("mongoose");

const fundRaisingTransactionSchema = new mongoose.Schema(
  {
    donorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fundRaisingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fundraising",
      required: true,
    },
    amount: { type: Number, require: true },
    message: { type: String },
  },
  { timestamps: true }
);
const fundRaisingTransaction = mongoose.model(
  "fundRaisingTransaction",
  fundRaisingTransactionSchema
);
module.exports = fundRaisingTransaction;
