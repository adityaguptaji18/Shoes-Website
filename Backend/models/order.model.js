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
  deliveryAddress:{
    name:String,
    phone:String,
    address:String,
    city:String,
    pincode:String
  },
  paymentMethod:{
    type:String,
    default:"COD"
  }
},{timestamps:true})

const orderModel=mongoose.model("order",orderSchema);
export default orderModel