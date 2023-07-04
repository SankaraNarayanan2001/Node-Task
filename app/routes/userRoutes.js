const router = require("express").Router();

const jwt = require("../middleware/jwtcheck");

const userController = require("../controllers/userControllers");

const validation = require("../middleware/validationCheck");

router.route("/loginuser").post(userController.loginUser);

router
  .route("/getUser")
  .get(jwt.user, validation.validateRegistration, userController.getUser);

module.exports = router;
