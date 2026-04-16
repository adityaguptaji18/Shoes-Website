import { getAllProducts,createProduct } from "../controllers/product.controller.js";
import express from "express";
import {verifyToken,isAdmin} from "../middleware/auth.middleware.js";
const router=express.Router()

router.get("/",getAllProducts);
router.post("/",verifyToken,isAdmin,createProduct)
export default router
