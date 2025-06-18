import Course from "../models/course.model.js"
import Lecture from "../models/lecture.model.js";
import { deletePhotoFromCloudinary , deleteVideoFromClouinary, uploadMedia} from "../utils/uploadOnCloudinary.js";

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
        // console.log("id = ",adminId)
        const courses = await Course.find({})

        console.log("courses = ", courses)
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

export const createLecture = async(req,res)=>{
    try {
        // console.log("incomming call for create lecture")
        const {courseId} = req.params;
        // console.log("getting course id = ", courseId)

        const {lectureTitle} = req.body;
        // console.log("title = " , lectureTitle)
        
        if(!lectureTitle || !courseId){
            return res
            .status(400)
            .json({
                msg:"lecture title   is required "
            })
        };

        // now create lecture 
        const createdLecture = await Lecture.create({lectureTitle})
        // console.log("Cerated course " , createdLecture)
        const course = await Course.findById(courseId);
        // console.log("course = " , course)

        if(course){
            course?.lectures.push(createdLecture?._id)
            await course.save({validateBeforeSave:false});
        }
        return res
        .status(201)
        .json({
            msg:"lecture created succesfully",
            createdLecture
        })


    } catch (error) {
        console.log("error from create course " , + error)
        return res
        .status(500)
        .json({
            msg:error.message || "failed to create lecture "
        })
    }
}

export const getCourseLecture = async(req,res)=>{
    try {
        
        const {courseId} = req.params;
        const course = await Course.findById(courseId).populate("lectures");
        if(!course){
            return res
            .status(400)
            .json({
                msg:"There is no course",
            })
        }
        // console.log("course after populate = ", course)

        return res
        .status(200)
        .json({
            msg:"successfullt ",
            lectures:course?.lectures
        })
        

    } catch (error) {
        console.log("error from get lecture " , error?.message)
        return res
        .status(500)
        .json({
            msg:"failed to load lecture "
        })
    }
}

export const editLecture = async(req,res)=>{
    try {
        const {lectureTitle ,videoInfo ,  isPreviewFree} = req.body;
        const {courseId , lectureId} = req.params;
        const lecture = await Lecture.findById(lectureId)
        // console.log("videoInfo = ",  videoInfo )
        // console.log("lectureTitle = ",  lectureTitle )
        // console.log("isPreviewFree = ",  isPreviewFree )
        

        if(!lecture){
            return res
            .status(404)
            .json({
                msg:":Lecture not found!"
            })
        }
        // update lectures 
        if(lectureTitle){
            lecture.lectureTitle = lectureTitle;
        }
        if(videoInfo?.videoUrl){
            lecture.videoUrl = videoInfo?.videoUrl
        }
        if(videoInfo?.publicId){
            lecture.publicId = videoInfo?.publicId
        }
        if(isPreviewFree === true){
            lecture.isPreviewFree = true
        }
        await lecture.save({validateBeforeSave:false})

        // find course , and also ensure lecture is present 
        const course = await Course.findById(courseId);
        if(course && !course.lectures.includes(lecture?._id)){
            course.lectures.push(lecture?._id)
            await course.save({validateBeforeSave:false})
        }

        return res
        .status(200)
        .json({
            lecture,
            msg:"lecture updated successfully"
        })

    } catch (error) {
        console.log("errot from edit course " , error)
        return res
        .status(500)
        .json({
            msg:"Failed to edit lecture"
        })

    }
}

export const removeLecture = async(req,res)=>{
    try {
        const {lectureId} = req.params;
        // console.log("incoming request ans lecture id = " , lectureId)
        const lecture  = await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
            return res
            .status(400)
            .json({
                msg:"Lecture not found "
            })
        }
        // console.log("lecture = " , lecture)
        // now delete video from cloudinary 
        if(lecture?.publicId){
            // console.log("lecture publicId= " , lecture.publicId)
            await deleteVideoFromClouinary(lecture?.publicId)
        }
        // and also delete lecture refernce fron the associated course 
        await Course.updateOne(
           { lecture:lectureId}, // find the course that contain the lecture 
           { $pull:
                {lectures:lectureId}
           } // remove the lectures id from the lecture array 
        )
        return res
        .status(200)
        .json({
            msg:"Lecture removed successfully "
        })

    } catch (error) {
        console.log("eror = " , error);
        return res
        .status(500)
        .json({
            msg:"Failed to remvove lecture"
        })
    }
}

export const getLectureById = async(req,res)=>{
    try {
        const {lectureId} = req.params;
        // console.log("lecture id = " , lectureId)
        const lecture = await Lecture.findById(lectureId);
        if(!lecture){
            return res
            .status(400)
            .json({
                msg:"Lecture not found "
            })
        }
        // console.log("lecture = "  , lecture)
        return res
        .status(200)
        .json({
            msg:"lecture get successfully",
            lecture
        })
    } catch (error) {
        console.log("error from get element by id ", error)
        return res
        .status(500)
        .json({
            msg:"Failed to get lecture "
        })
    }
}

export const publish = async(req,res)=>{
    try {
        const {courseId} = req.params;
        const {isPublish} = req.query; // true , false

        const course  = await Course.findById(courseId);
        if(!course){
            return res
            .status(400)
            .json({
                msg:"course not found"
            })
        }
        course.isPublished = isPublish === "true";
        await course.save({validateBeforeSave:false})

        const statusMessage =  course?.isPublished ? "published" : "unpublished"
        return res
        .status(200)
        .json({
            success:true,
            msg:`course get ${statusMessage}`
        })

    } catch (error) {
        console.log("error in publish ",error);
        return res
        .status(500)
        .json({
            success:false,
            msg:"Failed to publish "
        })
    }
}

export const getPublishedCourse = async (_,res)=>{
    try {
        // const {courseId} = req.params;
        const courses = await Course.find({isPublished:true}).populate({path:"creator" , select:"username photoUrl"});
        // console.log("courses = " , courses)
        if(!courses){
            return res
            .status(400)
            .json({
                msg:"Course not found"
            })
        }
        return res
        .status(200)
        .json({
            courses, 
            
        })

    } catch (error) {
        console.log("error in publish " , error.message)
        return res
        .status(500)
        .json({
            msg:"failed to get course , due to internal server error"
        })
    }
}
