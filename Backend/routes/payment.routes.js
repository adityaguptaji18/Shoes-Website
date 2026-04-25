import { createRazorpayOrder,verifyPayment } from "../controllers/payment.controller.js";
import express from "express";
import  {verifyToken} from "../middleware/auth.middleware.js";
const router=express.Router();

router.post("/create-order",verifyToken,createRazorpayOrder);
router.post("/verify",verifyToken,verifyPayment)

export default router