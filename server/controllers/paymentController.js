import Payment from '../models/paymentModel.js';
import User from '../models/userModel.js';
import razorpayInstance from '../config/razorpay.js';
import crypto from 'crypto';
// Create a new payment
//route: POST /api/payments
export const createPayment=async(req,res)=>{
    try{
        const {planId,amount,credits}=req.body;
         if(!planId || !amount || !credits){
            return res.status(400).json({message:"invalid request body"});
         }
         const option ={
            amount:Math.round(amount*100),//razorpay expects amount in paise
            currency:"INR",
            receipt:`receipt_${Date.now()}`,
        }
        const razorpayOrder= await razorpayInstance.orders.create(option);
   
        await Payment.create({
            user:req.user._id,
            planId,
            amount,
            credits,
            razorpayOrderId:razorpayOrder.id,
            status:"pending"
        });
        res.status(201).json(razorpayOrder);
        

    }catch(err){
       
        res.status(500).json({message:"Internal server error"});
    }
}

//verify payment
//route: POST /api/payments/verify

export const verifyPayment=async(req,res)=>{
    try{
        const {razorpayOrderId,razorpayPaymentId,razorpaySignature}=req.body;
        {/*handle successful payment verification logic here, such as updating payment status in database*/}
        const body=razorpayOrderId+"|"+razorpayPaymentId;
        const expectedSignature=crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET).update(body.toString())
        .digest('hex');
        if(expectedSignature!==razorpaySignature){
            return res.status(400).json({message:"Payment verification failed"});
        }
       const payment=await Payment.findOne({
            razorpayOrderId:razorpayOrderId
        });
        if(!payment){
            return res.status(404).json({message:"Payment not found"});
        }
        if(payment.status==="success"){
            return res.status(400).json({message:"Payment already verified"});
        }
        //update payment status to success
        payment.razorpayPaymentId=razorpayPaymentId;
        payment.status="success";
        await payment.save();
        //update user's credits
        const updatedUser=await User.findByIdAndUpdate(payment.user,{
            $inc:{credits:payment.credits},
            plan:payment.planId
        },{returnDocument:'after'});


        res.json({message: "Payment verified successfully",
  user: {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    credits: updatedUser.credits,
    plan: updatedUser.plan}});
        
    }
    catch(err){
      
        res.status(500).json({message:"Internal server error"});
    }
}
