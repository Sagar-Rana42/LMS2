import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const mongooseInstance = await mongoose.connect(process.env.MONGODB_URL)
        // console.log(mongooseInstance)
        console.log("MongoDB connected")
    } catch (error) {
        console.log("Failed to connect DB  ", error)
    }
}

export default connectDB