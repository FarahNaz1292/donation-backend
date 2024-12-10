const status = require("http-status");
const response = require("../utils/response");
const Fundraising = require("../models/FundraisingModel");
const fundRaisingTransaction = require("../models/FundRaisingTransactionModel");

const createTransaction = async (req, res) => {
  try {
    const { donorID, fundRaisingID, amount, message } = req.body;
    const fundRaising = await Fundraising.findById(fundRaisingID);
    if (!fundRaising) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "No fundraising Transaction found",
            result
          )
        );
    }

    const transaction = new fundRaisingTransaction({
      donorID,
      fundRaisingID,
      amount,
      message,
    });
    await transaction.save();
    fundRaising.amount += amount;

    const result = await fundRaising.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessReponse(
          status.status.CREATED,
          "New fund raising transaction created successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while creating new fund transaction",
          error
        )
      );
  }
};
module.exports = {
  createTransaction,
};
