const express=require('express');
const router=express.Router();


const {getUserById,getUser,/*getAllUsers*/updateUser,userPurchaseList}=require('../controllers/user');
const {isSignedIn,isAuthenticated,isAdmin}=require('../controllers/authentication');


//getting a particular user
//getUserById is used to populate the req.profile object with user object coming from DB.
router.param('userId',getUserById);

//passing the middleware
router.get("/user/:userId",isSignedIn, isAuthenticated ,getUser);

//fetching all users
// router.get("/users",getAllUsers);

//update route
router.put("/user/:userId",isSignedIn, isAuthenticated ,updateUser);

router.get("orders/user/:userId",isSignedIn, isAuthenticated ,userPurchaseList);

module.exports=router; 