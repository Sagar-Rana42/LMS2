import Course from "../models/course.model.js";
import CoursePurchase from "../models/coursePurchase.model.js";
import Lecture from "../models/lecture.model.js";
import User from "../models/user.model.js"
import { v4 as uuidv4 } from 'uuid';
import { razorpayInstance } from "../utils/razorpayInstance.js";
import crypto from "crypto";
import mongoose from "mongoose";

export const coursePurchase  = async (req,res)=>{

    try {
        // console.log("incomming request for create ");
        // console.log("body = ", req.body);
        

        const {courseId} = req.body;
        const userId = req.id;
        const course = await Course.findById(courseId);

        if(!course){
            return res
            .status(400)
            .json({
                msg:"Failed to buy course "
            })
        }
        const alreadyPurchased = await CoursePurchase.findOne({
            userId,
            courseId,
            status: "completed"
        });

        if (alreadyPurchased) {
            return res.status(400).json({ msg: "Course already purchased" });
        }

        // console.log("course = ", course)

        const {coursePrice} = course;
        // console.log("coursePrice = ", coursePrice);
    
        const options = {
            amount:coursePrice*100, // coursePrice in paise 
            currency:"INR",
            receipt:`order_rectid_${Date.now()}`,
        }

        const order = await razorpayInstance.orders.create(options);
        // console.log("order create for course ", order)
    
        res.json({success:true ,razorpayKey: process.env.RAZORPAY_KEY_ID, order});
    } catch (error) {
        // console.error(error)
        return res.status(500).json({
            success:false,
            msg:"Order creation failed  "
        })
    }
}

export const verifypayment = async (req, res) => {
  try {
       
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ msg: "all fields are important" });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        // console.log("body = " , body)
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
       .digest("hex");

        const isValid = expectedSignature === razorpay_signature;
        // console.log("valid = " , isValid);
        if(isValid ){
            // console.log("process under valid ");
            const userId = req.id;
            const {courseId} = req.body;

            
            // console.log("courseId = " ,  courseId)
            const course = await Course.findById(courseId);
            // console.log("course = " , course)
            if(!course){
                return res
                .status(400)
                .json({
                    msg:"Failed to buy course,  courseId not found"
                })
            }

            // Step 1: Create a new purchase record with 'pending' status
            const newPurchase = new CoursePurchase({
                courseId,
                userId,
                amount: course?.coursePrice,
                status: "completed",

            });
            const sessionId = uuidv4();
            newPurchase.paymentId = sessionId;
            await newPurchase.save();
            // console.log("course purchase schema")
            
            // Step 2: Update the purchase record with the payment session ID and save to DB
            // abhi jo purchase hua hai course uska record do 
       

            const purchase = await CoursePurchase.findOne({paymentId:sessionId}).populate({path:"courseId"})
            // us courseId ka pura data chipkado do refernce me 
            // console.log("purchase = " , purchase)
            if(!purchase){
                return res.status(404).json({msg:"purchase course not found"})
            }
            if(purchase?.courseId && purchase?.courseId?.lectures.length > 0){
                await Lecture.updateMany(
                    {_id: {$in:purchase.courseId.lectures}  },
                    {$set: {isPreviewFree:true}}
                )
            }
            await purchase.save();

            // now course add in user enrollement section 
            const updatedUser = await User.findByIdAndUpdate(
                purchase.userId,
                { $addToSet: { enrolledCourses: new mongoose.Types.ObjectId(purchase.courseId._id) } },
                { new: true }
            );

            // now update course , ab course ke ander enroll student ko add karo
            const updatedCourse = await Course.findByIdAndUpdate(
                purchase.courseId._id,
                { $addToSet: { enrolledStudents: new mongoose.Types.ObjectId(purchase.userId) } },
                { new: true }
                );

            return res
            .status(200)
            .json({
            msg:"course buy successfully",
                success:true,

            })
        }
        else{
            return res.status(400).json({msg:"not valid "})
        }


    } catch (error) {
        // console.log("error in course purchase ", error);
        return res
        .status(500)
        .json({
            msg:"Failed to buy course due to internal server problem "
        })
    }
   

};

// this controller is used to show course purchased , status
export const getSingleIsPurchasedCourse = async(req,res)=>{
    try {
        // console.log("incoming call for details ")
        const {courseId} = req.params
        const userId = req.id;

        // console.group("course id = ", courseId)
        // console.group("userId id = ", userId)
        /*
        if(!userId){
            const courseDetail = await Course.findById(courseId);
            return res
            .status(200)
            .json({
                courseDetail,
                detail:"course details"
            })
        }
        */
        // console.group("course id = ", courseId)

        // const course = await Course.findById(courseId)
        // const courseCreator = await Course.findById(courseId).populate({path:"creator"})
        const course= await Course.findById(courseId)
                                                     .populate({path:"creator" , select:"-password"})
                                                     .populate({path:"lectures"})
        // const courseCreatorAndLectures = await Course.findById(courseId)
        //     .populate({
        //         path: "creator",
        //         select: "username email" // Select only username and email from creator
        //     })
        //     .populate({
        //         path: "lectures" // You can also add select here if needed
        //     });
        // console.log("course = ", course);
        // console.log("course = ", courseCreator)
        if(!course){
            return res
            .status(404)
            .json({
                msg:"Course does'nt have any lecture or course not found",
            })
        }
        // make sure course is purchased 
        const purchased = await CoursePurchase.findOne({userId , courseId})
        // console.log("purchased = ", purchased );

        

        return res
        .status(200)
        .json({
            msg:"course get successfully",
            purchased :!!purchased,
            course
        })
        
    } catch (error) {
        // console.log("failed to load course ", error)
        return res
        .status(500)
        .json({
            msg:"failed to fetch purchase course"
        })
    }
}

export const getAllPurchasedCourse = async(req,res)=>{
    try {
        // const {courseId} = req.params;
       const allPurchasedCourse  = await CoursePurchase.find({status:"completed" , userId:req.id}).populate({path:"courseId"})
        if(!allPurchasedCourse){
            return res
            .status(403)
            .json({
                msg:"u are not enroll in any course ! please enroll",
                allPurchasedCourse:[]
            })
        }
      return res
      .status(200)
      .json({
        msg:"course get successfully",
        allPurchasedCourse
      })

        
    } catch (error) {
        // console.log("error in getinng all purchased course ", error)
        return res
        .status(500)
        .json({
            msg:"failed to fetc all purchased course"
        })
    }
}
