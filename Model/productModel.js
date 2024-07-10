// const mongoose =require("mongoose");
// const productScheema=new mongoose.Schema({
//     prod_name:{
//       type:String,
//       required:true
//     },
//     price:{
//       type:Number,
//       required:true
//     },
//     description:{
//       type:String,
//       required:true
//     },
//     image:{
//       type:String,
//       required:true
//     }
//    } ,{
//     timestamps:true
  
    

// });

// module.exports= mongoose.model('Product',productScheema);


const mongoose =require("mongoose");
const productSchema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    image:String,
    category:String
    
});

const Product= mongoose.model('products',productSchema);
module.exports=Product;