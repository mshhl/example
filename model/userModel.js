const mongoose = require("mongoose");
const connect = mongoose.connect(process.env.CONNECTION_STRING);
const validator = require("validator");

// check databasea connection build or not?

connect.then(() =>{
    console.log("Database connected successfully wow");
}).catch(() =>{
    console.log("Database connection failed!")
})

const userModel = new mongoose.Schema({
    email:{
       type:String,
       required:true,

    },
    fullname:{
        type:String,
        required:true,
        

    },
    password:{
       type:String,
       required:true,
    
    }
    
});
// collection part

const collection = new mongoose.model("users",userModel);

module.exports = collection;
