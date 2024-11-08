const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users.controller");

router.route("/createuser").post(userController.createUser);

router.route("/signup-verify/:token").get(userController.verifyEmail);

router.route("/login").post(userController.loginUser);

router.route("/dashboard_all_user").get(userController.getAllUser);

router
  .route("/:id")
  .put(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
