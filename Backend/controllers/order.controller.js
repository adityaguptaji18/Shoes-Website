import orderModel from "../models/order.model.js"
import cartModel from "../models/cart.model.js"
import sendEmail from "../utils/sendEmail.js";
import UserModel from "../models/user.model.js";
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
    const orderedItems = cart.items
        .map(
          (item) =>
            `<li>
              ${item.product?.name} 
              (Size: ${item.size}) × ${item.quantity}
              - ₹${item.product?.price}
            </li>`
        )
        .join("");

    const user = await UserModel.findById(userId);


    cart.items=[];
    await cart.save();
    sendEmail(
        user.email,
        "Order Confirmed - Gupta Shoes Emporium",
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          
          <h2>🎉 Order Placed Successfully</h2>

          <p>Hello <strong>${user.name}</strong>,</p>

          <p>Thank you for shopping with Gupta Shoes Emporium.</p>

          <h3>🛒 Ordered Items</h3>

          <ul>
            ${orderedItems}
          </ul>

          <hr>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Total Amount:</strong> ₹${totalAmount}</p>

          <p><strong>Payment Method:</strong> ${paymentMethod}</p>

          <p><strong>Status:</strong> Pending</p>

          <p>Your order is currently being processed.</p>

          <br>

          <p>Happy Shopping 👟</p>

          <h3>Gupta Shoes Emporium</h3>

        </div>
        `
      );
    return res.status(201).json({order,message:"Order placed successfully!"})
  } catch (error) {
    console.log(error);
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