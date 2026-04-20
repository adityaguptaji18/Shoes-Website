import { getAllProducts,createProduct , getproductById ,updateProduct,deleteProduct} from "../controllers/product.controller.js";
import express from "express";
import {verifyToken,isAdmin} from "../middleware/auth.middleware.js";
const router=express.Router()

router.get("/",getAllProducts);
router.get("/:id",getproductById)
router.post("/",verifyToken,isAdmin,createProduct)
router.put("/:id",verifyToken,isAdmin,updateProduct)
router.delete("/:id",verifyToken,isAdmin,deleteProduct)
export default router
