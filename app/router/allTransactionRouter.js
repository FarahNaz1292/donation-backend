const express = require("express");
const router = express.Router();
const allTransactions = require("../controllers/AllTransaction");
const { route } = require("./userRouter");
// crud operation
router.get("/all-transactions", allTransactions.allTransaction);
router.get("/get-transactions/:id", allTransactions.getTransactionById);
module.exports = router;
