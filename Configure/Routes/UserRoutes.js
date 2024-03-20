const express = require("express");
const { signup} = require("../Controller/UserController")


const route = express.Router()
route.post('/signup', signup);

module.exports=route;