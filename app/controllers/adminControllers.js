const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const crypto = require('crypto');

const sendEmail = require('../utils/email')

const user_qualification = require('../models/user_qulification')

const user_address = require('../models/user_address');

const user_info = require('../models/user_info');

const asyncErrorHandler = require('../utils/asyncErrorHandler');

const appError = require('../utils/appError');

const sequelize = require('../config/db');

//LOGIN
const login = async (req, res, next) => {

  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return next(new appError(400, "Email and password are required"));

  }

  const User = await user_info.findOne();

  const passwordcompare = await bcrypt.compare(Password, User.Password)

  if (Email === User.Email && passwordcompare) {

    const token = jwt.sign({
      Email
    }, process.env.JWT_ADMIN, { expiresIn: '1h' })

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
}

//GET ALL DATA
const getAllData = asyncErrorHandler(async (req, res, next) => {


  const Users = await user_info.findAll({
    include: [
      { model: user_address },
      { model: user_qualification },
    ]
  });
  return res.status(201).json({
    status: 'Success',
    message: 'Authorization  Successful',
    data: {
      Users
    }
  });

})


//CREATE USER
const create = asyncErrorHandler(async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const userInfo = await user_info.create(
      { ...req.body, Password: await bcrypt.hash(req.body.Password, 10) },
      { transaction: t }
    );
    const userAddress = await user_address.create(
      { ...req.body, User_info_id: userInfo.id },
      { transaction: t }
    );

    const userQualification = await user_qualification.create(
      { ...req.body, User_info_id: userInfo.id },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      status: 'Success',
      message: 'User created successfully',
      data: {
        userInfo,
        userAddress,
        userQualification
      }
    });
  } catch (err) {
    await t.rollback();
    return next(new appError(500, err.errors[0].message));

  }

})


//DELETE USER
const deleteUser = asyncErrorHandler(async (req, res, next) => {
  const id = req.params['id'];

  const User = await user_info.findOne({
    where: {
      id: id
    }
  });

  if (!User) {
    return next(new appError(404, "User not found"));
  }

  await user_info.destroy({
    where: {
      id: id
    }
  });

  res.status(201).json({
    success: true,
    message: 'User successfully deleted',
    data: {
      Deleted_user_id: id
    }
  });

});


//UPDATE USER
const update = asyncErrorHandler(async function (req, res, next) {
  const UserId = req.params['id'];

  const UserInfo = await user_info.findOne({ where: { id: UserId } });

  if (!UserInfo) {
    return next(new appError(404, "User not found"));
  }

  const updatedUser = {
    ...req.body,
  };
  if (req.body.Password) {
    return next(new appError(404, "User not able to update password, if you want to update click forgot password"));
  }

  await UserInfo.update(updatedUser);

  const Useraddress = await user_address.findOne({ where: { User_info_id: UserId } });
  if (!Useraddress) {
    return next(new appError(404, "User not found"));
  }

  await Useraddress.update(req.body);

  const Userqulification = await user_qualification.findOne({ where: { User_info_id: UserId } });
  if (!Userqulification) {
    return next(new appError(404, "User not found"));
  }

  await Userqulification.update(req.body);

  const users = await user_info.findOne({
    where: { id: UserId },
    include: [
      { model: user_address },
      { model: user_qualification },
    ]
  });

  res.status(200).json({
    status: 'Success',
    message: 'User updated successfully',
    data: {
      users
    }
  });
});


//FILE UPLOAD
const fileUpload = asyncErrorHandler(async (req, res, next) => {
  const UserId = req.params['id'];

  const UserInfo = await user_info.findOne({ where: { id: UserId } });

  if (!UserInfo) {
    return next(new appError(404, "User not found"));
  }

  const resume = req.file;
  if (!resume) {
    return next(new appError(404, "please upload file"));
  }
  const updated = {
    Resume: resume ? await resume.filename : UserInfo.Resume,   // USING TERNARY OPERATOR 
  }
  await UserInfo.update(updated);

  res.status(200).json({
    status: 'Success',
    message: 'User File updated successfully',
    data: {
      UserInfo
    }
  });
})

//FORGOT PASSWORD
const forget_password = asyncErrorHandler(async (req, res, next) => {


 
  //1. Get User BASED ON POSTED EMAIL
  const Email = req.body;

  const user = await user_info.findOne({ where: Email });

  const generateForgotPasswordEmail = (resetLink) => {
    return `
      <h1>Reset Your Password</h1>
      <p>Hello ${user.FirstName},</p>
      <p>You have requested to reset your password. Click on the link below to create a new password:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,</p>
      <p>Support Team</p>
    `;
  };


  if (!user) {
    return next(new appError(404, "we could not find the user with the given email"));
  }

  //2.GENERATE A RANDOM TOKEN
  var resetToken = crypto.randomBytes(32).toString('hex');

  user.RestToken = resetToken;
  user.save();

  //3.SEND THE TOKEN BACK TO THE USER EMAIL
  const resetUrl = `${req.protocol}://${req.get('host')}/reset_password/${resetToken}`;
 
  try {
    await sendEmail({
      Email: user.Email,
      subject: 'password change request received',
      html:generateForgotPasswordEmail(resetUrl)
    });

    res.status(200).json({
      status: 'success',
      message: 'password reset link send to the user email'
    });
  } catch (err) {
    return next(new appError(500, "There was a error"));
  }

})


//RESET PASSWORD
const reset_password = async (req, res, next) => {

  const checkToken = req.params.token;
  const user = await user_info.findOne({
    where: {
      RestToken: checkToken
    }
  });


  if (!user) {
    return next(new appError(500, "Token is invalid"));
  }

  user.Password = req.body.Password ? await bcrypt.hash(req.body.Password, 10) : user.Password;
  user.RestToken = null;

  user.save();

  const Email = user.Email;
  const token = jwt.sign({
    Email
  }, process.env.JWT_ADMIN, { expiresIn: '1h' })

  res.status(201).json({
    status: 'Success',
    message: 'successfully password reset',
    data: {
      token
    }
  });
}
module.exports = { getAllData, login, create, deleteUser, update, fileUpload, forget_password, reset_password };
