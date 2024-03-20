const UserModel = require("../Model/UserModel");
const jwt = require('jsonwebtoken');

const createToken = (userId) => {
   const token = jwt.sign({userId}, "JWT", {expiresIn: "24h"});
   return token;
};

module.exports.signup=async(req,res,next)=>{
   console.log(req.body)
    const{email,password,username} = req.body;
    try{
     const emailExist=await UserModel.findOne({email:email});
     if(emailExist){
        return res.json({messages: "Email already exists", status: false});
     }
     const newUser = new UserModel({
        userName : username,
        email: email,
        password: password,
     });
     const userDetails = await newUser.save();
     const token = createToken(UserModel._id);
     return res.json({
        message: "Account created successfully",
        statu: true,
        token,
     });
    }catch (err){
        console.log(err);
        return res.json({message:"internal server in sign up", status:false});
        
    }
};
