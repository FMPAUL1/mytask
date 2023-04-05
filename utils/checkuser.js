const createError = require("./createError")
const VerifyToken = require("./VerifyToken")

module.exports = function users(req,res,next){
    VerifyToken(req,res,next,()=>{
        if (req.user.id == req.params.id){
            console.log('pppppp')
            next()
        } else {
            console.log('dddd')
            return next(createError(500,"this user is not authorized "))
        }
    })
}