const express=require('express');
const router=express.Router();
const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories}=require('../controllers/product');
const {getUserById}=require('../controllers/user');
const {isSignedIn,isAuthenticated,isAdmin}=require('../controllers/authentication');


router.param("productId",getProductById)

router.param("userId",getUserById)
//create route
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct); 
//read route
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//delete  route
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);

//update 
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);

//listing allproduct --with a limitation to  the number being displayed

router.get("/products",getAllProducts)

router.get("/products/categories",getAllUniqueCategories)

module.exports=router