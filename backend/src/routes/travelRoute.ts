const express = require("express");
const router = express.Router();

const {
  createNewTravel,
  getTravelDetails,
  deleteTravelDetails,
} = require("../controllers/travelController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/travel/new").post(isAuthenticatedUser, createNewTravel);
router.route("/traveldetails").get(isAuthenticatedUser, getTravelDetails);
router
  .route("/traveldetails/user/:id")
  .delete(isAuthenticatedUser, deleteTravelDetails);

module.exports = router;
