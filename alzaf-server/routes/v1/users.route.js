const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users.controller");
const verifyToken = require("../../middleware/verifyToken");
const verifyAdmin = require("../../middleware/verifyAdmin");
// user create
router.route("/createuser").post(userController.createUser);
// verify token when sign up and forget password
router.route("/signup-verify/:token").get(userController.verifyEmail);
// find and get user
router.route("/login").post(userController.loginUser);

// forget password
router.get("/forget-password", userController.forgetPassword);
// forget pass send email
router.patch("/forget-password", userController.sendEmailForgetPass);
// after send email when user go to change pass
router.patch("/reset-password", userController.resetPassword);

//get full user detials
// router.route("/getsingleuser").get(userController.getUserDetailsById);

module.exports = router;
