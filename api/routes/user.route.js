import express from "express";
import { deleteUser, getUser, updateUser, create_connected_account, addReferredEmail, no_of_orders, referral_email_accounts } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Existing routes
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.put("/:id", verifyToken ,updateUser);
router.post("/:id/create_connected_account",create_connected_account);
router.put("/:id/add_referred_email", verifyToken, addReferredEmail);
router.get("/:id/orders_analytics",verifyToken,no_of_orders);
router.get("/:id/referral_anaylytics",verifyToken,referral_email_accounts);
export default router;
