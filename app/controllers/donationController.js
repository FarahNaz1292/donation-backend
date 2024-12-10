const status = require("http-status");
const response = require("../utils/response");

const Donation = require("../models/DonationModel");

const createDonation = async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    const result = await newDonation.save();
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
const getAllDonations = async (req, res) => {
  try {
    const result = await Donation.find();
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "All donations retrieved succesfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while retrieving all donations",
          error
        )
      );
  }
};
const getSingleDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Donation.findById(id);
    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "Donation not found"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "A donation retrieved Successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while retrieving a donation",
          error
        )
      );
  }
};
const updateSingleDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const result = await Donation.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "Donation not found"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "A donation updated Successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while retrieving a donation",
          error
        )
      );
  }
};
const deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Donation.findByIdAndDelete(id);
    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "Donation not found"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "Donation deleted successfully"
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while retrieving a donation",
          error
        )
      );
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getSingleDonationById,
  updateSingleDonation,
  deleteDonation,
};
