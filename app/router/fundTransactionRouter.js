const express = require("express");
const router = express.Router();
const fundraisingTransactionController = require("../controllers/fundraisingTransactionController");

router.post(
  "/create-transaction",
  fundraisingTransactionController.createTransaction
);

module.exports = router;
