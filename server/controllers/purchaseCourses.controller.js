import Course from "../models/course.model.js";
import CoursePurchase from "../models/coursePurchase.model.js";
import Lecture from "../models/lecture.model.js";
import User from "../models/user.model.js"
import { v4 as uuidv4 } from 'uuid';

// Import Stripe SDK and initialize it
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_API_KEY);

// Controller function to create a Stripe Checkout session
export const createCheckoutSession = async (req, res) => {
  try {
        // Get userId from the authenticated request (usually set by middleware)
        const userId = req.id;

        // Destructure courseId from request body
        const { courseId } = req.body;

        // Fetch the course details from the database
        const course = await Course.findById(courseId);
        if (!course) {
        return res.status(400).json({
            msg: "Course not found",
        });
        }

        // Step 1: Create a new purchase record with 'pending' status
        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount: course?.coursePrice,
            status: "pending",
        });

        // Step 2: Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Accept only card payments
        line_items: [
            {
            price_data: {
                currency: "inr",
                product_data: {
                name: course?.courseTitle,
                images: [course.courseThumbnail], // Course thumbnail (visible on Stripe checkout page)
                },
                unit_amount: course.coursePrice * 100, // Stripe expects amount in smallest unit (paise)
            },
            quantity: 1,
            },
        ],
        mode: "payment", // One-time payment
        success_url: `${process.env.FRONTEND_URL}/course-progress/${courseId}`, // Redirect after success
        cancel_url: `${process.env.FRONTEND_URL}/course-details/${courseId}`,   // Redirect after cancel
        metadata: {
            courseId: courseId,
            userId: userId, // Correct usage of user ID
        },
        shipping_address_collection: {
            allowed_countries: ["IN"], // Only allow shipping addresses from India (optional)
        },
        });

        // If Stripe fails to create a session
        if (!session.url) {
            return res.status(400).json({
                success: false,
                msg: "Failed to initiate course purchase",
            });
        }

        // Step 3: Update the purchase record with the payment session ID and save to DB
        newPurchase.paymentId = session.id;
        await newPurchase.save();

        // Step 4: Return the session URL to frontend for redirection
        return res.status(200).json({
            success: true,
            url: session.url,
        });

    } catch (error) {
        console.error("Error from Stripe session:", error?.message);
        return res.status(500).json({
        success: false,
        message: "Internal server error during payment session creation",
        });
    }
};


export const webhook = async(req,res)=>{
    let event;
    try {
        const payloadString = JSON.stringify(req.body , null, 2)
        const secret  = process.env.WEBHOOK_ENDPOINT_SECRET;

        const header  = stripe.webhooks.generateTestHeaderString({
            payload:payloadString,
            secret,
        })
        event.stripe.webhooks.constructEvent(payloadString,header,secret);

        // handle the checkout session completed event 
        if(event.type === "checkout.session.completed"){
            try {
                const session = event.data.object;
                const purchase = await CoursePurchase.findOne({
                    paymentId:session.id,
                }).populate({path:"courseId"});
                if(!purchase){
                    return res.status(404).json({msg:"purchase not found"})
                }
                if(session.amount_total){
                    purchase.amount = session.amount_total/100;
                }
                purchase.status = "completed";

                // make all lectures visible by setting  ' isPreviewfeee'
                if(purchase.courseId && purchase.courseId.lectures.length > 0){
                    await Lecture.updateMany(
                       {_id: {$in:purchase.courseId.lectures}},
                       {$set:{isPreviewFree : true}}
                    )
                }
                await purchase.save();
                // update user's enrolledcourse
                await Course.findByIdAndUpdate
            } catch (error) {
                
            }
        }

    } catch (error) {
        console.log("Webhook error:" , error.message)
        return res
        .status(400)
        .send(`Webhook error: ${error.message}`)
    }
}

export const coursePurchase  = async (req,res)=>{
    try {
        // console.log("incoming request for purchase course")
        const userId = req.id;
        const {courseId} = req.body;
        const course = await Course.findById(courseId);

        if(!course){
            return res
            .status(400)
            .json({
                msg:"Failed to buy course "
            })
        }

       // Step 1: Create a new purchase record with 'pending' status
        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount: course?.coursePrice,
            status: "completed",

        });

        // Step 2: Update the purchase record with the payment session ID and save to DB
        // abhi jo purchase hua hai course uska record do 
        const sessionId = uuidv4();
        newPurchase.paymentId = sessionId;
        await newPurchase.save();

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
       const updatedUser =  await User.findByIdAndUpdate(
            purchase?.userId, 
            {$addToSet : {enrolledCourses:purchase.courseId._id}},
            {new:true}
        )
        // now update course , ab course ke ander enroll student ko add karo
       const updatedCourse =  await Course.findByIdAndUpdate(
            purchase?.courseId?._id,
            {$addToSet:{enrolledStudents:purchase?.userId}}  ,
            {new  :true}
        )
        
       
        // const course2 = await Course.findById(purchase?.courseId?._id)
        // const user2 = await User.findById(userId)
        // console.log("useer2 = ", user2)

        return res
        .status(200)
        .json({
           msg:"course buy successfully",
            success:true,

        })

    } catch (error) {
        console.log("error in course purchase ", error);
        return res
        .status(500)
        .json({
            msg:"Failed to but course due to internal server problem "
        })
    }
}

// this controller is used to show course purchased , status
export const getSingleIsPurchasedCourse = async(req,res)=>{
    try {
        // console.log("incoming call for details ")
        const {courseId} = req.params
        const userId = req.id;

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
        console.log("failed to load course ", error)
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
        console.log("error in getinng all purchased course ", error)
        return res
        .status(500)
        .json({
            msg:"failed to fetc all purchased course"
        })
    }
}