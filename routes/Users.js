const Userrouter= require("express").Router()
const Usermodel = require("../model/Usermodel")
var createError = require("../utils/createError");
const Verifyuser = require("../utils/checkuser");





/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         username:
 *           type: string 
 *         password:
 *           type: string
 *  
 *             
 * 
 */
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get username by the ID
 *     tags: [GET USERNAME BY ID]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: the book id
 *         required: true
 *     responses:
 *       200:
 *         description: successful
 *         contents:
 *           application/json:
 *             schema:
 *               $ref:'#/components/schemas/users'
 *          
 * 
 *  
 *    
 */


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: remove users
 *     tags: [DELETE USER]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the user id
 *     responses:
 *       200:
 *         description: deleted successfully
 *         contents:
 *           application/json:
 *             schema:
 *               $ref:'#/components/schemas/users'
 */




/**
 * @swagger
 * /auth/signup:
 *   put:
 *     summary: update the username with id
 *     tags: [CHANGE USERNAME]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: success Updated
 *         contents: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/users'
 *       404:
 *         description: username not found
 *       500:
 *         description: server error      
 * 
 */

 


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