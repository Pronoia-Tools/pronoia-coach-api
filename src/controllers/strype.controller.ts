const httpStatus = require('http-status');

const catchAsync = require("../utils/catchAsync");
const ApiError = require('../utils/ApiError');
const stripe = require("stripe")(`${process.env.VUE_APP_STRIPE_SECRET}`);
import { User } from "../models/User"

const createPayment = catchAsync(async (req: any, res: any) => {
  
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.VUE_APP_STRIPE_WEBHOOK_SECRET,
      );
      //   console.log("type", event);
    } catch (err:any) {
      //   console.log("type2", err);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        const email = paymentIntent.charges.data[0].billing_details.email
        const description = paymentIntent.charges.data[0].description
        const currentUser = await User.findOne({email:email});
        if (!currentUser) {
          throw new ApiError(
            httpStatus.NOT_FOUND,
            "The user with email " + email + " is not registerd"
          );
        }
        currentUser.membership = description;
        await currentUser.save().catch((error: any) => {
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        });
        console.log("PaymentIntent was successful!");
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
});
  

module.exports = {
  createPayment
};