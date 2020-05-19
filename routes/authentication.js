const express=require('express');
var router=express.Router();
const {check}=require('express-validator');
//importing authorization controller
const {signout,signup,signin,isSignedIn }=require("../controllers/authentication")

router.post("/signup",[
    check("name").isLength({min:5}).withMessage('must be at least 5 charcters long'),
    check("email").isEmail().withMessage('email is required'),
    check("password").isLength({min:5}).withMessage('must be at least 5 charcters long'),
    

],signup);

router.post("/signin",[
    
    check("email").isEmail().withMessage('email is required'),
    check("password").isLength({min:1}).withMessage('password is required'),
    

],signin);

router.get("/signout",signout);
// router.get("/testroute",isSignedIn,(req,res)=>{
//     res.send("A protected route");
// })


module.exports=router;  