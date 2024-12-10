const status = require("http-status");
const response = require("../utils/response");
const Fundraising = require("../models/FundraisingModel");

const createFund = async (req, res) => {
  try {
    const newFund = new Fundraising(req.body);
    const result = await newFund.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessReponse(
          status.status.CREATED,
          "New Donation created succesfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while creating new donation",
          error
        )
      );
  }
};
const updateFund = async (req, res) => {
  const { id } = req.params;
  const updateFund = req.body;
  try {
    const result = await Fundraising.findByIdAndUpdate(id, updateFund, {
      new: true,
    });
    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "Fund not found",
            error
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          " Fund Updated successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while creating new donation",
          error
        )
      );
  }
};
const findSingleFundByID = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Fundraising.findById(id);
    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "Fund not found"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "Fund Retrieved successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while creating new donation",
          error
        )
      );
  }
};
const getAllFunds = async (req, res) => {
  try {
    const result = await Fundraising.find();
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "Fund Retrieved successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while creating new donation",
          error
        )
      );
  }
};
const deleteFund = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Fundraising.findByIdAndDelete(id);
    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "Fund not found"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "Fund deleted successfully"
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while retrieving a Fund",
          error
        )
      );
  }
};

module.exports = {
  createFund,
  updateFund,
  findSingleFundByID,
  getAllFunds,
  deleteFund,
};
