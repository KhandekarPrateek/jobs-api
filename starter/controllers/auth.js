const User=require('../models/User')
const {UnauthenticatedError,
    BadRequestError} =require('../errors')
const register=async(req,res)=>{
   //after pre save in models the req.body istelf has a hashed password
    const user=await User.create({...req.body})
const token=user.createJWT()
    res.status(201).json({user:{name:user.name},token})
    // res.status(201).json({user,token})

}

const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new BadRequestError('please provide email and password')
    }

    const user=await User.findOne({email})
    //check if user is in db
    if(!user){
        throw new UnauthenticatedError(' user not exist')
    }
    //check passord
    const isPasswordCorrect=await user.checkPassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError(' incorrect passowrd')
    }
    //create token 
    const token=user.createJWT()
    res.status(200).json({user:{name:user.name},token})
    // res.status(200).json({user,token})

}

module.exports={
    register,login
}

//has the routes which need auth