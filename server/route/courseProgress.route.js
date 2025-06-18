import mongoose  from "mongoose";
import { Router } from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getCourseLecturesForProgress, getCourseProgress } from "../controllers/courseProgress.controller.js";


const router = Router();

router.route("/course-progress/:courseId").get(isAuthenticated,getCourseProgress)
router.route("/coursein-progress/:courseId").get(isAuthenticated,getCourseLecturesForProgress)
export default router;