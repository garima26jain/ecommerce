const express=require('express');
const router=express.Router();

const {getUserById,pushOrderInPurchaseList}=require('../controllers/user');
const {isSignedIn,isAuthenticated,isAdmin}=require('../controllers/authentication');
const {updateStock}=require('../controllers/product');
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus}=require('../controllers/order');

router.param('userId',getUserById);
router.param('orderId',getOrderById);

router.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);
//get all orders
router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders);

//status of all orders
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)

//Status updated by the admin
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus)

module.exports=router
