import express from 'express'
import { forgetPassword, loginUser, registerUser, updateNewPassword, test, updatePassword, createRefreshToken } from '../controllers/user.controller.js'
import multerConfig from '../middleware/multer.userImage.middleware.js'
import { checkUserExists } from '../middleware/checkUserExists.middleware.js'
import { verifyToken } from '../middleware/jwt.middleware.js'
const userRouter = express.Router()

userRouter.post('/register',checkUserExists,multerConfig.single('avatar'),registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/test',verifyToken,test)

userRouter.post('/update-password',verifyToken,updatePassword)

userRouter.post('/forget-password',verifyToken,forgetPassword)
userRouter.post('/reset-password',updateNewPassword)


userRouter.post('/refresh-token',verifyToken,createRefreshToken)




export default userRouter 