const User = require("../models/UserModel");
const generateToken = require("../utils/token");
const status = require("http-status");
const response = require("../utils/response");

const signup = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessReponse(
          status.status.CREATED,
          "User created succesfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "An error occured while creating a user",
          error
        )
      );
  }
};
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.userNotFoundResponse(
            status.status.NOT_FOUND,
            "User not found"
          )
        );
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(status.status.UNAUTHORIZED)
        .send(
          response.invalidPasswordResponse(
            status.status.UNAUTHORIZED,
            "Invalid password"
          )
        );
    }
    const token = generateToken(user);

    res.cookie("accessToken", token, {
      secure: true,
      httpOnly: false,
      maxAge: 60 * 60 * 1000,
    });

    res
      .status(status.status.OK)
      .send(
        response.loginResponse(
          status.status.OK,
          "User Logged in Succesfully",
          user
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "An error occured while logging in",
          error
        )
      );
  }
};
const getAllUsers = async (req, res) => {
  try {
    const result = await User.find();
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "All Users Retrieved",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while retrieving all Users",
          error
        )
      );
  }
};
const findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "User not found"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "User retrieved Successfully",
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
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = req.body;
    const result = await User.findByIdAndUpdate(id, updateUser, { new: true });
    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "User not found"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "User Updated succesfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while retrieving the user"
        )
      );
  }
};

const delelteUser = async (res, req) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "User not found"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessReponse(
          status.status.OK,
          "User deleted successfully"
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured while retrieving the User",
          error
        )
      );
  }
};

module.exports = {
  signup,
  signin,
  getAllUsers,
  findUser,
  updateUser,
  delelteUser,
};
