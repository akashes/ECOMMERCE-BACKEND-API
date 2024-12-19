import Category from "../models/category.model.js";
import slugify from "slugify";

export const createCategory=async(req,res)=>{
    try {
        const{name,description}=req.body
        const existingCategory = await Category.findOne({name:name.toLowerCase()})
        if(existingCategory) return res.status(400).json({message:"Category already exists"})
        const category=new Category({name,slug:slugify(name),description})
      const categoryData=  await category.save()
        res.status(201).json({message:"Category created successfully",data:categoryData})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error creating category",error})
        
    }
}


export default createCategory;