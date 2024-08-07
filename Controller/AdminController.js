const adminModel = require('../Model/adminModel');
const productModel=require("../Model/productModel")
const jwt = require("jsonwebtoken");
const UserModel = require('../Model/UserModel')
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
// const { validationResult } = require("express-validator");
// const { Products } = require('../../frontend/src/Services/Adminapi');
// const { Products}=require("../../frontend/src/Services/Adminapi")

const createToken = (adminId) => {
  const token = jwt.sign({ adminId }, "adminjwt", { expiresIn: maxAge });
  return token;
};

module.exports.Login = async (req, res, next) => {
  console.log(req.body, "%%%%%%%%%%%%%%%%%%%")
  const { email, password } = req.body;
 
  try {
    const admin = await adminModel.findOne({ email });
    if (admin) {
      const passwordMatches = await bcrypt.compare(password, admin.password);
      if (passwordMatches) {
        const token = createToken(admin._id);
        return res.status(200).json({
          admin: admin,
          message: "admin login succesful",
          created: true,
          token,
        });
      }
      else {
        return res.json({
          message: "incorrect password",
          created: false,
        });
      }
    } else {
      return res.json({
        message: "Account not found",
        created: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server in sign Up",
      created: false,
    })
  }

};
module.exports.userList = async (req, res, next) => {
  try {
    const data = await UserModel.find();

    res.json({
      message: "User list fetched",
      status: true,
      UserList: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in userlist",
      status: false,
    });
  }
};
//REMOVE User

exports.removeUser = async (req, res) => {
    try {
      const { userId } = req.params;
      await UserModel.findByIdAndDelete(userId);
      res.status(200).json({ message: "User removed successfully", status: true });
    } catch (error) {
      console.error("Error removing user:", error);
      res.status(500).json({ message: "Internal server error", status: false });
    }
  };




// module.exports.AddProducts = async (req, res) => {
//   // Validate request
//   // const errors = validationResult(req);
//   // if (!errors.isEmpty()) {
//   //   return res.status(400).json({ errors: errors.array() });
//   // }

//   const { name, description, price, category } = req.body;

//   // Check if essential fields are provided
//   if (!name || !description || !price || !category) {
//     return res.status(400).json({ errors: [{ msg: 'Please provide all required fields' }] });
//   }

//   try {
//     // Create a new product instance using the Product model
//     const product = new ProductModel({
//       name,
//       description,
//       price,
//       category,
//     });

//     // Save the product to the database
//     await product.save();

//     res.status(201).json({ message: 'Product created successfully', product }); // Return the created product
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };

// module.exports.AddProduct =async (req,res)=>{
//   try {
//       const { prod_name, price, description,image,category}=req.body;
         
//       const products=new Products({prod_name:prod_name ,price:price, description:description,image: image,category:category});
//       await products.save();
//       res.json({message:"product added successfully"});
//   } catch (error) {
//       res.status(400).json({error:error.message});
      
//   }
// };
module.exports.AddProducts= async (req, res) => {
  try {
    const { prod_name, price, description, image, category } = req.body;

    // Create a new product instance
    const products = new productModel({
      prod_name,
      price,
      description,
      image,
      category
    });

    // Save the product to the database
    await products.save();

    // Send a success response
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(400).json({ error: error.message });
  }
};
module.exports.productList=async (req,res,next)=>{

  try{
    const data=await productModel.find();

    res.status(200).json({
      message: "Products fetched",
      status: true,
      productList: data,
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error during product fetching",
      status: false,
    });
  }
}


// Edit a product

module.exports.editProduct = async (req, res) => {
  try{
    const product = await productModel.findById(req.params.id);
    if(!product){
      return res.status(404).json({ message: "Product not found "});
    }

    Object.assign(product, req.body);

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch(error) {
    res.status(400).json({ message: error.message});
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};


//DELETE 



module.exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await productModel.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product removed successfully", status: true });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
};



