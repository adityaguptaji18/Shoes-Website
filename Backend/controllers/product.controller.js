import productModel from "../models/product.model.js";
import mongoose from "mongoose";
async function getAllProducts(req,res) {
  try {
    const {category , minPrice , maxPrice , size}=req.query;
    const filter={}
    if(category) filter.category=category;
    if(size) filter.sizes=size
    if(minPrice || maxPrice){
      filter.price={}
      if(minPrice) filter.price.$gte=Number(minPrice)
      if(maxPrice) filter.price.$lte=Number(maxPrice)
    }
   const products= await productModel.find(filter)
    return res.status(200).json({
      products,
      message:"These are all products"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"there is an error in getAllProducts"
    })
  }
}

async function createProduct(req,res) {
  try {
    const {name,description,price,images,sizes,colors,stock,category}=req.body;
    await productModel.create({name,description,price,images,sizes,colors,stock,category})
    return res.status(201).json({
      message:"wuhuuuu product successfully created"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"there is an error in creating product"
    })
  }
}

async function getproductById(req,res){
  const id=req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ message: "Invalid Product ID" });
}
  try {
    const product=await productModel.findById(id);
    if(!product){
      return res.status(404).json({message:"Product not found"});
    }
    return res.status(200).json({
      product,
      message:"this product is what you are search for"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"Internal Server error"
    })
  }
}

async function updateProduct(req,res){
  const id=req.params.id;
  const update=req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ message: "Invalid Product ID" });
}
  try {
    const product=await productModel.findByIdAndUpdate(id,update,{new:true});
    if(!product){
      return res.status(404).json({message:"Product not found"})
    }
    return res.status(200).json({
      product,message:"Product changes successfully wuhuu"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"})
  }
}

async function deleteProduct(req,res) {
  const id=req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ message: "Invalid Product ID" });
}
  try {
    const product=await productModel.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({message:"Product not found"});
    }
    return res.status(200).json({product,
      message:"this product is deleted succesfully"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}

export {getAllProducts,createProduct,getproductById,updateProduct,deleteProduct}