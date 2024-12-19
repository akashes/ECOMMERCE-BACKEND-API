import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    vendor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
     
    },
    logo:{
        type:String,
        required:true
    },
    business_email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    location:{
        type:{type:String,default:'point',required:true},
        coordinates:[],
        // index:'2dsphere'
    }

})

storeSchema.index({location:"2dsphere"})

const Store = mongoose.model('Store',storeSchema)
export default Store