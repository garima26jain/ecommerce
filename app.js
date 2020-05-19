require('dotenv').config()
const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const app=express();
//my routes
const authRoutes=require('./routes/authentication');
const userRoutes=require('./routes/user');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const orderRoutes=require('./routes/order');
//db connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED");
})
//for using middleware .use is used
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes--here /api is used for every route that access the backend
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);

//port
const port=process.env.PORT||5000;
//server 
app.listen(port,()=>{
    console.log(`app is running at ${port}`);
})