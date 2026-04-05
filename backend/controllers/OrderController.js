
import orderModel from "../models/Order.model.js";
import userModel from "../models/User.model.js";
import Stripe from "stripe";
import razorpay from "razorpay";
// Global variables 
const currency = 'usd'
const deliveryCharges = 10


// GATEWAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// placing orders using cod method
const placeOrder = async(req,res)=>{
    
    try {
           const {userId,items,amount,address} = req.body;
        const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod:"COD",
        payment:false,
        date:Date.now(),

    }
     const newOrder = new orderModel(orderData)
     await newOrder.save();

     await userModel.findByIdAndUpdate(userId,{cartData:{}})
     res.json({success:true,message:"Order Placed"})
    

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}


// placing orders using stripe method
const placeOrderStripe = async(req,res)=>{
   try {
    const {userId,items,amount,address} = req.body
    const {origin} = req.headers;

      const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod:"Stripe",
        payment:false,
        date:Date.now(),

    }
 const newOrder = new orderModel(orderData)
     await newOrder.save();

     const line_items = items.map((item)=>({
        price_data:{
            currency:currency,
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100
        },
        quantity:item.quantity
     }))

     line_items.push({
        price_data:{
            currency:currency,
            product_data:{
                name:'Delivery Charges'
            },
            unit_amount:deliveryCharges*100
        },
        quantity:1
     })

     const session = await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment',
     })
     res.json({success:true,session_url:session.url})

   } catch (error) {
     console.log(error);
        res.json({success:false,message:error.message})
   }
}

// verify Stripe 
const verifyStripe = async(req,res)=>{
    const {orderId,success,userId} = req.body;
    try {
        if (success==='true') {
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true,message:"Payment successful and order placed"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Payment failed, order cancelled"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error occurred while verifying payment"})
    }
}


// placing orders using razorpay method
const placeOrderRazorpay = async(req,res)=>{
      try {
         const {userId,items,amount,address} = req.body
    

      const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod:"Razorpay",
        payment:false,
        date:Date.now(),

    }
 const newOrder = new orderModel(orderData)
     await newOrder.save();

     const options = {
        amount: amount * 100,
        currency:currency.toUpperCase(),
        receipt:newOrder._id.toString(),
     }
     await razorpayInstance.orders.create(options,(error,order)=>{
        if(error){
            console.log(error);
            return res.json({success:false,message:"Error occurred while creating Razorpay order"})
            
        }
        res.json({success:true,order})
     })

      } catch (error) {
         console.log(error);
        res.json({success:false,message:"Error occurred while verifying payment"})
      }
}

const verifyRazorpay = async(req,res)=>{
    try {
        const {userId,razorpay_order_id} = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        //console.log(orderInfo);
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true,message:"Payment successful and order placed"})
        }else{
            res.json({success:false,message:"Payment failed, order cancelled"})
        }
        
    } catch (error) {
         console.log(error);
        res.json({success:false,message:"Error occurred while verifying payment"})
    }
}

// All orders data for admin panel
const allOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
         console.log(error);
        res.json({success:false,message:error.message})
    }
}

//User order data for frontend
const userOrders = async(req,res)=>{
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
         console.log(error);
        res.json({success:false,message:error.message})
    }
}

// update orders status
const updateStatus = async(req,res)=>{
   try {
    const {orderId,status} = req.body;
    await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({success:true,message:"Order status updated"})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
   }
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe,verifyRazorpay}