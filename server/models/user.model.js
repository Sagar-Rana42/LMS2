import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    phone:{
        type: Number,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        min:[8, "minimum length should be 8 char"],
        max:[20 , "maximum length should be 20 char"]
    },
    role:{
        type:String,
        enum:["instructor","student"],
        default:"student"
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Course"
        }
    ],
    photoUrl:{
        type:String,
        default:""
    }
    

},{timestamps:true})

const User = mongoose.model("User" , userSchema)

export default User
