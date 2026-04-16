import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  images:[{
    type:String
  }],
  sizes:[{
    type:String
  }],
  colors:[{
    type:String
  }],
  stock:{
    type:Number,
    default:0
  },
  category:{
    type:String
  }
},{timestamps:true})

const productModel=mongoose.model("product",productSchema);

export default productModel