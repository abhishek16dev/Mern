const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDb= require('./config/db');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDb();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/auth',authRoutes)

app.get('/', function(req,res){
    res.send("hello wolrd server");
})

app.listen(3000,()=>{
    console.log("server is listing on 3000")
})