const router = require("express").Router();

const adminController = require("../controllers/adminControllers");

const { validateRegistration } = require("../middleware/validationCheck");

const jwt = require("../middleware/jwtcheck");

const upload = require("../middleware/Fileupload");

router.route("/login").post(validateRegistration, adminController.login);

router.route("/getdata").get(jwt.admin, adminController.getAllData);

router
  .route("/create")
  .post(
    jwt.admin,
    upload.single("Resume"),
    validateRegistration,
    adminController.create
  );

router.route("/delete/:id").delete(jwt.admin, adminController.deleteUser);

router
  .route("/update/:id")
  .put(jwt.admin, validateRegistration, adminController.update);

router
  .route("/fileupload/:id")
  .put(jwt.admin, upload.single("Resume"), adminController.fileUpload);

router.route("/forget_password").post(adminController.forget_password);

router
  .route("/reset_password/:token")
  .patch(validateRegistration, adminController.reset_password);

module.exports = router;
