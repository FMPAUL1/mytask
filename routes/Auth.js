const authrouter = require("express").Router()

var bcrypt = require("bcryptjs")
const Users = require("../model/Usermodel")
const jwt = require("jsonwebtoken")
const createError = require("../utils/createError")

// create a user here
authrouter.post ("/signup",(req,res,next)=>{
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(req.body.password,salt)
    Users.findOne({username:req.body.username})
    .then((us)=>{
        if (us){
            return next (createError(403,"user already exists"))
        } else {
            return Users.create({
                username: req.body.username,
                password: hash
            })
        }
    })
    .then((atp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json")
        res.json({message:"user created successfully"})
    },(err)=> next (createError(401," error in you signup")))
    .catch ((err)=> next (createError(401," error in you signup")))

})





authrouter.post("/login",async(req,res,next)=>{
    try {
        var user = await Users.findOne({username: req.body.username})
        if(user != req.body.username && !bcrypt.compareSync(req.body.password,user.password) ) {

            res.status(403).json('wrong username or password')
        } 
       
        var token = jwt.sign({id:user._id},'mysecretkey')
        var {username, ...others}= user._doc
         
       return res.cookie("mytoken",token,{httpOnly:true}).status(200).json(others)
        
    } catch (error) {
        console.log(error.message)
        return next (createError(403,"error"))
    }
})



















// authrouter.get("/logout",(req,res,next)=>{
//     if (req.session){
//         req.session.destroy()
//         res.clearCookie('session-id');
//         res.redirect('/')
//     } else {
//         return next (createError(403,"already logged out"))
//     }
// })


module.exports= authrouter




