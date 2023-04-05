const express = require("express")
const mongoose = require("mongoose")
const Users= require("./routes/Users")
const Auth = require("./routes/Auth")
const cors = require('cors')
var app = express()
var jwt = require("jsonwebtoken")
var cookies = require("cookie-parser")
var bcrypt = require("bcryptjs")






mongoose.connect("mongodb://localhost:27017")


mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
});
mongoose.connection.on("disconnected",()=>{
    console.log("db disconnected")

});

app.use(express.json())
app.use(cors())
app.use(cookies())


app.use("/auth",Auth)

app.use("/users",Users)



  








app.listen(3001,()=>{
    console.log("running")
})