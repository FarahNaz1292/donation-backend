const express = require("express");
const router = express.Router();
const fundraisingController = require("../controllers/fundraisingController");

router.post("/create-fund", fundraisingController.createFund);
router.put("/update-fund/:id", fundraisingController.updateFund);
router.get("/single-fund/:id", fundraisingController.findSingleFundByID);
router.get("/funds", fundraisingController.getAllFunds);
router.delete("/delete-fund/:id", fundraisingController.deleteFund);

module.exports = router;
