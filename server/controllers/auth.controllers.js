// const User = require("../models/user");
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// module.exports.register = async function (req, res) {
//     console.log("req.body is:", req.body);

//     const { name, email, password } = req.body;
//     try {
//         if (!name || !email || !password) {
//             return res.status(400).json({
//                 message: 'All feilds are equal'
//             })
//         }

//         let exuser = await User.findOne({ email });
//         if (exuser) {
//             return res.status(400).json({
//                 message: 'User already exists'
//             })
//         }

//         const salt = await bcrypt.genSalt()

//         const hashedpassword = await bcrypt.hash(password, salt)

//       const   nuser = await User.create({
//             name,
//             email,
//             password: hashedpassword
//         })

//         console.log("nuser",nuser);

//         const token = jwt.sign({ id: nuser._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             maxAge: 20 * 24 * 60 * 60 * 1000
//         });
//         res.status(200).json({
//             message:'User Registered SUccessfully'
//         })

//     }
//  catch (err) {

//     res.status(500).json({
//         messaage:'Something went Wrong',
//         err
//     })
//  }
// };

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// module.exports.register = async function (req, res) {
//   console.log("START register");
//   console.log("req.body is:", req.body);

//   const { name, email, password } = req.body;

//   try {
//     if (!name || !email || !password) {
//       console.log("Missing fields");
//       return res.status(400).json({
//         message: "All fields are required",
//       });
//     }

//     let exuser = await User.findOne({ email });
//     console.log("exuser", exuser);

//     if (exuser) {
//       console.log("User already exists");
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     const salt = await bcrypt.genSalt();
//     console.log("salt generated");

//     const hashedpassword = await bcrypt.hash(password, salt);
//     console.log("password hashed");

//     const nuser = await User.create({
//       name,
//       email,
//       password: hashedpassword,
//       role: role || 'user',
//     });

//     console.log("nuser created:", nuser); // <== This should now print

//     const token = jwt.sign({ id: nuser._id,role: user.role  }, process.env.JWT_SECRET, {
//       expiresIn: "2d",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 20 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       message: "User Registered Successfully",
//     });
//   } catch (err) {
//     console.error("Register Error:", err);
//     res.status(500).json({
//       message: "Something went wrong",
//       error: err.message,
//     });
//   }
// };

module.exports.register = async function (req, res) {
  console.log("START register");
  console.log("req.body is:", req.body);

  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password) {
      console.log("Missing fields");
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let exuser = await User.findOne({ email });
    console.log("exuser", exuser);

    if (exuser) {
      console.log("User already exists");
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt();
    console.log("salt generated");

    const hashedpassword = await bcrypt.hash(password, salt);
    console.log("password hashed");

    // If the role is provided, it will be used; otherwise, 'user' is assigned by default.
    const nuser = await User.create({
      name,
      email,
      password: hashedpassword,
      role: role || 'user',
    });

    console.log("nuser created:", nuser); // <== This should now print

    const token = jwt.sign({ id: nuser._id, role: nuser.role }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 20 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User Registered Successfully",
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};


module.exports.login = async function (req, res) {
  const { email, password } = req.body;
  try {

    if (!email || !password) {
      return res.status(400).json({
        message: "All feiled are required",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found ",
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: " Invalid passoword",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 20 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      messsage: "Login Successfully",
      user,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};


module.exports.logout = function(req,res){

    res.cookie('token','',{
        httpOnly:true,
        expire: new Date(0)
    })

    res.status(200).json({
        message:"Logout successfully"
    })
}

module.exports.profile = function(req,res){
res.status(200).json({
    user : req.user
})
}


// user.controller.js or a similar file

module.exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Add your logic to delete the user from the database
      const result = await User.findByIdAndDelete(userId);
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  