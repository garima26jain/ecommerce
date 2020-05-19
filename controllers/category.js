const Category=require('../models/category');


exports.getCategoryById=(req,res,next,id)=>{

    Category.findById(id).exec((err,cat)=>{
        if(err){
            return res.status(400).json({
                error:"Category not found in DB"
            })
        }
        req.category=cat;
        next();
    })

}

exports.createCategory=(req,res)=>{
    const category=new Category(req.body);
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Unable to save"
            })
        }
        res.json({category});
    })
};

exports.getCategory=(req,res)=>{
    return res.json(req.category);
}

exports.getAllCategory=(req,res)=>{
    //.find -for everything
    Category.find().exec((err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"no categories found"
            })
        }
        res.json(categories);
    });
};

exports.updateCategory=(req,res)=>{
    const category=req.category
    category.name=req.body.name;

    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to update Category"
            })
        }
        res.json(updatedCategory); 
    })
}

exports.deleteCategory=(req,res)=>{
    const category=req.category

    //in the object below we get category that just removed
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete Category"
            })
        }
        res.json({
            message:` ${category} successfully deleted`
        })
    })
}