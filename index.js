import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './db/db.js'
connectDB()
import express from 'express'
import userRouter from './routes/user.route.js'
import storeRoute from './routes/store.route.js'
import categoryRoute from './routes/category.route.js'


const app = express()
const PORT = process.env.PORT

//middlewarers
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public/userImages'))


//routes

//userRoute
app.use('/api/user',userRouter)

//storeRoute
app.use("/api/store",storeRoute)

//categoryRoute
app.use("/api/category",categoryRoute)



app.listen(PORT, () => {
    console.log('-----------------------------');
    console.log('-----------------------------');
    console.log(`server running on port `+PORT);
}); 