const status = require("http-status");
const donationTransactions = require("../models/DonationTransactionModel");
const fundraiserTransactions = require("../models/FundRaisingTransactionModel");
const response = require("../utils/response");

const allTransaction = async (req, res) => {
  try {
    const allDonationTransaction = await donationTransactions
      .find()
      .populate("donorID", "username email")
      .populate("donationID", "title amount category");
    const allFundraiserTransaction = await fundraiserTransactions
      .find()
      .populate("donorID", "title amount ")
      .populate("fundRaisingID", "title amount");
    const result = [...allDonationTransaction, ...allFundraiserTransaction];
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "All Data retrieved successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "An error occured during retrieving all Donation Transaction data",
          error
        )
      );
  }
};
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const allDonationTransaction = await donationTransactions
      .find({ donorID: id })
      .populate("donorID", "username email")
      .populate("donationID", "title amount category");
    const allFundraiserTransaction = await fundraiserTransactions
      .find({ donorID: id })
      .populate("donorID", "title amount category")
      .populate("fundraisingID", "title amount category");
    const result = [...allDonationTransaction, ...allFundraiserTransaction];
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "All Data retrieved successfully",
          result
        )
      );
  } catch (error) {}
};
module.exports = { allTransaction, getTransactionById };
