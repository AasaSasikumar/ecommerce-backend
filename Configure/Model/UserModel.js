const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true, 
    },
    // verified: {
        // type: Boolean,
        // required: true,
    // },
    // phoneNumber: {
        // type: Number,
        // required: true,
    // },
    // bolckStatus: {
        // type: Boolean,
        // required: true,
    // },
    // image: {
        
        // required: Object,
    // },
});
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
});
module.exports = new mongoose.model("user",userSchema);
