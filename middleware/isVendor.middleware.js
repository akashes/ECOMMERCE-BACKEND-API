import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const isVendor=async(req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['authorization']
    console.log({token})
    if(!token) return res.status(401).json({message:'Unauthorized'})

        const decoded = await jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log({decoded})
        if(!decoded) return res.status(401).json({message:'Unauthorized'})

            const user = await User.findById(decoded.id)
            console.log(user)

            if(user.type==0) return res.status(401).json({message:'user is not a vendor'})

                next()

}