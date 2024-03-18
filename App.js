const express = require("express");
const cors = require("cors");
const dbConnection = require("./Configure/dbconnections");
const app = express();

dbConnection.dbConnect();

const PORT = 5000;
app.listen(PORT,()=> {
    console.log(`Server started at port ${PORT}`);
});