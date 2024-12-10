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

module.exports = {
  signup,
  signin,
};
