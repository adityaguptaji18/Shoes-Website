import { createOrder,getAllOrders,getUserOrders,updateOrderStatus} from "../controllers/order.controller.js";
import express from "express";
import { verifyToken , isAdmin} from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/",verifyToken,createOrder);
router.get("/my-orders",verifyToken,getUserOrders);
router.get("/all",verifyToken,isAdmin,getAllOrders);
router.put("/:id",verifyToken,isAdmin,updateOrderStatus);

export default router