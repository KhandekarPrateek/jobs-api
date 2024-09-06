const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv')
const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please eneter a name'],
        
    },
    email:{
        type:String,
        required:[true,'Please eneter a email'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 1,
      },
})
//this is a middleware of mongoose where it does some func before saving on db
UserSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10)//for async function generates random bytes
    this.password=await bcrypt.hash(this.password,salt)
    
})
//we can perform function on scehma
//like instead of creating jwt in controller do here
UserSchema.methods.createJWT=function(){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
UserSchema.methods.checkPassword=async function(inputPasswowrd){
    const isMatch=await bcrypt.compare(inputPasswowrd,this.password)
    return isMatch
}
module.exports = mongoose.model('User', UserSchema)
