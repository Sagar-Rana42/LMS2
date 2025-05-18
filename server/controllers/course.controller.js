import Course from "../models/course.model.js"
import { deletePhotoFromCloudinary , uploadMedia} from "../utils/uploadOnCloudinary.js";

export const createCourse = async(req,res)=>{
    try {
        console.log("incoming request for create course ")
        
        const {courseTitle ,category } = req.body;
        if([courseTitle,category].some((field) => typeof field !== 'string' || field.trim() === "")){
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

export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.status(400).json({ msg: "Course ID is required." });
        }

        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
        if (
            [courseLevel, coursePrice, description, subTitle, courseTitle, category].some(
                (field) => typeof field !== 'string' || field.trim() === ""
            )
            ){
            return res.status(400).json({ msg: "All fields are required." });
        }

        const thumbnail = req.file;
        if (!thumbnail) {
            return res.status(400).json({ msg: "Thumbnail image is required." });
        }

        // console.log("thumbnail = ", thumbnail)

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: "Course not found." });
        }
        // console.log("course = " , course)

        /*
            Splits the URL into parts using / as a separator: .split("/")
            Returns the last item from the array, which is the file name:.pop()
            Splits the file name into name and extension: .split(".")
            Takes the first item, which is the public ID of the image in Cloudinary:[0]
        */

        // Delete old thumbnail if exists
        if (course?.courseThumbnail) {
            const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
            await deletePhotoFromCloudinary(publicId);
        }

        // Upload new thumbnail
        const cloudinaryResponse = await uploadMedia(thumbnail?.path);
        if (!cloudinaryResponse) {
            return res.status(500).json({ msg: "Failed to upload thumbnail to Cloudinary." });
        }

        // Update course
        const updatedData = {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            courseThumbnail: cloudinaryResponse.secure_url,
        };

        const updatedCourse = await Course.findByIdAndUpdate(courseId, updatedData, { new: true });
        if (!updatedCourse) {
            return res
            .status(400)
            .json({ msg: "Failed to update course." });
        }

        return res.status(200).json({
            success: true,
            updatedCourse,
            msg: "Course updated successfully.",
        });

    } catch (error) {
        console.error("Error updating course:", error);
        return res.status(500).json({
            success: false,
            msg: `Internal server error while updating course: ${error.message}`,
        });
    }
};

export const getCourseById = async(req,res)=>{
    try {
        const {courseId} = req.params;
        if(!courseId){
            return res
            .status(400)
            .json({
                msg:"Course not found"
            })
        }
        const course = await Course.findById(courseId)
        if(!course){
            return res
            .status(400)
            .json({
                msg:"Course not found"
            })
        }
        return res
        .status(200)
        .json({
            course,
            msg:"get course successfully"
        })


    } catch (error) {
        console.log("error in get element by id " , error);
        return res
        .status(500)
        .json({
            msg:"failed to get course "
        })
    }
}