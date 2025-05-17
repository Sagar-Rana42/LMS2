import Course from "../models/course.model.js"

export const createCourse = async(req,res)=>{
    try {
        console.log("incoming request for create course ")
        
        const {courseTitle ,category } = req.body;
        if([courseTitle,category].some((item)=>(
            item.trim() === ""
        ))){
            return res
            .status(400)
            .json({
                success:false,
                msg:"Course title and category required",
            })
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator:req?.id
        })

        return res
        .status(200)
        .json({
            course,
            msg:"course created ssuccessfully"
        })


    } catch (error) {
        console.log("failed to createCourse "+ error.message)
        return res
        .status(500)
        .json({
            msg:"Failed to createCourse"

        })
    }
}

export const getAllCourses = async(req,res)=>{
    try {
        const adminId = req?.id;
        const courses = await Course.find({creator:adminId})
        if(!courses){
            return res
            .status(400)
            .json({
                course:[],
                success:false,
                msg:"Courses not found "
            })
        }
        return res
        .status(200)
        .json({
            courses,
            success:true,
            msg:"Course found successfully"
        })


    } catch (error) {
        console.log("error from get all adminn course ", error);
        return res
        .status(500)
        .json({
            msg:"Failed to fetch Course "
        })


    }
}