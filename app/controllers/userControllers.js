const asyncErrorHandler = require('../utils/asyncErrorHandler');
const userService = require('../service/userService');
const userservice = new userService();

//LOGIN USER
const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { Email, Password } = req.body;
  const token = await userservice.loginUser(Email, Password);
  res.status(201).json({
    status: 'Success',
    message: 'Successfully Authenticated',
    data: {
      token
    }
  });
})

//GET USER
const getUser = asyncErrorHandler(async (req, res, next) => {

  const Email = req.user
  const users = await userservice.getUser(Email);
  return res.status(201).json({
    status: 'success',
    message: 'Authorization  Successful',
    data: {
      users
    }
  });

})
module.exports = { loginUser, getUser };