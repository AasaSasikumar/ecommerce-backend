require('dotenv').config();

const mongoose = require("mongoose");
module.exports = {
    dbConnect: async () => {
        try {
            await mongoose.connect("mongodb://127.0.0.1:27017/miniproject").then(() => {
                console.log("MongoDB Connected Succesfully")
            });
        } catch (err) {
            console.log(err);
        }


    }

}
