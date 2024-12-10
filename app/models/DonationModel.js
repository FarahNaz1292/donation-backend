const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    Thumbnail: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
