const express = require("express");
const path = require("path")
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv").config();
const user_routes = require("../routes/userRoutes");
const exp = require("constants");
const bodyParser = require("body-parser");






const app = express();
// use ejs as the view engine
app.set("view engine","ejs");
app.set("views","./views")




app.use(express.static("public")) //public is the folder name
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",user_routes);


const PORT = process.env.PORT ;

app.listen(PORT,function(){
    console.log(`server is listerning the port number ${PORT}`);
})