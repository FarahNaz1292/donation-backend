const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      userName: user.userName,
      email: user.email,
      profilePicture: user.profilePicture,
      role: user.role,
    },
    process.env.TOKEN,
    { expiresIn: process.env.TOKEN_EXPIRATION }
  );
  return token;
};
module.exports = generateToken;
