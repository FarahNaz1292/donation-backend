const mongoose = require("mongoose");

const fundRaisingModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "paused", "completed", "failed"],
      default: "active",
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Fundraising = mongoose.model("Fundraising", fundRaisingModel);
module.exports = Fundraising;
