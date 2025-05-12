 const mongoose = require('mongoose')


 const connectDb =  async () =>{
   
     try{
        const conn = await mongoose.connect(`${process.env.MONODB_URL}`)
        console.log("connected to db")
 } catch(err){
 console.log(err.message)
 process.exit(1);
 }
 }



 module.exports = connectDb