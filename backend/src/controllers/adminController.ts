import { Request, Response, NextFunction } from "express";
const pool = require("../../database/connection");
const catchAsyncError = require("../middleware/catchAsyncErrors");

type User = {
  username: string;
  email: string;
  phoneNo: string;
  password: string | undefined;
  user_id: string;
  userrole: string;
};

type Suggestion = {
  suggestion_id: string;
  user_id: string;
  name: string;
  message: string;
};

type TravelDetails = {
  travel_id: string;
  user_id: string;
  location: string;
  noOfPeople: string;
  selectedDate: string;
  cost: string;
  tripPackage: string;
};
// users
exports.getAllUsers = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const allUsers = "SELECT * from users";

    pool.query(allUsers, (selectError: string, users: User[]) => {
      if (selectError) {
        console.error("Error checking login data: " + selectError);
      } else {
        if (users.length >= 0) {
          users.forEach((user) => {
            user.password = undefined;
          });
          res.status(200).json({ users });
        }
      }
    });
  }
);

//suggestions
exports.getAllSuggestions = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const allSuggestions = "SELECT * from suggestions";

    pool.query(
      allSuggestions,
      (selectError: string, suggestions: Suggestion[]) => {
        if (selectError) {
          console.error("Error checking login data: " + selectError);
        } else {
          if (suggestions.length >= 0) {
            res.status(200).json({ suggestions });
          }
        }
      }
    );
  }
);

//travel details
exports.getAllTravelDetails = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const allTravelDetails = "SELECT * from traveldetails";

    pool.query(
      allTravelDetails,
      (selectError: string, travelDetails: TravelDetails[]) => {
        if (selectError) {
          console.error("Error checking login data: " + selectError);
        } else {
          if (travelDetails.length >= 0) {
            res.status(200).json({ travelDetails });
          }
        }
      }
    );
  }
);

//delete user
exports.deleteUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userDelete = "DELETE FROM users  WHERE user_id=?";
    pool.query(
      userDelete,
      [req.params.id],
      (selectError: string, result: any) => {
        if (selectError) {
          console.error("Error checking login data: " + selectError);
          return next(selectError);
        } else {
          if (result.affectedRows > 0) {
            console.log("success fully deleted U", result);
            res.json({ message: "Deleted Successfully" });
          }
        }
      }
    );
  }
);

// delete suggestion
exports.deleteSuggestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const suggestionDelete = "DELETE FROM suggestions  WHERE suggestion_id=?";
    pool.query(
      suggestionDelete,
      [req.params.id],
      (selectError: string, result: any) => {
        if (selectError) {
          console.error("Error checking login data: " + selectError);
          return next(selectError);
        } else {
          if (result.affectedRows > 0) {
            res.json({ message: "Deleted Successfully" });
          }
        }
      }
    );
  }
);

// delete travel detail
exports.deleteTravelDetail = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const traveldetailDelete = "DELETE FROM traveldetails  WHERE travel_id=?";
    pool.query(
      traveldetailDelete,
      [req.params.id],
      (selectError: string, result: any) => {
        if (selectError) {
          console.error("Error checking login data: " + selectError);
          return next(selectError);
        } else {
          if (result.affectedRows > 0) {
            res.json({ message: "Deleted Successfully" });
          }
        }
      }
    );
  }
);
