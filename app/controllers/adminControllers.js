const asyncErrorHandler = require("../utils/asyncErrorHandler");
const adminService = require("../service/adminService");
const adminservice = new adminService();

//LOGIN
const login = asyncErrorHandler(async (req, res, next) => {
  const { Email, Password } = req.body;
  const token = await adminservice.login(Email, Password);
  res.status(201).json({
    status: "Success",
    message: "Successfully Authenticated",
    data: {
      token,
    },
  });
});
//GET ALL DATA
const getAllData = asyncErrorHandler(async (req, res, next) => {
  const Users = await adminservice.getData();
  return res.status(201).json({
    status: "Success",
    message: "Authorization  Successful",
    data: {
      Users,
    },
  });
});
//CREATE USER
const create = asyncErrorHandler(async (req, res, next) => {
  const data = req.body;
  const { userInfo, userAddress, userQualification } =
    await adminservice.create(data);
  res.status(201).json({
    status: "Success",
    message: "User created successfully",
    data: {
      userInfo,
      userAddress,
      userQualification,
    },
  });
});
//DELETE USER
const deleteUser = asyncErrorHandler(async (req, res, next) => {
  const id = req.params["id"];
  await adminservice.deleteUser(id);
  res.status(201).json({
    success: true,
    message: "User successfully deleted",
    data: {
      Deleted_user_id: id,
    },
  });
});
//UPDATE USER
const update = asyncErrorHandler(async function (req, res, next) {
  const UserId = req.params["id"];
  const data = req.body;
  const users = await adminservice.update(UserId, data);
  res.status(200).json({
    status: "Success",
    message: "User updated successfully",
    data: {
      users,
    },
  });
});
//FILE UPLOAD
const fileUpload = asyncErrorHandler(async (req, res, next) => {
  const UserId = req.params["id"];
  const resume = req.file;
  const UserInfo = await adminservice.fileUpload(UserId, resume);
  res.status(200).json({
    status: "Success",
    message: "User File updated successfully",
    data: {
      UserInfo,
    },
  });
});
//FORGOT PASSWORD
const forget_password = asyncErrorHandler(async (req, res, next) => {
  const Email = req.body;
  const data = req;
  await adminservice.forgetPassword(Email, data);
  res.status(200).json({
    status: "success",
    message: "password reset link send to the user email",
  });
});
//RESET PASSWORD
const reset_password = asyncErrorHandler(async (req, res, next) => {
  const checkToken = req.params.token;
  const data = req.body;
  const token = await adminservice.resetPassword(checkToken, data);
  res.status(201).json({
    status: "Success",
    message: "successfully password reset",
    data: {
      token,
    },
  });
});
module.exports = {
  getAllData,
  login,
  create,
  deleteUser,
  update,
  fileUpload,
  forget_password,
  reset_password,
};
