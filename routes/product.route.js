import express from "express";
import { verifyToken } from "../middleware/jwt.middleware";
import { createProduct } from "../controllers/product.controller";

const productRoute= express.Router();

productRoute.post('/create-product',verifyToken,createProduct)

export default productRoute