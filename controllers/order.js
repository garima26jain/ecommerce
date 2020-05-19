//when 2 schema are exported thru model ,thn it is called in here with a destructuring syntax
const {Order,ProductCart}=require('../models/order');

exports.getOrderById=(req,res,next,id)=>{
    //here u need to inject individual product name & price,so populate
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:" No order  found in DB "
            })
        }
        req.order=order;
        next();
    })
}

exports.createOrder=(req,res)=>{
//order is dependent on User,so we need user
    req.body.order.user=req.profile
    const order=new Order(req.body.order);
    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:" Unable to save order in DB "
            })
        }
        res.json(order);
    })
}

exports.getAllOrders=(req,res)=>{
    Order.find()
    .populate("user" ,"_id  name")
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                error:" No orders found in  DB "
            })
        }
        res.json(orders);
    })
}

exports.updateStatus=(req,res)=>{
    Order.Update(
        {_id:req.order.orderId},
        {$set:{status:req.body.status}}
        ).exec((err,order)=>{
        
        if(err){
            return res.status(400).json({
                error:" unable to update order "
            })
        }
        res.json(order);
    })
}

exports.getOrderStatus=(req,res)=>{
    res.json(Order.schema.path("status").enumValues)}