import { Request, Response, NextFunction } from "express";
const pool = require("../../database/connection");
const catchAsyncError = require("../middleware/catchAsyncErrors");
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

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

// Register User
exports.registerUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { registerName, registerEmail, registerPhoneNo, registerPassword } =
      req.body;

    const hashedPassword = await bcrypt.hash(registerPassword, 10);
    const newUser = {
      username: registerName,
      email: registerEmail,
      phoneNo: registerPhoneNo,
      password: hashedPassword,
      userrole: "user",
    };
    const insertUser =
      "INSERT INTO users (username, email, phoneNo, password, userrole) VALUES (?, ?, ?, ?, ?)";
    const values = [
      newUser.username,
      newUser.email,
      newUser.phoneNo,
      newUser.password,
      newUser.userrole,
    ];

    pool.query(insertUser, values, (insertError: string, result: any) => {
      if (insertError) {
        console.error("Error inserting user data: " + insertError);
      } else {
        console.log("User data inserted successfully");

        const user_id = result["insertId"];
        // Create a JWT token with user details
        const token = jwt.sign(
          { id: user_id },
          process.env.SECRET_KEY || "defaultSecretKey",
          { expiresIn: "1h" }
        );
        newUser.password = undefined;

        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ user: [newUser], token });
      }
    });
  }
);

// Login User
exports.loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { loginEmail, loginPassword } = req.body;
    console.log(loginEmail, loginPassword);

    const checkLoginSQL = "SELECT * FROM users WHERE email = ?";

    pool.query(
      checkLoginSQL,
      [loginEmail],
      async (selectError: string, user: User[]) => {
        if (selectError) {
          console.error("Error checking login data: " + selectError);
        } else {
          if (user.length === 1) {
            const match = await bcrypt.compare(loginPassword, user[0].password);
            if (match) {
              const user_id = user[0].user_id;
              // Create a JWT token with user details
              const token = jwt.sign(
                {
                  id: user_id,
                },
                process.env.SECRET_KEY || "defaultSecretKey",
                { expiresIn: "1h" }
              );

              user[0].password = undefined;

              res
                .status(200)
                .cookie("token", token, {
                  httpOnly: true,
                  secure: false,
                  domain: "localhost:8081",
                })
                .json({ user, token });
            }
          } else {
            console.log("Login failed. Invalid credentials.");
          }
        }
      }
    );
  }
);

// user Details
exports.getUserDetails = catchAsyncError(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const checkLoginSQL = "SELECT * FROM users WHERE user_id=?";

    pool.query(
      checkLoginSQL,
      [req.user.user_id],
      (selectError: string, user: User[]) => {
        if (selectError) {
          console.error("Error checking login data: " + selectError);
        } else {
          if (user.length === 1) {
            const user_id = user[0].user_id;
            // Create a JWT token with user details
            const token = jwt.sign(
              {
                id: user_id,
              },
              process.env.SECRET_KEY || "defaultSecretKey",
              { expiresIn: "1h" }
            );

            user[0].password = undefined;

            res
              .status(200)
              .cookie("token", token, {
                httpOnly: true,
                secure: false,
                domain: "localhost:8081",
              })
              .json({ user, token });
          } else {
            console.log("Loading failed");
          }
        }
      }
    );
  }
);

// Logout User
exports.logoutUser = catchAsyncError(
  async (_req: Request, res: Response, _next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "User Logged out",
    });
  }
);

//Update Profile
exports.updateProfile = catchAsyncError(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { editedName, editedphoneNo } = req.body;
    console.log(editedName, editedphoneNo);
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const updateUserProfile =
      "UPDATE users SET username = ?, phoneNo = ? WHERE user_id=?";

    pool.query(
      updateUserProfile,
      [editedName, editedphoneNo, req.user.user_id],
      (selectError: string, result: any) => {
        if (selectError) {
          console.error("Error checking login data: " + selectError);
        } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ success: true });
          } else {
            console.log("Profile is not updated");
          }
        }
      }
    );
  }
);

//Change Password
exports.changePassword = catchAsyncError(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { currentPassword, changedPassword } = req.body;
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const match = await bcrypt.compare(currentPassword, req.user.password);
    if (match) {
      const updateUserProfile = "UPDATE users SET password = ? WHERE user_id=?";
      const hashedPassword = await bcrypt.hash(changedPassword, 10);
      pool.query(
        updateUserProfile,
        [hashedPassword, req.user.user_id],
        (selectError: string, result: any) => {
          if (selectError) {
            console.error("Error checking login data: " + selectError);
          } else {
            if (result.affectedRows > 0) {
              res.status(200).json({
                success: true,
              });
            } else {
              console.log("Password not Changed");
            }
          }
        }
      );
    }
  }
);
