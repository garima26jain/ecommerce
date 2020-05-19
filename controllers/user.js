const User=require("../models/user");
const Order=require('../models/order');



//method with params
exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:"No user was found in DB"
            })
        }
        //object inside the req i.e. profile
        req.profile=user
        next();
    });
};

//Simplemethod
exports.getUser=(req,res)=>{
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    //this isn't working
    //req.timestamps=undefined;
    return res.json(req.profile)
}

// //method for fetching all users
// exports.getAllUsers=(req,res)=>{
//     User.find().exec((err,users)=>{
//         if(err||!users){
//             return res.status(400).json({
//                 error:"No users found"
//             })
//         }
//         res.json(users)
//     })
// }

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        //find the user
        {
            //here id from db is set to id key i.e.  _id:req.profile._id & 
            //findByIdAndUpdate method automatically compares the id passes in url with the id from the db
            //that's how we r finding the user
            _id:req.profile._id
        },
        //values that we want to update 
        {$set:req.body},
        //mandatory parameter
        {new:true,useFindAndModify:false},
        //callback
        (err,user)=>{
            if(err){
                return res.status(400).json({
                error:"u r not authorised to update"
                })
            }
            user.salt=undefined;
            user.encry_password=undefined;
            res.json(user);
        }
    );
};

exports.userPurchaseList=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No order in this account"
            })
        }
        return  res.json(order);
    })
}

exports.pushOrderInPurchaseList=(req,res,next)=>{
    let purchases=[]
    //assume that frontend is sending the information in the form of products & we r looping &
    // creating a object & storing in a local array
    req.body.order.products.forEach(product => {
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id

        })
    });

    //store this in db
    User.findOneAndUpdate(
        //find
        {_id:req.profile._id},
        //bcoz this is an array ,so $push into user purchases  from local purchases
        { $push:{purchases:purchases}},
        {new:true},   
        (err,purchases) => {
            if(err){
                return res.status (400).json({
                    error:"Unable to save purchase list"
                })
            }
            //just a middleware ,so no need to return ,just update in db
            next(); 
        }
        
    )



    
}