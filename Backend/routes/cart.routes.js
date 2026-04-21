import { getCart,removeFromCart,addToCart,updateCartItem } from "../controllers/cart.contoller.js"
import express from "express"
import { verifyToken } from "../middleware/auth.middleware.js"

const router=express.Router()

router.get("/",verifyToken,getCart)
router.post("/add",verifyToken,addToCart)
router.delete("/remove/:productId",verifyToken,removeFromCart)
router.put("/update/:productId",verifyToken,updateCartItem)

export default router