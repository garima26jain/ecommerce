const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const ProductCartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref: "Product"
    },
    name:String,
    count:Number,
    price:Number
})

const OrderSchema=new mongoose.Schema({
    //product inside cart here we have new properties
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{
        type:Number
    },
    address:String ,
    //ENUMS
    status:{
        type:String,
        default:"Recieved",
        enum:["Cancelled","Delivered","Shipped ","Processing","Recieved"]
    },
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

//exporting multiple schema
const Order=mongoose.model("Order",OrderSchema);
const ProductCart=mongoose.model("ProductCart",ProductCartSchema);

module.exports={Order,ProductCart};