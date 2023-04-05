const mongoose = require("mongoose")

const newuser = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },

    password:{
        type:String,
        
    }
},{timestamps:true})


module.exports= mongoose.model("usermodel",newuser)
