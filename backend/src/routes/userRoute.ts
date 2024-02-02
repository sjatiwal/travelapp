import express from "express";
const router = express.Router();
const {
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/userControllers");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").get(logoutUser);

module.exports = router;
