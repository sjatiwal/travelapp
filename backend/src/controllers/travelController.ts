const catchAsyncError = require("../middleware/catchAsyncErrors");
import { Request, Response, NextFunction } from "express";
const pool = require("../../database/connection");

type User = {
  username: string;
  email: string;
  phoneNo: string;
  password: string | undefined;
  user_id: string;
  userrole: string;
};
type AuthenticatedRequest = Request & {
  user?: User | undefined;
};

// New Booking
exports.createNewTravel = catchAsyncError(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { location, noOfPeople, selectedDate, cost, tripPackage } = req.body;

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
  travel_id: string;
  user_id: string;
  location: string;
  noOfPeople: string;
  selectedDate: string;
  cost: string;
  tripPackage: string;
};

// Get Travel Details of loggedin user
exports.getTravelDetails = catchAsyncError(
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
            if (travelDetails.length >= 0) {
              res.json({ travelDetails });
            } else {
              console.log("empty list");
            }
          }
        }
      );
    } catch (error) {
      console.log("error getting travel details");
    }
  }
);

// Delete Travel Detail
exports.deleteTravelDetails = catchAsyncError(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const deletingTravelDetails =
        "DELETE FROM traveldetails  WHERE user_id=? and travel_id=?";
      pool.query(
        deletingTravelDetails,
        [req.user.user_id, req.params.id],
        (selectError: string, result: any) => {
          if (selectError) {
            console.error("Error checking login data: " + selectError);
            return next(selectError);
          } else {
            if (result.affectedRows > 0) {
              console.log("suuccess fully deleted", result);
              res.json({ message: "Deleted Successfully" });
            }
          }
        }
      );
    } catch (error) {
      console.log("error in deleting travel details");
    }
  }
);
