import express from "express"
import { getWishList,addToWishList,removeFromWishList } from "../controllers/wishlist.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js";
const router=express.Router();


router.get("/",verifyToken,getWishList);
router.post("/add",verifyToken,addToWishList)
router.delete("/remove/:productId",verifyToken,removeFromWishList)

export default router