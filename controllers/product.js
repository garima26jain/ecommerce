const Product=require('../models/product');
const _ =require('lodash');
const formidable=require('formidable');
//to browse images ,access to file system
const fs=require('fs');


exports.getProductById=(req,res,next,id)=>{
    //this will return  product by finding among all the product
    Product.findById(id)
    //sort it according to category or populate
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        req.product=product;
        next();
    })

}

exports.createProduct=(req,res)=>{
    //form creation
    //form object
    let form =new formidable.IncomingForm();
    //form extension either jpg,pdf etc
    form.keepExtensions=true;

    //parse the form --3 objects
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }

        //destructure the fields--no need for individual destructuring
        const {name,description,price,category,stock}=fields

        if(!name||!description||!price||!category||!stock){
            return res.status(400).json({
                error:"Please include all fields"
            })
        }

        //fields ,,product created thru the passed in fields
        let product=new Product(fields);

        //handle file here
        //1.size of image
        if(file.photo.size>3000000){
            return res.status(400).json({
                error:"file size too big"
            })
        }
        //else mention the path of the file ,i.e the properties of photo field in Product
        product.photo.data =fs.readFileSync(file.photo.path)
        product.photo.contentType=file.photo.type

        //save the product to DB
        product.save((err,product)=>{
            if(err){
                res.status(400).json({
                    error:"Saving t-shirt in db failed"
                })
            }
            res.json(product);
        })


    })

}

//in get 

exports.getProduct=(req,res)=>{
    req.product.photo=undefined//this wont make retriving the data bulky
    return res.json(req.product);
}

//middleware
//when we send the request from the front end , as soon as other data is retrieved ,
//photo will be loaded in background,so creating a middleware
exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

//delete
exports.deleteProduct=(req,res)=>{
    let product=req.product
    product.remove((err,deletedproduct)=>{
        if(err){
            return res.status(400).json({
                error:"failed to delete "
            })
        }
        res.json({
            message:"Deletion was successful",
            deletedproduct
        })
    })
}

//update 
// in update product we will have a form displayed again and 
//the fields are auto-filled by the existing value in database 
//then admin can updaet the fields & save it again to database
exports.updateProduct=(req,res)=>{
    let form =new formidable.IncomingForm();
    //form extension either jpg,pdf etc
    form.keepExtensions=true;

    //parse the form --3 objects
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }

        //no destructuring required

        //getting the product
        let product=req.product
        //updating Product
        //now update the product by loadash
        /**extend method takes the value u r having and extends those values ,i.e values got update there 
         * it takes  w paramter-(fields that u r looking for ,fields from form)
         *  these fields are updated int the 1st parameter
        */
        product=_.extend(product,fields)


        //handle file here
        //1.size of image
        if(file.photo.size>3000000){
            return res.status(400).json({
                error:"file size too big"
            })
        }
        //else mention the path of the file ,i.e the properties of photo field in Product
        product.photo.data =fs.readFileSync(file.photo.path)
        product.photo.contentType=file.photo.type

        //save the product to DB
        product.save((err,product)=>{
            if(err){
                res.status(400).json({
                    error:"Updation in db failed"
                })
            }
            res.json(product);
        })


    })
}

//products listing
exports.getAllProducts=(req,res)=>{
    //how many products to be displayed ,selected by user or default value
    //by default everything is a string 
    let limit=req.query.limit ? parseInt(req.query.limit):8;
    let sortBy=req.query.sortBy?req.query.sortBy:"_id"
    Product.find()
    .populate("category")
    //photos can throw the response a bit late,for that not to happen 
    .select("-photo")//minus sign means don't select or just name the fields u want to select
    .sort([[sortBy,"asc"]])//functionality selected by user or default value
    .limit(limit)//functionality selected by user or default value
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"No product found"
            })
        }
        res.json(products)
    })
}

//middleware
exports.updateStock=(req,res,next)=>{
    //get every single item from cart
    //map(prod) --looping thru every single product & updating the stock & sold

    /**Explaination
     * order-->many products-->loop thru every product -->updateOne option-->
     * now operations to be performed
     * which to update ,filter on the basis of id, & final operaton -->update stock & sold
     */


    let myOperations =req.body.order.products.map(prod=>{
        return {
            UpdateOne:{
                filter:{_id:prod._id},
                update:{$inc:{stock:-prod.count,sold:+prod.count}}
            }
        }
    })
    prod.bulkWrite(myOperaions,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Bulk operation failed"
            })
        }
        next();
    })

}

exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"No categories found"
            })
        }
        res.json(category);
    })
}