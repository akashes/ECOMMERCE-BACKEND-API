import Store from "../models/store.model.js";
import { User } from "../models/user.model.js";

export const createStore=async(req,res)=>{
    try {
        const{vendor_id,latitude,longitude,business_email,address,pin}=req.body
        const logo = req.file? req.file.filename:""
       const user =  await User.findById(vendor_id)
       if(!user) return res.status(404).json({message:"Vendor not found"})

        if(!latitude || !longitude) return res.status(400).json({message:"Latitude and Longitude are required"})

       const isVendorExists= await Store.findOne({vendor_id})    
       if(isVendorExists) return res.status(400).json({message:"Vendor already created a store"})

       const storeData= await Store.create({vendor_id,business_email,address,pin,logo,location:{
            coordinates:[parseFloat(longitude),parseFloat(latitude)]
        }})
        res.status(200).json({
            message:"Store created successfully",
            data:storeData
        })


    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Failed to create store"
        })
        
    }
}