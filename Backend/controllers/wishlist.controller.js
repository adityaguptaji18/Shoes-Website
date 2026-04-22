import wishlistModel from "../models/wishlist.model.js";
import mongoose from "mongoose";

async function getWishList(req,res) {
  try {
    const userId=req.user.id;
    const wishList=await wishlistModel.findOne({user:userId}).populate("products");
    if(!wishList){
      return res.status(200).json({products:[],message:"there is no items in wishlist"})
    }
    return res.status(200).json({
      wishList,message:"all these items are in your wishlist"
    })
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}


async function addToWishList(req,res){
   try {
    const userId=req.user.id;
    const {productId}=req.body;
    const wishList=await wishlistModel.findOne({user:userId})
    if(!wishList){
      const newWishList=await wishlistModel.create({user:userId,products:[productId]})
      return res.status(200).json({
        wishList:newWishList
      })
    }
    const include=wishList.products.includes(productId);
    if(include){
      return res.status(200).json({
        message:"Product is already in WishList"
      })
    }
    wishList.products.push(productId);
    await wishList.save();
    return res.status(200).json({ wishList, message: "Product added to wishlist" })
   } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error"
    })
   }
}


async function removeFromWishList(req,res) {
  try {
    const userId=req.user.id;
    const productId=req.params.productId;
    const wishList=await wishlistModel.findOne({user:userId})
    if(!wishList){
      return res.status(404).json({
        message:"this product is not in your wishlist"
      })
    }
    wishList.products=wishList.products.filter(
      // this is the function thats why no curly braces are used here
      id=>id.toString()!==productId,
    )
    await wishList.save();
    return res.status(200).json({ wishList, message: "Product removed from wishlist" })
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}

export {getWishList,addToWishList,removeFromWishList}