import {Router} from "express"
import isAuthenticated from '../middleware/isAuthenticated.js'
import { upload } from "../utils/multer.js";
import {
     createCourse,
      createLecture, 
      editCourse, 
      editLecture, 
      getAllCourses, 
      getCourseById, 
      getCourseLecture, 
      getLectureById, 
      getPublishedCourse, 
      publish, 
      removeLecture

     } from '../controllers/course.controller.js';

const router = Router();

router.route("/course/create").post(isAuthenticated,createCourse)
router.route("/course").get(getAllCourses)
router.route("/edit-course/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse)
router.route("/get-course/:courseId").get(isAuthenticated,getCourseById)
router.route("/get-course/:courseId/create-lecture").post(isAuthenticated,createLecture)
router.route("/get-course/:courseId/get-all-lecture").get(isAuthenticated,getCourseLecture)
router.route("/get-course/:courseId/lecture/:lectureId").post(isAuthenticated,editLecture)
router.route("/lecture/:lectureId").delete(isAuthenticated,removeLecture)
router.route("/lecture/:lectureId").get(isAuthenticated,getLectureById)
router.route("/course/:courseId").patch(isAuthenticated,publish)
router.route("/").get(getPublishedCourse)



export default router;