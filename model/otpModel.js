const mongoose = require("mongoose");

const otpModel = new mongoose.Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true

    },
    createdAt:{
        type:Date,
        required:true
    },
    updateAt:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model("otpModel",otpModel);

