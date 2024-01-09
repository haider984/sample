import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";
import { response } from "express";

export const intent = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE);
    const gig = await Gig.findById(req.params.id);

    // Use the conditional operator to set the price
    const price = req.body.price ? req.body.price * 80 : gig.price * 80;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: req.body.price,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    next(err);
  }
};

export const getCompleteOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) throw createError.NotFound("User not found");

    let orderCriteria = { isCompleted: true };

    if (user.isSeller) {
      orderCriteria.sellerId = req.userId;
    } else {
      orderCriteria.buyerId = req.userId;
    }

    const orders = await Order.find(orderCriteria);

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.userId);

    if (!user) throw createError.NotFound("User not found");

    let orderCriteria = { isCompleted: false, status: "accept" };

    if (user.isSeller) {
      orderCriteria.sellerId = req.userId;
    } else {
      orderCriteria.buyerId = req.userId;
    }


    const orders = await Order.find(orderCriteria);

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error in getOrders:", err);
    next(err);
  }
};
export const getPendingOrders = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) throw createError.NotFound("User not found");

    let orderCriteria = { isCompleted: false};

    if (user.isSeller) {
      orderCriteria.sellerId = req.userId;
    } else {
      orderCriteria.buyerId = req.userId;
    }

    const orders = await Order.find(orderCriteria);
     console.log(orders.filter(order => order.status === "pending"));
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};


export const Reqacceptance = async (req, res, next) => {
  try {
    const order = await Order.findById(req.body.order._id);

    if (!order) throw createError.NotFound("Order not found");

    order.status = "accept";
    await order.save();

    res.status(200).json("Order accepted successfully");
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {
  try {
    await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true, // Set the order as completed
        },
      }
    );

    res.status(200).json("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};

export const orderComplete = async (req,res,next)=>{
   try{
        const order = req.body.order;
        if (!order.isCompleted){
        
        const user = await User.findById(order.sellerId);
        const payment_to_seller = order.price * 0.8;
        if(user.refferdEmail){
          const referredUser = await User.findOne({ email: user.refferdEmail });
          const payment_to_referred = order.price* 0.1;
          const lastpay = referredUser.payment;
          referredUser.payment = lastpay+payment_to_referred;
          await referredUser.save();
        }
       const previous = user.payment;
       user.payment = payment_to_seller+previous;
       await user.save();
       const current_order = await Order.findById(order._id);
       current_order.isCompleted = true;
       await current_order.save();
       res.status(200).send("Order completed done");
      }
      else{
        res.status(200).send("Order completed already");
      }
      
   }
   catch(err){
    next(err);
   }
};