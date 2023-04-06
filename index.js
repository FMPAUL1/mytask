const express = require("express")
const mongoose = require("mongoose")
const Users= require("./routes/Users")
const Auth = require("./routes/Auth")
const cors = require('cors')
var app = express()
var jwt = require("jsonwebtoken")
var cookies = require("cookie-parser")
var bcrypt = require("bcryptjs")
const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")






const opt= {
    definition :{
        openapi :"3.0.0",
        info :{
            title: "MY REST API",
            version:"3.0.1",
            description: "this Api performs crud operations",
            contact :{
                name:" My Name is Abel Paul"
      
            }
        },
        servers :[
            {
            url: "http://localhost:3001",
        },
    ],
    },
    apis :["./routes/*.js"],
};


const spacs = swaggerjsdoc(opt)
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


app.use( "/swag",swaggerui.serve,swaggerui.setup(spacs))

app.use("/auth",Auth)
app.use("/users",Users)




  








app.listen(3001,()=>{
    console.log("running")
})