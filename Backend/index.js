import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
const app=express();
app.use(express.json())
connectDB();
app.get("/",(req,res)=>{
  res.send("Server is running")
})
app.listen(process.env.PORT,()=>{
  console.log("app is running at port "+process.env.PORT)
} )