// const mongoose = require('mongoose');

//  const userschenma = mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//     },
//     email :{
// type:String,
// required:true,
// unique:true,
//     },
//     password:{
//         type:String,
//         required:true
//     }

// },
// {
//     timestamps:true
// })

//  const User = mongoose.modelNames("User",userschenma)

//  module.exports = User;



const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String,
         enum: ['user', 'admin'], 
         default: 'user' }
}, {
    timestamps: true
});

const User = mongoose.model("User", userschema);

module.exports = User;
