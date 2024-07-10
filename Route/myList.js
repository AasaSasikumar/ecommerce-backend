// const express = require ("express");
// const router = express.Router()
// const{MyList}=require("../Model/myList")


// router.get('/',async(req,res) => {
//     try{

//         const myList =await  MyList.find(req.query);
//         if(!myList){
//             res.status(500).json({success:false})
//         }
//         return res.status(200).json(myList);
//     }catch(error){
//         res.status(500).json({success:false})
//     }
// });


// router.post('/add',async(req,res) =>{
//     const item = await MyList.find({productId:req.body.productId, userId:req.body.userId});
//     if(item.length===0){
//         let list=new List({
//             ProductTitle:req.body.ProductTitle,
//             image:req.body.image,
//             price:req.body.price,
//             productId:req.body.productId,
//              userId:req.body.userId
//         })
//         if(!list){
//             res.status(500).json({
//                 error:err,
//                 success:false
//             })
//         }
//         list=await list.save();
//         res.status(201).json(list)
//     }else{
//      res.status(401).json({status:false,msg:"product already added in MyList"})
//     }
// })

// router.delete(':/id',async(req,res)=>{
//     const item= await MyList.findById(req.params.id)
//     if(!item){
//         res.status(404).json({msg:"The item given id not found!"})
//     }
//     const deletedItem = await MyList.findByIdAndDelete(req.params.id);
//     if(!deletedItem){
//         res.status(404).json({
//             message:" item not found!",
//             success:false
//         }) 
//     res.status(200).json({
//         success:true,
//         message:"item deleted!"
//     })
// }
// });

// router.get('/:id' ,async(req,res)=>{
//     const item =await MyList.findById(req.params.id);
//     if(!item){
//         res.status(500).json({
//             message:" item with given ID not found!"
//         }) 
//     }
//         return res.status(200).send(item);
// })

// module.exports=router;





const express = require("express");
const router = express.Router();
const { MyList } = require("../Model/myList");
const userAuth = require("../Middleware/userAuth");

// Get Wishlist
router.get('/', userAuth, async (req, res) => {
    try {
        const myList = await MyList.find({ userId: req.user._id });
        if (!myList) {
            return res.status(500).json({ success: false });
        }
        return res.status(200).json(myList);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Add to Wishlist
router.post('/add', userAuth, async (req, res) => {
    try {
        const { productId, ProductTitle, image, price } = req.body;
        const existingItem = await MyList.findOne({ productId, userId: req.user._id });
        if (existingItem) {
            return res.status(401).json({ status: false, msg: "Product already added to MyList" });
        }

        const newItem = new MyList({
            ProductTitle,
            image,
            price,
            productId,
            userId: req.user._id
        });

        const savedItem = await newItem.save();
        return res.status(201).json(savedItem);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Delete from Wishlist
router.delete('/:id', userAuth, async (req, res) => {
    try {
        const item = await MyList.findById(req.params.id);
        if (!item || item.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ msg: "The item with the given ID was not found!" });
        }

        const deletedItem = await MyList.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found!", success: false });
        }

        return res.status(200).json({ success: true, message: "Item deleted!" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Get Wishlist Item by ID
router.get('/:id', userAuth, async (req, res) => {
    try {
        const item = await MyList.findById(req.params.id);
        if (!item || item.userId.toString() !== req.user._id.toString()) {
            return res.status(500).json({ message: "Item with the given ID not found!" });
        }
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
