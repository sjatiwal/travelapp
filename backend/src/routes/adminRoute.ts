import express from "express";
const router = express.Router();

const {
  getAllUsers,
  getAllSuggestions,
  getAllTravelDetails,
  deleteUser,
  deleteSuggestion,
  deleteTravelDetail,
} = require("../controllers/adminController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router
  .route("/admin/getallusers")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
router
  .route("/admin/getallsuggestions")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllSuggestions);
router
  .route("/admin/getalltraveldetails")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllTravelDetails);
router
  .route("/admin/deleteuser/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);
router
  .route("/admin/deletesuggestion/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteSuggestion);
router
  .route("/admin/deletetraveldetail/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteTravelDetail);
module.exports = router;
