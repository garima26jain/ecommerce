const express=require('express');
const router=express.Router();

const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,deleteCategory}=require('../controllers/category');
const {getUserById}=require('../controllers/user');
const {isAdmin,isAuthenticated,isSignedIn}=require('../controllers/authentication');

//params
router.param('userId',getUserById);
router.param('categoryId',getCategoryById);

//routes
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);

//update
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);

//delete
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteCategory);

module.exports=router;