// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// require ('dotenv').config();
// const _ = require("lodash");
// // const all_product = require("../path_to_your_product_file"); 
// const UserModel = require("../Model/UserModel");
// const productModel = require("../Model/productModel");
// // const maxAge = 3 * 24 * 60 * 60;
// // console.log("JWT Secret Key:", process.env.JWT_SECRETKEY);

// const createToken = (userId) => {
//     const token = jwt.sign({ userId }, "JWT" , { expiresIn: "30d" });
//     return token;
// };
// // User Authentication
// module.exports.signup = async (req, res,next) => {
//   console.log(req.body,"%%%%%%%%%%%%%%%%%%%%%%%%%%%")
//   const { email, password, name } = req.body;

//   try {
//     const emailExists = await UserModel.findOne({ email:email });
//     if (emailExists) {
//       return res.json({ message: "Email already exists", status: false });
//     }

//     //const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new UserModel({
//      username: name, 
//     email:email, 
//     password:password });
//     const userDetails = await (newUser.save());
//     const token = createToken(userDetails._id);

//     return res.json({
//       message: "Account created successfully",
//       status: true,
//       token,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.json({ message: "Internal server error in sign up", status: false });
//   }
// };

// module.exports.login = async (req, res, next) => {
//   console.log(req.body,"%%%%%%%%")
//   const { email, password } = req.body;
//   try {
//     const user = await UserModel.findOne({ email });
//     console.log(user,"!!!!!!!!!!!!!!!!!!!!!!!!!!");
//     if (user) {
//       const passwordMatches = await bcrypt.compare(password,user.password);

//       if (passwordMatches) {
//         const token = createToken(user._id);
//         return res.status(200).json({
//           user: user,
//           message: "User login successful",
//           created: true,
//           token,
//         });
//       } else {
//         return res.json({ message: "Incorrect password", created: false });
//       }
//     } else {
//       return res.json({ message: "Account not found", created: false });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       message: "Internal server in sign up",
//       created: false,
//     });
//   }
// };

// // Fetch Products
// const fetchProducts = (query, res, message) => {
//   try {
//     const data = all_product.filter(query);
//     return res.status(200).json({ message, status: true, products: data });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error in fetching products", status: false });
//   }
// };

// module.exports.latestArrivals = (req, res) => fetchProducts(
//   (product) => true, 
//   res, 
//   "Latest arrivals fetched"
// );

// module.exports.mens = (req, res) => fetchProducts(
//   (product) => product.category === "men", 
//   res, 
//   "Men's collection fetched"
// );

// module.exports.womens = (req, res) => fetchProducts(
//   (product) => product.category === "women", 
//   res, 
//   "Women's collection fetched"
// );

// module.exports.kids = (req, res) => fetchProducts(
//   (product) => product.category === "kid", 
//   res, 
//   "Kids' collection fetched"
// );

// // Endpoint to fetch product details by ID
// module.exports.productDetails = (req, res) => {
//   try {
//     const productId = parseInt(req.params.id);
//     const product = all_product.find((product) => product.id === productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found", status: false });
//     }

//     return res.status(200).json({ message: "Product details fetched", status: true, product });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error", status: false });
//   }
// };

// // Endpoint to fetch featured products
// module.exports.featuredProducts = (req, res) => {
//   try {
//     const shuffledProducts = _.shuffle(all_product);
//     const data = shuffledProducts.slice(0, 4);

//     return res.status(200).json({
//       message: "Featured products fetched",
//       status: true,
//       products: data,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error in featured products", status: false });
//   }
// };
// module.exports.AddToWishlist = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = await productModel.findById(productId);

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     const user = await UserModel.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     if (user.wishlist.includes(productId)) {
//       // Remove product from wishlist
//       user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
//       await user.save();
//       return res.status(201).json({
//         message: "Product removed from wishlist",
//       });
//     } else {
//       // Add product to wishlist
//       user.wishlist.push(productId);
//       await user.save();
//       return res.status(200).json({
//         message: "Product added to wishlist",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// module.exports.checkWishlist = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const user = await UserModel.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     const isInWishlist = user.wishlist.includes(productId);
//     res.status(200).json({
//       inWishlist: isInWishlist,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// module.exports.getWishlist = async(req, res) => {
//   try {
//     const data = await UserModel.findById(req.user._id).populate('wishlist');

//     res.status(200).json(data.wishlist)
//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };


// module.exports.AddToWishlist = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = await productModel.findById(productId);

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     const user = await UserModel.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     if (user.wishlist.includes(productId)) {
      
//       user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
//       await user.save();
//       return res.status(201).json({
//         message: "Product removed from wishlist",
//       });
//     } else {
      
//       user.wishlist.push(productId);
//       await user.save();
//       return res.status(200).json({
//         message: "Product added to wishlist",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };



// module.exports.checkWislist = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const user = await UserModel.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     const isInWishlist = user.wishlist.includes(productId);
//     res.status(200).json({
//       inWishlist: isInWishlist,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };


// module.exports.getWishlist = async (req, res) => {
//   try {
//     const data = await UserModel.findById(req.user._id).populate("wishlist");

//     res.status(200).json(data.wishlist);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// module.exports.removeWishlist = async (req, res) => {
//   const userId = req.user._id;
//   const productId = req.params.productId;

//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     user.wishlist = user.wishlist.filter(
//       (item) => item.toString() !== productId
//     );
//     await user.save();

//     res.status(200).json({
//       message: "product removed from wishlist",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal server error",
//       error,
//     });
//   }
// };






// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// require('dotenv').config();
// const _ = require("lodash");
// const UserModel = require("../Model/UserModel");
// const productModel = require("../Model/productModel");

// const createToken = (userId) => {
//     const token = jwt.sign({ id: userId }, process.env.JWT_SECRETKEY, { expiresIn: "30d" });
//     return token;
// };

// // User Authentication
// module.exports.signup = async (req, res) => {
//   const { email, password, name } = req.body;

//   try {
//     const emailExists = await UserModel.findOne({ email });
//     if (emailExists) {
//       return res.status(400).json({ message: "Email already exists", status: false });
//     }

//     // const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new UserModel({ username: name, email, password: hashedPassword });
//     const userDetails = await newUser.save();
//     const token = createToken(userDetails._id);

//     return res.status(201).json({
//       message: "Account created successfully",
//       status: true,
//       token,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error in sign up", status: false });
//   }
// };

// module.exports.login = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const user = await UserModel.findOne({ email });
//     if (user) {
//       const passwordMatches = await bcrypt.compare(password, user.password);
//       if (passwordMatches) {
//         const token = createToken(user._id);
//         return res.status(200).json({
//           user: user,
//           message: "User login successful",
//           created: true,
//           token,
//         });
//       } else {
//         return res.status(401).json({ message: "Incorrect password", created: false });
//       }
//     } else {
//       return res.status(404).json({ message: "Account not found", created: false });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal server error in login",
//       created: false,
//     });
//   }
// };

// // Fetch Products
// const fetchProducts = (query, res, message) => {
//   try {
//     const data = all_product.filter(query);
//     return res.status(200).json({ message, status: true, products: data });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error in fetching products", status: false });
//   }
// };

// module.exports.latestArrivals = (req, res) => fetchProducts(
//   (product) => true, 
//   res, 
//   "Latest arrivals fetched"
// );

// module.exports.mens = (req, res) => fetchProducts(
//   (product) => product.category === "men", 
//   res, 
//   "Men's collection fetched"
// );

// module.exports.womens = (req, res) => fetchProducts(
//   (product) => product.category === "women", 
//   res, 
//   "Women's collection fetched"
// );

// module.exports.kids = (req, res) => fetchProducts(
//   (product) => product.category === "kid", 
//   res, 
//   "Kids' collection fetched"
// );

// // Endpoint to fetch product details by ID
// module.exports.productDetails = (req, res) => {
//   try {
//     const productId = parseInt(req.params.id);
//     const product = all_product.find((product) => product.id === productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found", status: false });
//     }

//     return res.status(200).json({ message: "Product details fetched", status: true, product });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error", status: false });
//   }
// };

// // Endpoint to fetch featured products
// module.exports.featuredProducts = (req, res) => {
//   try {
//     const shuffledProducts = _.shuffle(all_product);
//     const data = shuffledProducts.slice(0, 4);

//     return res.status(200).json({
//       message: "Featured products fetched",
//       status: true,
//       products: data,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error in featured products", status: false });
//   }
// };

// module.exports.AddToWishlist = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = await productModel.findById(productId);

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     const user = await UserModel.findById(req.user._id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     if (user.wishlist.includes(productId)) {
//       user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
//       await user.save();
//       return res.status(201).json({
//         message: "Product removed from wishlist",
//       });
//     } else {
//       user.wishlist.push(productId);
//       await user.save();
//       return res.status(200).json({
//         message: "Product added to wishlist",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// module.exports.checkWislist = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const user = await UserModel.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     const isInWishlist = user.wishlist.includes(productId);
//     res.status(200).json({
//       inWishlist: isInWishlist,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// module.exports.getWishlist = async (req, res) => {
//   try {
//     const data = await UserModel.findById(req.user._id).populate("wishlist");

//     res.status(200).json(data.wishlist);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// module.exports.removeWishlist = async (req, res) => {
//   const userId = req.user._id;
//   const productId = req.params.productId;

//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     user.wishlist = user.wishlist.filter(
//       (item) => item.toString() !== productId
//     );
//     await user.save();

//     res.status(200).json({
//       message: "Product removed from wishlist",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal server error",
//       error,
//     });
//   }
// };




// const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const productModel = require('../Model/productModel');
const UserModel = require("../Model/UserModel");
const maxAge = 3 * 24 * 60 * 60;
const { MyList } = require("../Model/myList");
// const { fetchDataFromApi } = require('../../frontend/src/Services/Userapi');




const createToken = (userId) => {
    const token = jwt.sign({ userId }, "JWT", { expiresIn: maxAge });
    return token;
};

module.exports.signup = async (req, res, next) => {
    console.log(req.body,"%%%%%%%%%%%%%%%%%%%%%%%");
    const { email, password, name} = req.body;
    try{
     const emailExists=await UserModel.findOne({ email:email });
     if(emailExists) {
        return res.json({ message:'Email already exists',
        status: false
    });
     }
     const newUser = new UserModel({
        username: name,
        email: email,
        password: password,
     });

     const userDetails = await (newUser.save());
     const token = createToken(userDetails._id);
     return res.json({
        message: "Account created successfully",
        status: true,
        token,
     });
    } catch (error) {
        console.log(error);
        return res.json({
            message:"Internal server in sign up",
            status: false,
        });
    }
};


module.exports.login = async (req, res, next) => {
console.log(req.body,"%%%%%%%%%%%%%%%%%%%%%%%");
const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
         console.log(user,"!!!!!!!!!!!!!!!!!!!!!!!!!!");

        if (user) {
            const passwordMatches = await bcrypt.compare(password,user.password);
            if (passwordMatches) {
                const token = createToken(user._id);
                return res
                  .status(200)
                  .json({
                    user: user,
                    message: "User login successful",
                    created: true,
                    token,
                  });
              } else {
                return res.json({ message: "incorrect password", created: false });
              }
            } else {
              return res.json({ message: "Account not found", created: false });
            }
          } catch (error) {
            console.log(error);
            return res.json({
              message: "Internal server in sign up",
              created: false,
            });
          }
        };
        
        
        module.exports.fetchDataFromApi = async (req, res, next) => {
          try {
            const data = await productModel.find();
            res.json({
              message: "Product Data fetched",
              status: true,
              shopProduct: data,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: "Internal server error during product fetching",
              status: false,
            });
          }
        };
        
        
        module.exports.Mens = async (req, res, next) => {
          try {
            const data = await productModel.find({
              category:"Mens"
        
            }
           );
            res.json({
              message: "mens Product Data fetched",
              status: true,
              shopProduct: data,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: "Internal server error during product fetching",
              status: false,
            });
          }
        };
        
        module.exports.Womens = async (req, res, next) => {
          try {
            const data = await productModel.find({
              category:"Womens"
        
            }
           );
            res.json({
              message: "womens Product Data fetched",
              status: true,
              shopProduct: data,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: "Internal server error during product fetching",
              status: false,
            });
          }
        };
        
        module.exports.Kids = async (req, res, next) => {
          try {
            const data = await productModel.find({
              category:"Kids"
        
            }
           );
            res.json({
              message: "kids Product Data fetched",
              status: true,
              shopProduct: data,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: "Internal server error during product fetching",
              status: false,
            });
          }
        };
        
        //single product

        module.exports.productDetails = async (req, res) => {
          try {
              const productId = req.params.id;
              const singleProduct = await productModel.findById(productId);
              if (singleProduct) {
                  return res.status(200).json({
                      message: "success",
                      status: true,
                      product: singleProduct,
                  });
              }
              res.status(404).json({
                  message: "Product not found",
                  status: false,
              });
          } catch (err) {
              console.log(err);
              res.status(500).json({
                  message: "Internal server error",
                  status: false,
              });
          }
      };

      // module.exports.getReviews = async (req, res) => {
      //   try {
      //     const reviews = await reviewModel
      //       .find({ productId: req.params.productId })
      //       .populate("userId", "username");
      //     res.json(reviews);
      //   } catch (error) {
      //     res.status(500).json({
      //       message: error.message,
      //     });
      //   }
      // };
      
      // module.exports.postReviews = async (req, res) => {
      //   const review = new reviewModel({
      //     productId: req.body.productId,
      //     userId: req.user.id,
      //     rating: req.body.rating,
      //     comment: req.body.comment,
      //   });

      // try {
      //     const newReview = await review.save();
      //     res.status(201).json(newReview);
      //   } catch (error) {
      //     res.status(400).json({
      //       message: error.message,
      //     });
      //   }
      // };
      
      // Add to Wishlist

//       module.exports.AddToWishlist = async (req, res) => {
//         try {
//           const { productId } = req.body;
//           const product = await productModel.findById(productId);
      
//           if (!product) {
//             return res.status(404).json({
//               message: "Product not found",
//             });
//           }
      
//           const user = await UserModel.findById(req.user._id);
//           if (!user) {
//             return res.status(404).json({
//               message: "User not found",
//             });
//           }
      
//           if (user.wishlist.includes(productId)) {
//             // Remove product from wishlist
//             user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
//             await user.save();
//             return res.status(201).json({
//               message: "Product removed from wishlist",
//             });
//           } else {
//             // Add product to wishlist
//             user.wishlist.push(productId);
//             await user.save();
//             return res.status(200).json({
//               message: "Product added to wishlist",
//             });
//           }
//         } catch (error) {
//           res.status(500).json({
//             message: "Server error",
//           });
//         }
//       };
      

// module.exports.checkWislist = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const user = await UserModell.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     const isInWishlist = user.wishlist.includes(productId);
//     res.status(200).json({
//       inWishlist: isInWishlist,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

// Get Wishlist

// exports.getWishlist = async (req, res) => {
//   try {
//       const userId = req.userId; 
//       const user = await userModel.findById(userId).populate('wishlist');
//       if (!user) {
//           return res.status(404).json({
//               message: "User not found",
//               status: false,
//           });
//       }

//       res.status(200).json({
//           message: "Wishlist fetched",
//           status: true,
//           wishlist: user.wishlist,
//       });
//   } catch (err) {
//       console.log(err);
//       res.status(500).json({
//           message: "Internal server error",
//           status: false,
//       });
//   }
// };

// module.exports.getWishlist = async (req, res) => {
//   try {
//     const data = await UserModel.findById(req.user._id).populate("wishlist");

//     res.status(200).json(data.wishlist);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };




// Remove from Wishlist

// module.exports.removeWishlist = async (req, res) => {
//   const userId = req.user._id;
//   const productId = req.params.productId;

//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     user.wishlist = user.wishlist.filter(
//       (item) => item.toString() !== productId
//     );
//     await user.save();

//     res.status(200).json({
//       message: "product removed from wishlist",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal server error",
//       error,
//     });
//   }
// };

// module.exports.removeWishlist = async (req, res) => {
//   try {
//     const userId = req.userId; 
//     const { productId } = req.body;

//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         status: false,
//       });
//     }

//     user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
//     await user.save();

//     res.status(200).json({
//       message: "Product removed from wishlist",
//       status: true,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Internal server error",
//       status: false,
//     });
//   }
// };



// Get Wishlist
// module.exports.getMyList = async (req, res) => {
//     try {
//         const myList = await MyList.find({ userId: req.user._id });
//         if (!myList) {
//             return res.status(500).json({ success: false });
//         }
//         return res.status(200).json(myList);
//     } catch (error) {
//         return res.status(500).json({ success: false, error: error.message });
//     }
// };

// // Add to Wishlist
// module.exports.addToMyList = async (req, res) => {
//     try {
//         const { productId, ProductTitle, image, price } = req.body;
//         const existingItem = await MyList.findOne({ productId, userId: req.user._id });
//         if (existingItem) {
//             return res.status(401).json({ status: false, msg: "Product already added to MyList" });
//         }

//         const newItem = new MyList({
//             ProductTitle,
//             image,
//             price,
//             productId,
//             userId: req.user._id
//         });

//         const savedItem = await newItem.save();
//         return res.status(201).json(savedItem);
//     } catch (error) {
//         return res.status(500).json({ success: false, error: error.message });
//     }
// };

// // Delete from Wishlist
// module.exports.deleteFromMyList = async (req, res) => {
//     try {
//         const item = await MyList.findById(req.params.id);
//         if (!item || item.userId.toString() !== req.user._id.toString()) {
//             return res.status(404).json({ msg: "The item with the given ID was not found!" });
//         }

//         const deletedItem = await MyList.findByIdAndDelete(req.params.id);
//         if (!deletedItem) {
//             return res.status(404).json({ message: "Item not found!", success: false });
//         }

//         return res.status(200).json({ success: true, message: "Item deleted!" });
//     } catch (error) {
//         return res.status(500).json({ success: false, error: error.message });
//     }
// };

// Get Wishlist Item by ID
// module.exports.getMyListItemById = async (req, res) => {
//     try {
//         const item = await MyList.findById(req.params.id);
//         if (!item || item.userId.toString() !== req.user._id.toString()) {
//             return res.status(500).json({ message: "Item with the given ID not found!" });
//         }
//         return res.status(200).json(item);
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", error: error.message });
//     }
// };



module.exports.getMyList = async (req, res) => {
  try {
    const { userId } = req.query;
    const myList = await MyList.find({ userId });
    res.status(200).json(myList);
  } catch (error) {
    console.error("Error fetching my list:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.addToMyList = async (req, res) => {
  try {
    const { productId, userId, ProductTitle, image, price } = req.body;
    const existingItem = await MyList.findOne({ productId, userId });

    if (existingItem) {
      return res.status(401).json({ status: false, msg: "Product already added to My List" });
    }

    const newItem = new MyList({ productId, userId, ProductTitle, image, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding to My List:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.removeFromMyList = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MyList.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await MyList.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Item removed" });
  } catch (error) {
    console.error("Error removing item from My List:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//Add Cart

module.exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItemIndex = user.cart.findIndex(
      (cartItem) => cartItem.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity: quantity });
    }

    await user.save();

    res.status(200).json({
      message: "Product added to cart",
      cart: user.cart,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
      status: false,
    });
  }
};

module.exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId).populate("cart.product");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};


module.exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItemIndex = user.cart.findIndex(
      (cartItem) => cartItem.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      user.cart.splice(cartItemIndex, 1);
      await user.save();
      return res.status(200).json({
        message: "Product removed from cart",
        cart: user.cart,
        status: true,
      });
    } else {
      return res.status(404).json({
        message: "Product not found in cart",
        status: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
      status: false,
    });
  }
};


module.exports.editCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItemIndex = user.cart.findIndex(
      (cartItem) => cartItem.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity = quantity;
      await user.save();
      return res.status(200).json({
        message: "Cart updated successfully",
        cart: user.cart,
        status: true,
      });
    } else {
      return res.status(404).json({
        message: "Product not found in cart",
        status: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
      status: false,
    });
  }
};

       

