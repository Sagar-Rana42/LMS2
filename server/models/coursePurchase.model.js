import mongoose, {model ,Schema} from "mongoose";

const courseSchema = new Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['pending' , 'completed','failed'],
        default:'pending',
    },
    paymentId:{
        type:String,
        required:true
    }

},{timestamps:true})

const CoursePurchase = model("CoursePurchase",courseSchema)

export default CoursePurchase