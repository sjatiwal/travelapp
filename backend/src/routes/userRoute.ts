import express from "express";
const router = express.Router();
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserDetails,
  updateProfile,
  changePassword,
} = require("../controllers/userControllers");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/logout").get(logoutUser);
router.route("/update/profile").post(isAuthenticatedUser, updateProfile);
router.route("/changepassword").post(isAuthenticatedUser, changePassword);

module.exports = router;
