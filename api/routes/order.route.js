import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm , orderComplete , getCompleteOrder,getPendingOrders, Reqacceptance  } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/complete", verifyToken, confirm);
router.put("/orderComplete",verifyToken,orderComplete);
router.get("/getCompleteOrder",verifyToken,getCompleteOrder);
router.put("/changeStatus",verifyToken,Reqacceptance);
router.get("/getPendingOrders",verifyToken,getPendingOrders)

export default router;
