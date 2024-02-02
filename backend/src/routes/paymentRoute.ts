import express from "express";
const router = express.Router();
const { payment } = require("../controllers/paymentController");

router.route("/payment/process").post(payment);

module.exports = router;
