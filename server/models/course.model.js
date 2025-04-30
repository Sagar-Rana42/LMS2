import mongoose, {Schema , model} from "mongoose";

const courseSchema = new Schema({
    courseTitle:{
        type:String,
        required:true,
    },
    subTitle:{
        type:String,

    },
    description:{
        type:String,
    },
    category:{
        type:String,
        required:true,
    },
    courseLevel:{
        type:String,
        enum:["begineer" , ""]
    },
    courseThumbnail:{
        type:String,
    },
    enrolledStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    ],
    lectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Lecture'
        },
    ],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isPublished:{
        type:Boolean,
        default:false,
    },


},{timestamps:true})

export const Course = model("Course" , courseSchema);