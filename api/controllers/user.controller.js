import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import createError from "../utils/createError.js";
import { upload } from "./../utils/upload.js";
import mongoose from 'mongoose';

import Stripe from "stripe";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};
export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};

export const updateUser = async (req, res) => {
  try {
    let imgUrl = req.body.img;
    if (req.file) {
      imgUrl = await upload(req.file);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        img: imgUrl,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const no_of_orders = async (req, res) => {
  try {
      // Ensure user is defined, else return
      if (req.params.id) {
         const user = await User.findById(req.params.id);
     

      if (!user || !user.id) {
          return res.status(400).send({ error: "User is not defined." });
      }

      const userId = user.id;

      // Default to 0 if undefined
      let orderCount = 0;
      let completedOrder = 0;
      let totalEarnings = 0;

      if (user.isSeller) {
          orderCount = await Order.countDocuments({ sellerId: userId }) || 0;
          completedOrder = await Order.countDocuments({ sellerId: userId, isCompleted: true }) || 0;

          const earningsAggregate = await Order.aggregate([
              { $match: { sellerId: mongoose.Types.ObjectId(userId), isCompleted: true }},
              { $group: { _id: null, totalEarnings: { $sum: "$price" }}}
          ]);

          totalEarnings = earningsAggregate.length ? earningsAggregate[0].totalEarnings : 0;

      } else {
          orderCount = await Order.countDocuments({ buyerId: userId }) || 0;
          completedOrder = await Order.countDocuments({ buyerId: userId, isCompleted: true }) || 0;

          // Note: The earnings aggregation might not be relevant for a buyer. 
          // If you have some other aggregation for buyers, you can implement that here.
      }

      res.status(200).send({
          ordercount: orderCount,
          completedorder: completedOrder,
          totalEarnings
      });
    }

  } catch (error) {
      console.error("Error fetching order counts, completed orders, and earnings:", error);
      res.status(500).send({ error: "An error occurred while fetching data." });
  }
};

export const referral_email_accounts = async (req, res) => {
  try {
    // Extract the email of the current user
    const user = await User.findById(req.params.id);

    // Count the number of users who have the referredEmail field set to the current user's email
    const count = await User.countDocuments({ refferdEmail: user.email });

    // Send back the count
    res.status(200).send({ count });

  } catch (error) {
    console.error("Error fetching referral counts:", error);
    res.status(500).json({ error: "An error occurred while fetching referral counts." });
  }
};

export const addReferredEmail = async (req, res) => {
  try {
    // Assume you're sending the user ID as a parameter and the referred email in the request body
    const userId = req.params.id;
    const { referredEmail } = req.body;

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if a user with the referred email exists
    const referredUser = await User.findOne({ email: referredEmail });
    if (!referredUser) {
      return res
        .status(404)
        .json({
          error: "Referred email does not correspond to an existing user",
        });
    }

    // Update the user's referredEmail field
    user.refferdEmail = referredEmail;

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: "Referred email updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create_connected_account = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE);
  const user = await User.findById(req.params.id);

  try {
    const account = await stripe.accounts.create({
      type: "standard",
    });
    //update the user profile
    user.connectedAccount = account.id;
    console.log(user);
    await user.save();
    // Generate account link for onboarding the user
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "http://localhost:5173/reauth", // Replace with your reauth URL
      return_url: "http://localhost:5173/profile", // Replace with your success URL
      type: "account_onboarding",
    });
    res.status(200).send({ url: accountLink.url });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
