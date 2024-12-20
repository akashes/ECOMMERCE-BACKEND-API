import jwt from 'jsonwebtoken'
import { jwt_secret_key } from '../config/config.js'

export const verifyToken=async(req,res,next)=>{
    try {
        const token =req.body.token || req.query.token||  req.headers.authorization
        if(!token) return res.status(401).json({message:'No token provided'})
        
            const decode = await jwt.verify(token,jwt_secret_key)
            console.log({decode})
            req.user=decode
        if(decode){
            next()
        }else{
            res.status(400).json('jwt verification failed')
        }
    } catch (error) {
        console.log(error)
        res.status(400).json('jwt verification failed')

    }
} 