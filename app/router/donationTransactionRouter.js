const express = require("express");
const router = express.Router();
const donationTransactionController = require("../controllers/donationTransactionController");

router.post(
  "/create-donation-transaction",
  donationTransactionController.createDonationTransaction
);

module.exports = router;
