import { Request, Response, NextFunction } from "express";
const pool = require("../../database/connection");
const catchAsyncError = require("../middleware/catchAsyncErrors");

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
exports.suggestion = catchAsyncError(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { name, message } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const newMessage = {
      user_id: req.user.user_id,
      name: name,
      message: message,
    };

    const insertMessageSQL =
      "INSERT INTO suggesstion (user_id, name, message) VALUES (?, ?, ?)";
    const values = [newMessage.user_id, newMessage.name, newMessage.message];

    pool.query(insertMessageSQL, values, (insertError: any) => {
      if (insertError) {
        console.error("Error inserting user data: " + insertError);
      } else {
        console.log("User data inserted successfully");
        res.status(200).json({ newMessage });
      }
    });
  }
);
