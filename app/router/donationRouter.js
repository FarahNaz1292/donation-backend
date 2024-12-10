const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
// crud operation
router.post("/create-donations", donationController.createDonation);
router.get("/donations", donationController.getAllDonations);
router.get("/donations/:id", donationController.getSingleDonationById);
router.put("/donations/:id", donationController.updateSingleDonation);
router.delete("/donations/:id", donationController.deleteDonation);
module.exports = router;
