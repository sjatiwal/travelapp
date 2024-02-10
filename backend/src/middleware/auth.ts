import { Request, Response, NextFunction } from "express";
const catchAsyncErrors = require("./catchAsyncErrors");
const pool = require("../../database/connection");
const jwt = require("jsonwebtoken");

type User = {
  username: string;
  email: string;
  phoneNo: string;
  password: string | undefined;
  user_id: string;
  userrole: string;
};
interface AuthenticatedRequest extends Request {
  user?: User;
}

// user Authentication
exports.isAuthenticatedUser = catchAsyncErrors(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { token } = req.cookies;

      if (!token) {
        return next(console.log("NO User"));
      }

      const decodeData = jwt.verify(token, process.env.SECRET_KEY);

      const checkLoginSQL = "SELECT * FROM users WHERE user_id=?";

      pool.query(
        checkLoginSQL,
        [decodeData.id],
        (selectError: string, users: User[]) => {
          if (selectError) {
            console.error("Error checking login data: " + selectError);
            return next(selectError);
          } else {
            if (users.length === 1) {
              req.user = users[0];
              next();
            } else {
              console.log("User is not Authorized");
            }
          }
        }
      );
    } catch (error) {
      console.error("Error in isAuthenticatedUser middleware: " + error);
      next(error);
    }
  }
);

// userrole==="admin"
exports.authorizedRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    if (!roles.includes(req.user.userrole)) {
      return console.log(
        `Role:${req.user.username} is a ${req.user.userrole}, so not authorized`,
        403
      );
    }
    next();
  };
};
