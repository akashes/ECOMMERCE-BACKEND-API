import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/ECOM")
    } catch (error) {
        console.log(error)
        
    }

}