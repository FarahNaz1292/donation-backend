const status = require("http-status");

const createSuccessReponse = (statusCode, message, data) => {
  return {
    status: "Success",
    statusCode,
    message,
    data,
  };
};
const createErrorResponse = (
  statusCode,
  message,
  error = "An error occured"
) => {
  return {
    status: "Error",
    statusCode,
    message,
    error,
  };
};
const userNotFoundResponse = (statusCode, message, error) => {
  return {
    status: "Error",
    statusCode,
    message,
    error,
  };
};
const invalidPasswordResponse = (statusCode, message, error) => {
  return {
    status: "Error",
    statusCode,
    message,
    error,
  };
};

const loginResponse = (statusCode, message, data) => {
  return {
    status: "Success",
    statusCode,
    message,
    data,
  };
};

module.exports = {
  createSuccessReponse,
  createErrorResponse,
  userNotFoundResponse,
  invalidPasswordResponse,
  loginResponse,
};
