//t-shirt schema

const mongoose=require('mongoose');
//destructring by {}
const {ObjectId}=mongoose.Schema;
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength:2000 
    },
    price:{
        type:Number,
        trim:true,
        required:true,
        maxlength:32
        
    },
    //every tshirt has some category
    //link category here with previous category schema defined
    category:{
        type:ObjectId,
        ref:"Category",
        required:true

    },
    stock:{
        type:Number,

    },
    sold:{
        type:Number,
        default:0
    },
    //storing the photos in database 

    photo:{
        data:Buffer,
        contentType:String
    }

},{timestamps:true});

module.exports=mongoose.model("Product",productSchema);