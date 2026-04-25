import Razorpay from "razorpay";
import crypto from "crypto"
async function createRazorpayOrder(req,res) {
  try {
    const {amount , currency}=req.body;
    const razorpay=new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })
    const order=await razorpay.orders.create({
      amount:amount*100,
      currency:currency||"INR",
      receipt:`receipt_${Date.now()}`
    })
    return res.status(200).json({ order, message: "Razorpay order created" })
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server Error"
    })
  } 
}

async function verifyPayment(req,res) {
  try {
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    const body=razorpay_order_id+"|"+razorpay_payment_id;
    const expectedSignature=crypto
    .createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

    if(expectedSignature===razorpay_signature){
      return res.status(200).json({message:"Payment verified successfully"})
    }
    else{
      return res.status(400).json({ message: "Payment verification failed" })
    }
  } catch (error) {
    return res.status(500).json({
      message:"Internal Server error"
    })
  }

}

export {createRazorpayOrder,verifyPayment}