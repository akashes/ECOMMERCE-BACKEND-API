import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { resetPasswordUtil } from "../utils/nodemailer.util.js";
import randomString from 'randomstring'
import { jwt_secret_key } from "../config/config.js";

import fs from 'fs'

const hashPassword=async(password)=>{
try {
        return await bcrypt.hash(password,10)
    
} catch (error) {
    res.status(400).json(error.message)
    console.log(error)
    
}}

const generateJwtToken=async(id)=>{
try {
        return await jwt.sign({id},jwt_secret_key)
    
} catch (error) {
    res.status(400).json(error.message)
    
}
}

export const registerUser=async(req,res)=>{
    try {
        const{name,email,password,mobile,type}=req.body
        const existingUser=await User.findOne({email})
        if(existingUser) return res.status(400).json({
            success:false,
            message:'user already exists, please login'
        })
        const avatar = req.file? req.file.filename : ''
        const hashedPassword=await hashPassword(password)
        
        const user=new User({name,email,password:hashedPassword,mobile,type,avatar})
        const savedUser=await user.save()
        res.status(200).json({
            success:true,
            data:savedUser
        })
        
    } catch (error) {
        res.status(400).send(error.message)
        console.log(error)
    }
}

export const loginUser=async(req,res)=>{
    try {
        const{email,password}=req.body
        if(!email || !password) return res.status(400).json({
            success:false,
            message:'please provide both email and password'
        })
        const existingUser = await User.findOne({email})
        if(existingUser){
            const isValidPassword=await bcrypt.compare(password,existingUser.password)
            if(isValidPassword){

               
               const token= await generateJwtToken(existingUser._id)
   


                res.status(200).json({
                    success:true,
                    message:"User login successful",
                    data:existingUser,
                    token
                })
                

            }else{
                res.status(200).json({
                    success:false,
                    message:"Wrong Password"
                })

            }
        }else{
            return res.status(400).json({
                success:false,
                message:'User not present'
            })
        }
    } catch (error) {
        res.status(400).json(error.message)
        
    }
}

export const test=async(req,res)=>{
    console.log('inside test')
    console.log(req.user)
    res.status(200).json({
        success:true,
    })
}

export const updatePassword=async(req,res)=>{
    const{password}=req.body
    const user = req.user
    const userData = await User.findById(user.id)

    if(userData){
        const hashedPassword = await bcrypt.hash(password, 10)
        userData.password = hashedPassword
        await userData.save()
        res.status(200).json({
            success:true,
            message:"Update successful"
        })
    }




}


export const forgetPassword=async(req,res)=>{
    console.log('inside reset')

    const {email} = req.body
    const user = await User.findOne({email})
    const randomstring = randomString.generate(8)
    user.token=randomstring
    await user.save()
    await resetPasswordUtil(user.name,user.email,randomstring)
    res.status(200).json({
        success:true,
        message:"Reset password link is sent to your email"
    })
}

export const updateNewPassword = async (req, res) => {
    try {
        const {token } = req.query
        const {password}=req.body
        const user = await User.findOne({token})
        if(!user) return res.status(400).json({
            success:false,
            message:'This link has been expired'
        })
        const hashedPassword = await hashPassword(password)
        user.password=hashedPassword
        user.token=''
       const updatedUser =  await user.save()
        res.status(200).json({
            success:true,
            message:'Password reset successful',
            data:updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:'Password reset failed'
        })
        
    }
};


// renew token 
const renewToken = async(id)=>{
    try {
        const jwt_secret = jwt_secret_key
        console.log({jwt_secret})
      const new_jwt =  randomString.generate(8)
      console.log({new_jwt})
      fs.readFile('config/config.js','utf-8',function(err,data){
        if(err) throw err
        console.log({data})

       const newValue =  data.replace(new RegExp(jwt_secret,"g"),new_jwt)
       console.log({newValue})
       fs.writeFile('config/config.js',newValue,'utf-8',function(err,data){
        if(err) throw err
        console.log("Done!")
       })
      })
      console.log({jwt_secret_key})
     return  await jwt.sign({id},new_jwt,{expiresIn:'1h'})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:'Failed to create refresh token'
        })

    }
}
 

export const  createRefreshToken=async(req,res)=>{
    try {
        const{id}=req.body
        const user = await User.findById(id)
        if(user){

          const token =  await renewToken(id)
          res.status(200).json({
            success:true,
            message:'Refresh token created',
            data:token
          })

        }else{
            return res.status(400).json({
                success:false,
                message:'User not found'
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:'Failed to create refresh token'
        })
    }
}
