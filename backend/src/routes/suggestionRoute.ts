import express from "express";
const router = express.Router();
const { suggestion } = require("../controllers/suggestionController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/messageSent").post(isAuthenticatedUser, suggestion);

module.exports = router;
