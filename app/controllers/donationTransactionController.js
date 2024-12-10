const status = require("http-status");
const response = require("../utils/response");
const donationTransactions = require("../models/DonationTransactionModel");
const Donation = require("../models/DonationModel");

const createDonationTransaction = async (req, res) => {
  try {
    const { donorID, donationID, message } = req.body;
    const donation = await Donation.findById(donationID);
    if (!donation) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "No donation  found",
            result
          )
        );
    }

    const donationTransaction = new donationTransactions({
      donorID,
      donationID,

      message,
    });
    await donationTransaction.save();

    const result = await donation.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessReponse(
          status.status.CREATED,
          "New donation transaction created successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while creating new donation transaction",
          error
        )
      );
  }
};
module.exports = {
  createDonationTransaction,
};
