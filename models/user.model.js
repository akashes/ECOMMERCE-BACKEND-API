import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    type:{
        type:Number,
        required:true 
    },
    token:{
        type:String,
        default:''
    }
},{timestamps:true})

export const User = mongoose.model('User',userSchema)
