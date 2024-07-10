// const jwt = require("jsonwebtoken");
// // const { JsonWebTokenError } = require("jsonwebtoken");
// const UserModel = require("../Model/UserModel")
// // const secret = process.env.JWT_SECRET;

// module.exports = async (req, res, next) => { 
//   try { 
//       const authHeader = req.headers.authorization; 
//       console.log(authHeader,"MIddleware One") 
//       const authToken = authHeader && authHeader.split(" ")[1]; 
//       console.log(authToken,"MIddleware Two") 
//       if (!authToken) {
//         return res.json({ 
//           loginfail: true, 
//           status:false, 
//           message: "no auth token", 
//   }); 
// }
//   //  const decode = jwt.verify(authToken,"jwt");
//   const decoded =jwt.verify(authToken,"JWT") 

//    const user = await UserModel.findOne({ _id: decoded.userId }); 

  
//   if (!user) { 
//       return res.json({ 
//           message: "Unauthorized access", 
//           status: false, 
//           loginfail: true, 
//       }); 
//   } 
//   req.user = user; 
//   next() 
// } 
// catch (error) { 
//   console.log(error); 
//   return res.json({ 
//       message: "Unauthorized access", 
//       status: false, 
//       loginfail: true, 
//   }); 
// } 
// }




// const jwt = require("jsonwebtoken");
// const UserModel = require("../Model/UserModel");

// module.exports = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     console.log(authHeader, "Middleware One");
//     const authToken = authHeader && authHeader.split(" ")[1];
//     console.log(authToken, "Middleware Two");
//     if (!authToken) {
//       return res.json({
//         loginfail: true,
//         status: false,
//         message: "No auth token",
//       });
//     }

//     const decoded = jwt.verify(authToken, "JWT");
//     const user = await UserModel.findOne({ _id: decoded.userId });

//     if (!user) {
//       return res.json({
//         message: "Unauthorized access",
//         status: false,
//         loginfail: true,
//       });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       message: "Unauthorized access",
//       status: false,
//       loginfail: true,
//     });
//   }
// };


const jwt = require("jsonwebtoken");

const userModel = require("../Model/UserModel");
module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader,"middleware one");
        const authToken = authHeader && authHeader.split(" ")[1];
        console.log(authToken,"middleware two");
        if (!authToken) {
          return res.json({
            loginfail: true,
            status:false,
            message: "No auth token",
    });
}
    const decode = jwt.verify(authToken, "JWT");

    const user = await userModel.findOne({_id:decode.userId});
    if (!user) {
        return res.json({
            message: "Unauthorized access",
            status: false,
            loginfail: true,
        });
    }
    req.user = user;
    next();
} catch (error) {
    console.log(error);
    return res.json({
        message: "Unauthorized access",
        status: false,
        loginfail: true,
    });
  }
};