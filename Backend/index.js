import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js"
import {verifyToken} from "./middleware/auth.middleware.js";
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
const app=express();
app.use(express.json())
connectDB();
app.get("/",(req,res)=>{
  res.send("Server is running")
})
app.use("/api/auth",authRouter);
app.get("/api/test",verifyToken,(req,res)=>{
  res.json({
    message:"Access Granted",
    user:req.user
  })
})
app.use("/api/products",productRouter)
app.use("/api/cart",cartRouter)
app.listen(process.env.PORT,()=>{
  console.log("app is running at port "+process.env.PORT)
} )

