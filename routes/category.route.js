import express from 'express'
import { verifyToken } from '../middleware/jwt.middleware.js'
import createCategory from '../controllers/category.controller.js'
import { isVendor } from '../middleware/isVendor.middleware.js'

const categoryRoute = express.Router()

categoryRoute.post('/create-category',isVendor,verifyToken,createCategory)


export default categoryRoute