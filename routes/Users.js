const Userrouter= require("express").Router()
const Usermodel = require("../model/Usermodel")
var createError = require("../utils/createError");
const Verifyuser = require("../utils/checkuser");


// retrive a user by ID
Userrouter.get("/:id",Verifyuser,(req,res,next)=>{
    Usermodel.findById(req.params.id)
    .then((atp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json")
        res.json(atp)
    },(err)=>{
        console.log(err.message)
        return next (createError(403,"wrong  id"))
    })
    .catch ((err)=>  next  (createError(500,"wrong id")))
});




//UPDATE A USER 
Userrouter.put("/:id",Verifyuser,(req,res,next)=>{
  Usermodel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
.then((ap)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json")
    res.json(ap)
    
},(err)=>{
    console.log(err.message)
} )
.catch ((err)=>  next  (createError(500,"you are not authorized")))

    }
)
// DELETE A USER
Userrouter.delete("/:id",Verifyuser,(req,res,next)=>{
    Usermodel.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json")
        res.json({message:"user deleted from database"})
    })
    .catch ((err)=>  next  (createError(500,"you are not authorized"))) 
})


module.exports=Userrouter