const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const appError = require("../utils/appError");

const admin = asyncErrorHandler(async (req, res, next) => {
  const token = req.header("token");

  // CHECK IF WE EVEN HAVE A TOKEN
  if (!token) {
    return next(new appError(400, "No Token Found"));
  }
  const user = jwt.verify(token, process.env.JWT_ADMIN);
  req.user = user.Email;
  next();
});

const user = asyncErrorHandler(async (req, res, next) => {
  const token = req.header("token");

  // CHECK IF WE EVEN HAVE A TOKEN
  if (!token) {
    return next(new appError(400, "No Token Found"));
  }
  const user = jwt.verify(token, process.env.JWT_USER);
  req.user = user.Email;
  next();
});

module.exports = { admin, user };
