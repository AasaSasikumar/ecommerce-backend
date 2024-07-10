// const express = require("express");
// const {
//   latestArrivals,
//   mens,
//   womens,
//   productDetails,
//   login,
//   signup,
//   AddToWishlist,
//   checkWishlist,
//   getWishlist,
//   removeWishlist,
  
// } = require("../Controller/UserController");
// const router = express.Router();
// const userAuth = require("../Middleware/userAuth");

// //POST

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/wishlist",userAuth, AddToWishlist);


// //GET

// // router.get("/", featuredProducts);
// router.get("/latestarrival", latestArrivals);
// router.get("/mens", mens);
// router.get("/womens", womens);
// // router.get("/categories/casuals", casuals);
// // router.get("/categories/formals", formals);
// // router.get("/categories/sandals", sandals);
// // router.get("/categories/sneakers", sneakers);
// // router.get("/luxury", luxury);
// router.get("/shop/:id", productDetails);
// router.get("/wishlist/check/:productId",userAuth, checkWishlist);
// router.get("/wishlist", userAuth, getWishlist);
// router.delete("/wishlist/remove/:productId",userAuth,removeWishlist)

// // router.get("/auth/status", (req, res) => {
// //   let isLoggedIn = false;
// //   if (req.user) {
// //     isLoggedIn = true;
// //   }

// //   res.json({ isLoggedIn });
// // });

// module.exports = router;






const express = require ("express");
const { 
    signup,
    login,
    // shopProduct,
    Mens,
    Womens,
    Kids,
    productDetails,
    // getReviews,
    // postReviews,
    //  AddToWishlist,
    //  checkWislist,
    // getWishlist,
    // removeWishlist,
    //  getMyList,
    // addToMyList,
    getMyList,
    addToMyList,
    removeFromMyList,
    // deleteFromMyList,
    // getMyListItemById,

    addToCart,
    getCart,
    removeFromCart,
    editCart,
    fetchDataFromApi,
    // addToMyList,
    // deleteFromMyList
    
    } = require('../Controller/UserController');
    

    // const  { verifyToken }   = require('../Middleware/userAuth');
const userAuth = require("../Middleware/userAuth")
const router = express.Router()

// router.get('/',userAuth)

//POST

router.post('/signup',signup);
router.post('/login',login);
// router.post("/reviews/create", postReviews);
// router.post("/wishlist",userAuth, AddToWishlist);

// router.post('/cart', addCart);

//GET

router.get('/shop',fetchDataFromApi)
router.get("/mens", Mens);
router.get("/womens", Womens);
router.get("/kids", Kids);
router.get("/shop/:id", productDetails);
// router.get("/reviews/:productId", getReviews);
// router.get("/wishlist/check/:productId", checkWislist);

// router.get('/wishlist', verifyToken, getWishlist);
// router.get("/wishlist/check/:productId",userAuth, checkWislist);
// router.get("/wishlist",userAuth, getWishlist);
//DELETE
// router.delete("/wishlist/remove/:productId",userAuth, removeWishlist);



//Cart code

router.post('/cart/add',userAuth, addToCart)
router.get('/cart',userAuth, getCart)
router.delete('/cart/remove',userAuth, removeFromCart)
router.put('/cart/edit',userAuth, editCart);


//Wishlist code

// router.get('/my-list', userAuth, getMyList);
// router.post('/my-list/add', userAuth, addToMyList);
// router.delete('/my-list/:id', userAuth, deleteFromMyList);
// router.get('/my-list/:id', userAuth, getMyListItemById);

router.get('/my-list', getMyList);
router.post('/my-list/add', addToMyList);
router.delete('/my-list/:id',removeFromMyList);


module.exports=router;

