import { Request, Response, NextFunction } from "express";
const pool = require("../../database/connection");
const catchAsyncError = require("../middleware/catchAsyncErrors");
import jwt from "jsonwebtoken";

type User = {
  username: string;
  email: string;
  phoneNo: string;
  password: string | undefined;
  user_id?: string;
};

// Register User
exports.registerUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { registerName, registerEmail, registerPhoneNo, registerPassword } =
      req.body;

    const newUser = {
      username: registerName,
      email: registerEmail,
      phoneNo: registerPhoneNo,
      password: registerPassword,
    };
    const insertUser =
      "INSERT INTO users (username, email, phoneNo, password) VALUES (?, ?, ?, ?)";
    const values = [
      newUser.username,
      newUser.email,
      newUser.phoneNo,
      newUser.password,
    ];

    pool.query(insertUser, values, (insertError: string, result: any) => {
      if (insertError) {
        console.error("Error inserting user data: " + insertError);
      } else {
        console.log("User data inserted successfully");
        console.log(result);
        const user_id = result["insertId"];
        // Create a JWT token with user details
        const token = jwt.sign(
          { id: user_id },
          process.env.SECRET_KEY || "defaultSecretKey",
          { expiresIn: "1h" }
        );
        newUser.password = undefined;

        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ user: newUser, token });
      }
    });
  }
);

// Login User
exports.loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { loginEmail, loginPassword } = req.body;

    const loginCredentials = {
      email: loginEmail,
      password: loginPassword,
    };

    const checkLoginSQL =
      "SELECT * FROM users WHERE email = ? AND password = ?";
    const values = [loginCredentials.email, loginCredentials.password];

    pool.query(checkLoginSQL, values, (selectError: string, user: User[]) => {
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
          console.log("Login failed. Invalid credentials.");
        }
      }
    });
  }
);

// Logout User
exports.logoutUser = catchAsyncError(
  async (_req: Request, res: Response, _next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    console.log("LogOut");
    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  }
);
