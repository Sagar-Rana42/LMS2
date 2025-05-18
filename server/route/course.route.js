import {Router} from "express"
import isAuthenticated from '../middleware/isAuthenticated.js'
import { createCourse, editCourse, getAllCourses, getCourseById } from '../controllers/course.controller.js';
import { upload } from "../utils/multer.js";

const router = Router();

router.route("/course/create").post(isAuthenticated,createCourse)
router.route("/course").get(isAuthenticated,getAllCourses)
router.route("/edit-course/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse)
router.route("/get-course/:courseId").get(isAuthenticated,getCourseById)

export default router;