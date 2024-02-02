const catchAsyncError = require("../middleware/catchAsyncErrors");
import { Request, Response, NextFunction } from "express";
const pool = require("../../database/connection");

type User = {
  username: string;
  email: string;
  phoneNo: string;
  password: string | undefined;
  user_id: string;
};
interface AuthenticatedRequest extends Request {
  user?: User | undefined;
}

exports.newTravel = catchAsyncError(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { location, noOfPeople, selectedDate, cost, tripPackage } = req.body;
    console.log(
      location,
      noOfPeople,
      selectedDate,
      cost,
      tripPackage,
      "travel details"
    );
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const newTravelDetails = {
      user_id: req.user.user_id,
      location,
      noOfPeople,
      selectedDate,
      cost,
      tripPackage,
    };

    const insertTravelDetails =
      "INSERT INTO traveldetails (user_id, location, noOfPeople, selectedDate, cost, tripPackage) VALUES (?, ?, ?, ?, ?, ?)";

    const values = [
      newTravelDetails.user_id,
      newTravelDetails.location,
      newTravelDetails.noOfPeople,
      newTravelDetails.selectedDate,
      newTravelDetails.cost,
      newTravelDetails.tripPackage,
    ];

    pool.query(insertTravelDetails, values, (insertError: string) => {
      if (insertError) {
        console.error("Error inserting user data: " + insertError);
      } else {
        console.log("Travel Details inserted successfully");
        res.status(200).json({ newTravelDetails });
      }
    });
  }
);

type TravelDetails = {
  user_id: string;
  location: string;
  noOfPeople: string;
  selectedDate: string;
  cost: string;
  tripPackage: string;
};

exports.getPaymentDetails = catchAsyncError(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const checkLoginSQL = "SELECT * FROM traveldetails WHERE user_id=?";
      pool.query(
        checkLoginSQL,
        [req.user.user_id],
        (selectError: string, travelDetails: TravelDetails[]) => {
          if (selectError) {
            console.error("Error checking login data: " + selectError);
            return next(selectError);
          } else {
            console.log(travelDetails);
            if (travelDetails.length >= 1) {
              res.json({ travelDetails });
            } else {
              console.log("User is not Authorized");
            }
          }
        }
      );
    } catch (error) {
      console.log("error getting travel details");
    }
  }
);
