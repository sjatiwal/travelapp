import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const admin = require("./routes/adminRoute");
const user = require("./routes/userRoute");
const suggestion = require("./routes/suggestionRoute");
const payment = require("./routes/paymentRoute");
const travel = require("./routes/travelRoute");

const app = express();
app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/assets"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", user);
app.use("/api/v1", suggestion);
app.use("/api/v1", payment);
app.use("/api/v1", travel);
app.use("/api/v1", admin);

export default app;
