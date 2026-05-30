import orderModel from "../models/order.model.js"
import mongoose from "mongoose";
import cartModel from "../models/cart.model.js"
async function createOrder(req,res) {
  try {
    const userId=req.user.id;
    const {deliveryAddress,paymentMethod}=req.body;
    const cart = await cartModel.findOne({ user: userId }).populate('items.product');
    if(!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is Empty!" });
    }
    const totalAmount = cart.items.reduce((sum, item) => 
      sum + (item.product?.price || 0) * item.quantity, 0
    );
    const order=await orderModel.create({user:userId,items:cart.items,totalAmount,deliveryAddress,paymentMethod,status:'pending'});

    cart.items=[];
    await cart.save();
    return res.status(201).json({order,message:"Order placed successfully!"})
  } catch (error) {
    return res.status(500).json({
      message:"Internal server error"
    })
  }
}

//getUSerOrders only user ko show hone wale orders hai jo ki real websites mein dikhta hai my orders section
async function getUserOrders(req,res) {
  try {
    const userId=req.user.id;
    const order=await orderModel.find({user:userId}).populate("items.product");
    return res.status(200).json({order,message:"ye le tere saare orders abhi tak"})
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}


// getAllOrders function is for admin only . it shows addmin all the orders till now  . isliye hee isme hum id ki bhi jarurat nahi hai
async function getAllOrders(req,res) {
  try {
    const orders=await orderModel.find().populate("items.product");
    return res.status(200).json({
      orders,message:"ye rahe abhi tak ke admin ke saare orders"
    }) 
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}


async function updateOrderStatus(req,res){
  try {
    const id=req.params.id;
    const {status}=req.body
    const order=await orderModel.findByIdAndUpdate(id,  {status},{new:true})
    if(!order){
      return res.status(404).json("Order not found")
    }
    return res.status(200).json({order,message:"status update ho gaya hai"})
  } catch (error) {
    return res.status(500).json({message:"Internal Server Error"})
  }
}

export {createOrder,getUserOrders,getAllOrders,updateOrderStatus}