const mongoose = require("mongoose");

const donationTransactionSchema = new mongoose.Schema(
  {
    donorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    donationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },

    message: { type: String },
  },
  { timestamps: true }
);
const donationTransaction = mongoose.model(
  "donationTransaction",
  donationTransactionSchema
);
module.exports = donationTransaction;
