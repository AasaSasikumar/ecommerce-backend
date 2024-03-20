const express = require("express");
const cors = require("cors");
const dbConnection = require("./Configure/dbconnections");
const app = express();
const adminRoutes = require('./Configure/Routes/AdminRoutes')
const userRoutes =require("./Configure/Routes/UserRoutes")
dbConnection.dbConnect();

const PORT = 5000;
app.listen(PORT,()=> {
    console.log(`Server started at port ${PORT}`);
});

app.use(express.json());

app.use("/",userRoutes)
//  app.use("/admin",adminRoutes)