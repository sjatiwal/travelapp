const express = require("express");
const router = express.Router();

const {
  newTravel,
  getPaymentDetails,
} = require("../controllers/travelController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/travel/new").post(isAuthenticatedUser, newTravel);
router.route("/paymentDetails").get(isAuthenticatedUser, getPaymentDetails);

module.exports = router;
