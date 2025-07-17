import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { coursePurchase, getAllPurchasedCourse, getSingleIsPurchasedCourse, verifypayment } from "../controllers/purchaseCourses.controller.js";

const router = express.Router();

// router.route("/purchase-course").post(isAuthenticated,coursePurchase)
router.route("/purchased-course/:courseId").get(isAuthenticated,getSingleIsPurchasedCourse)
router.route("/all-purchased-course").get(isAuthenticated , getAllPurchasedCourse)
router.route("/create-course").post(isAuthenticated,coursePurchase)
router.route("/verify").post(isAuthenticated,verifypayment)

export default router;