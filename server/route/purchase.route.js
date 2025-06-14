import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { coursePurchase, getAllPurchasedCourse, getSingleIsPurchasedCourse } from "../controllers/purchaseCourses.controller.js";

const router = express.Router();

router.route("/purchase-course").post(isAuthenticated,coursePurchase)
router.route("/purchased-course/:courseId").get(isAuthenticated,getSingleIsPurchasedCourse)
router.route("/all-purchased-course").get(isAuthenticated , getAllPurchasedCourse)

export default router;