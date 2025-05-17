import {Router} from "express"
import isAuthenticated from '../middleware/isAuthenticated.js'
import { createCourse, getAllCourses } from '../controllers/course.controller.js';

const router = Router();

router.route("/course/create").post(isAuthenticated,createCourse)
router.route("/course").get(isAuthenticated,getAllCourses)

export default router;