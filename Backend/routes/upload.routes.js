import uploadImage from "../controllers/upload.controller.js";
import upload from "../config/multer.js";
import express from "express";
import { verifyToken , isAdmin } from "../middleware/auth.middleware.js";
const router=express.Router();

router.post("/",verifyToken,isAdmin,upload.single("image"),uploadImage);

export default router;