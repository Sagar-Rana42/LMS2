import { CourseProgress } from "../models/courseProgress.model.js";
import Course from "../models/course.model.js"
import CoursePurchase from "../models/coursePurchase.model.js";

export const getCourseProgress = async(req,res)=>{
    try {
        const {courseId} = req.params;
        const userId = req.id;

        // step1 : fetch the user course progress
        let courseProgress = await CourseProgress.findOne({courseId , userId}).populate("courseId")
        const courseDetail = await Course.findById(courseId)

        if(!courseDetail){
            return res
            .status(400)
            .json({
                msg:"Course not found "
            })
        }
        // step2 : if course progress not found , return course details with an empty progress

        if(!courseProgress){
            return res
            .status(200)
            .json({
                data:courseDetail,
                progress:[],
                completed:false
            })
        }

        // Step 3 : not return the course progress

       return res
        .status(200)
        .json({
            data:courseDetail,
            progress:courseProgress?.lectureProgress,
            completed:courseProgress?.completed

        })

    } catch (error) {
        console.log("eerro to get course progress")
        return res
        .status(500)
        .json({
            msg:"failed to get course progress from internal server"
        })
    }
}

export const lectureProgress = async(req,res)=>{
    try {
        const {courseId , lectureId} = req.params;
        const userId = req.id;

        // fetch course progress , if already exist 

        let courseProgress = await CourseProgress.findOne({courseId , userId});

        // if no : then , create a new record
        if(!courseProgress){
            courseProgress =  new CourseProgress({
                userId,
                courseId,
                completed:false,
                lectureProgress:[],
            })
        }

        // find the lecture progress in the course progress
        // const lectureIndex = 

    } catch (error) {
        console.log("error = ", error);
        return res
        .status(500)
        .json({
            msg:"failed to update lecture"
        })
    }
}

// controllers/course.controller.js


export const getCourseLecturesForProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id; // assumed to be set by auth middleware

    // 1. Check if the user purchased this course
    const purchase = await CoursePurchase.findOne({
      courseId,
      userId,
      status: "completed",
    });

    if (!purchase) {
      return res.status(403).json({ message: "Access denied. Purchase required." });
    }

    // 2. Fetch course with populated lectures
    const course = await Course.findById(courseId)
      .populate({
        path: "lectures",
        select: "lectureTitle videoUrl isPreviewFree createdAt",
      })
      .select("courseTitle lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      courseTitle: course.courseTitle,
      lectures: course.lectures,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
