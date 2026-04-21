import mongoose from "mongoose";
const cartSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  items:[{
    product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product",
      required:true
    },
    quantity:{
      type:Number,
      default:1
    },
    size:{
      type:String
    },
    price:{
      type:Number,
    }
  }]
},{timestamps:true})

const cartModel=mongoose.model("Cart",cartSchema);
export default cartModel