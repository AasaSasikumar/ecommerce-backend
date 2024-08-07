// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const {Schema} =mongoose
// const userSchema = new mongoose.Schema({
//     username:{
//         type: String,
//         required: true
//     },
//     email:{
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     blockStatus: {
//         type: Boolean,
//         default: false
//     },
//     cart: [
//         {
//             product: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "Product"
//             },
//             quantity: {
//                 type: Number,
//                 default: 1,
//             }
//         }
//     ],
//     wishlist: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product'
//       }]
// });

// userSchema.pre("save", async function (next) {
//     // if(!this.isModified("password")){
//     //     return next();
//     // }
//     // try{
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     // this.password=hashedPassword;
//     // next();
//     // }catch(error){
//     //     next(error);
//     // }
// });

// module.exports = new mongoose.model("user", userSchema)



const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ],
    // wishlist: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "products"
    // }],
    address: {
        type: Array,
        required: true
    }


});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
      }
    
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("user", userSchema);