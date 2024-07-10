const express = require("express");
const{Login,AddProducts,productList,userList,removeUser,deleteProduct,getProductById,editProduct}=require("../Controller/AdminController");
// const { default: ProductList } = require("../../frontend/src/components/Admin/ProductList/ProductList");

const router = express.Router();

//POST Methods
router.post("/login", Login);
router.post("/add", AddProducts);

//Delete Mwthods

 router.delete('/user/:userId', removeUser);
 router.delete('/product/:productId', deleteProduct)


//GET Methods
 router.get("/user", userList)
// router.get("/add", AddProducts);
 router.get("/Product",productList)


 router.get('/product/:id',getProductById)

//Put method

 router.put('/Product/:id', editProduct);



module.exports = router;