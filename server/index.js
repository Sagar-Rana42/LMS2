import express, { urlencoded } from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectDB from './DB/connectDB.js'
import cors from "cors"


const app = express();

dotenv.config({})
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    
}))

// app.use(cors())



const port = process.env.PORT || 4000
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`app is listen on port ${port}`)
    })
})
.catch((err)=>{
    console.log('failed to connect in index.js, ', err)
})



import userRoute from   "./route/user.route.js"
import courseRoute from "./route/course.route.js"
import videoUpload from "./route/video.route.js"
import purchaseRoute  from "./route/purchase.route.js"
import courseProgress from "./route/courseProgress.route.js"
app.use('/api/v1/user',userRoute)
app.use('/api/v1/admin',courseRoute)
app.use('/api/v1/media',videoUpload)
app.use('/api/v1/purchase',purchaseRoute)
app.use('/api/v1/course',courseProgress);

