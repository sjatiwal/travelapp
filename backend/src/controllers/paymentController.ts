import { Request, Response, NextFunction } from "express";
const catchAsyncError = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.payment = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const myPayment: any = await stripe.paymentIntents.create({
      amount: req.body.amount,
      description: "Some Cool Description",
      shipping: {
        name: req.body.user[0].username,
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
      currency: "Inr",
      payment_method_types: ["card"],
      metadata: {
        company: "TRAVEL APP",
      },
    });
    res.status(200).json({ client_secret: myPayment.client_secret });
  }
);
