import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js"
import {verifyToken} from "./middleware/auth.middleware.js";
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import wishListRouter from "./routes/wishlist.routes.js"
import orderRouter from "./routes/order.routes.js";
import uploadRouter from "./routes/upload.routes.js"
import paymentRouter from "./routes/payment.routes.js"
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
app.use("/api/wishlist",wishListRouter)
app.use("/api/orders",orderRouter)
app.use("/api/upload",uploadRouter)
app.use("/api/payment",paymentRouter)
app.listen(process.env.PORT,()=>{
  console.log("app is running at port "+process.env.PORT)
} )

