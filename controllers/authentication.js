const User=require('../models/user');
const {check,validationResult}=require('express-validator');
var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');
//here use the same name as used while exporting

//for handling authentication routes

exports.signup=(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg    
        })
    }

    // //middleware
    // console.log("REQ BODY:",req.body)
    // res.json({
    //     message:"signup rote works"
    // })

    //saving user to db

    /*creating a object*/
    //user is created from models User and User is created using mongoose
    // all the mongoose features can be used by user
    const user=new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"Not able to save user in DB"
            })
        }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        })
    })
};


exports.signin=(req,res)=>{
    //destructring
    const{email,password}=req.body
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg    
        })
    }
    User.findOne({email},(err,user)=>{
        //if user exists or not
        if(err||!user){
            return res.status(400).json({
                error:"User email doesn't exists"
            })
        }
        //password invalid
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and password invalid"
            })
        }
        //if(email && password) ,then store the token in cookie 

        //1.creating a token
        //sign({key:value},"literal")--signin method
        const token=jwt.sign({_id:user._id},process.env.SECRET);

        //put token in cookie
        //res.cookie("token_name",token_to_be_passed,{expire:new})
        res.cookie("token",token,{expire:new Date + 9999});

        //send response to front end
        const{_id,name,email,role}=user
        return res.json({
            token,
            user:{_id,name,email,role}
        })


    })
};

exports.signout=(req,res)=>{
    //clear the cookie
    res.clearCookie("token")
    res.json({
        message:"User signout success!!"
    })
};

//protected routes
exports.isSignedIn=expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
})
//custom middleware--JWT is only defined for isSignedIn
exports.isAuthenticated=(req,res,next)=>{
    //user always make a request & profile(any name ) is a property that we are making inside the user
    let checker=req.profile && req.auth  && req.profile._id==req.auth._id
    if(!checker){
        res.status(403).json({
            error:"Access denied"
        })
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    
    if(req.profile.role===0){
        return res.status(403).json({
            error:"Not an admin account"
        });
    }
    next();
}