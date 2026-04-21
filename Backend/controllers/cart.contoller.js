import cartModel from "../models/cart.model.js";
import mongoose from "mongoose";

async function getCart(req,res) {
  try {
    const userId=req.user.id;
    const cart=await cartModel.findOne({user:userId}).populate("items.product");
    if(!cart){
      return res.status(200).json({items:[]});
    }
    return res.status(200).json({cart})
  } catch (error) {
    return res.status(500).json({
      message:"Internal server Error"
    })
  }
}

async function addToCart(req,res){
  try {
  const userId=req.user.id;
  const {productId,quantity,size}=req.body;
  const cart=await cartModel.findOne({user:userId});
  if(!cart){
    const newCart= await cartModel.create({user:userId,items:[{product:productId,quantity,size}]})
    return res.status(201).json({cart:newCart});
  }
  const existingItem=cart.items.find(item=>item.product.toString()===productId)
  if(existingItem){
    existingItem.quantity+=quantity;
  }
  else{
    cart.items.push({product:productId,quantity,size})
  }
  await cart.save()
  return res.status(200).json({cart})
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}

async function removeFromCart(req,res) {
  try {
     const userId=req.user.id;
    const productId=req.params.productId;
    const cart=await cartModel.findOne({user:userId})
    if(!cart){
      return res.status(404).json({
        message:"cart hee nahi hai bhyii delete kise karega"
      })
    }
    cart.items=cart.items.filter(
      item=>item.product.toString()!=productId
    )
    await cart.save();
    return res.status(200).json({ cart, message: "Product removed from cart" })
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}

async function updateCartItem(req,res) {
  try {
    const userId=req.user.id;
    const productId=req.params.productId;
    const {quantity}=req.body
    const cart=await cartModel.findOne({user:userId})
     if(!cart){
      return res.status(404).json({
        message:"cart hee nahi hai bhyii update kise karega"
      })
    }
    const item=cart.items.find(
      item=>item.product.toString()===productId
    )
    if(!item){
      return res.status(404).json({
        message:"item hee nahi hai bhyii update kise karega"
      })
    }
    item.quantity=quantity
    await cart.save()
    return res.status(200).json({ cart, message: "Cart updated successfully" })
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}
export{getCart,addToCart,removeFromCart,updateCartItem}
