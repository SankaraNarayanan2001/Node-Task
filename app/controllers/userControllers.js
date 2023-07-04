const user_info = require("../models/user_info");

const user_address = require('../models/user_address');

const appError = require('../utils/appError')

const user_qualification = require('../models/user_qulification');

const asyncErrorHandler = require('../utils/asyncErrorHandler')

require('dotenv').config();

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

//LOGIN USER
const loginUser = asyncErrorHandler(async (req, res, next) => {


  const { Email, Password } = req.body;


  if (!Email || !Password) {
    return next(new appError(400, "Email and password are required"));
  }

  const UserId = await user_info.findOne({ where: { Email } });

  if (!UserId || UserId.id == '1') {
    return next(new appError(404, "User not found"));
  }

  const passwordcompare = await bcrypt.compare(Password, UserId.Password)

  if (Email === UserId.Email && passwordcompare) {

    const token = jwt.sign({
      Email
    }, process.env.JWT_USER)

    res.status(201).json({
      status: 'Success',
      message: 'Successfully Authenticated',
      data: {
        token
      }
    });


  }
  else {
    return next(new appError(500, "Username or password incorrect"));
  }
})

//GET USER
const getUser = asyncErrorHandler(async (req, res, next) => {

  const Email = req.user

  const users = await user_info.findOne({
    where: { Email },
    include: [
      { model: user_address },
      { model: user_qualification },
    ]
  });
  return res.status(201).json({
    status: 'success',
    message: 'Authorization  Successful',
    data: {
      users
    }
  });

})
module.exports = { loginUser, getUser };