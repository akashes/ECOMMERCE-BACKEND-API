import express from 'express'
import upload from '../middleware/multer.storeImages.middleware.js'
import { verifyToken } from '../middleware/jwt.middleware.js'
import { createStore } from '../controllers/store.controller.js'

const storeRoute = express.Router()


storeRoute.post('/create-store',verifyToken,upload.single('logo'),createStore)


export default storeRoute 