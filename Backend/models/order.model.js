import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  items:[{
    product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product",
    },
    quantity:{
      type:Number,
      required:true,
    },
    size:{
      type:String,
      required:true
    }
  }],
  totalAmount:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    default:"pending",
  },
  address:{
    type:String,
    required:true,
  }
},{timestamps:true})

const orderModel=mongoose.model("order",orderSchema);
export default orderModel