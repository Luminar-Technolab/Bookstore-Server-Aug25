const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

//register
exports.registerController = async (req,res)=>{
    console.log("Inside registerController");
    const {username,email,password} = req.body
    // console.log(username,email,password);    
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User already exist!!! Please Login...")
        }else{
            const newUser = await users.create({
                username,email,password
            })
            res.status(200).json(newUser)
        }
    }catch(error){
        console.log(error);        
        res.status(500).json(error)
    }
}
//login
exports.loginController = async (req,res)=>{
    console.log("Inside loginController");
    const {email,password} = req.body
    // console.log(username,email,password);    
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            if(password == existingUser.password){
                const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
                res.status(200).json({user:existingUser,token})
            }else{
                res.status(401).json("Incorrect Email / Password !!!")
            }
        }else{
            res.status(404).json("Account Doesnot exists!!!")
        }
    }catch(error){
        console.log(error);        
        res.status(500).json(error)
    }
}
//user profile edit
//admin profile edit