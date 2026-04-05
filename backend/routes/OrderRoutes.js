import express from 'express'
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus} from '../controllers/OrderController.js'
import adminAuth from '../middleware/AdminAuth.js';
import authUser from '../middleware/Auth.js';

const orderRouter = express.Router();

// admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// user features
orderRouter.post('/userorder',authUser,userOrders)

export default orderRouter;
