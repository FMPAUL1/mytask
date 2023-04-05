

const jwt = require ("jsonwebtoken");
const createError = require("./createError");
const cookies = require("cookie-parser")






module.exports = function VerifyToken(req,res,next){
    var token = req.cookies.mytoken;
    if (!token){
        return next (createError(400," you dont have token"))
    }
    
    
     jwt.verify(token,'mysecretkey',(err,user)=>{
        if (err) return next (createError(403,"token not valid"))
        
        req.user= user
       return next ()
     })
}

