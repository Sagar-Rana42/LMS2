import express from "express";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken"
import User from "../models/user.model.js";
import {generateToken} from "../utils/generateToken.js";
import { deletePhotoFromCloudinary, uploadMedia } from "../utils/uploadOnCloudinary.js";




export const registerUser = async ( req, res ) => {
  try {
        const { email, username, password ,phone } = req.body;

        if (
        [username,email,password,phone].some((element) => {
            return element.trim === "";
        })
        ) {
        return res
            .status(400)
            .json({ success: false, msg: "All filed required " });
        }
        // check already user exist

        const user = await User.findOne({ email });
        if (user) {
        return res
            .status(400)
            .json({ success: false, msg: "already exist user from this email" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const registerUser = await User.create({
            username,
            email,
            password: hashedPassword,
            phone ,
        });

        return res
        .status(200)
        .json({
            success:true,
            msg:"user registerd successfully",
            registerUser
        })
    } catch (error) {
        // console.log("error in register" , error.message);
        return res.status(500).json({ success: false, msg: "failed to register" });
    }
};

export const loginUser = async (req, res) => {
  try {
        const { email, password } = req.body;
        // console.log("sending data of login " , );
        // console.log(email)
        // console.log(password)
        if (!email || !password) {
        return res
            .status(400)
            .json({ success: false, msg: "All field required" });
        }

        const user = await User.findOne({ email });
        // console.log("user = ", user)
        if (!user) {
            return res
                .status(400)
                .json({ success: false, msg: "User not exist from this email" });
        }

    /*
        if we have to find by email or phone 
        const user = await User.find({
            $or:[{email }, {phone}]
        })

        */
    const isPasswordCorrect = await bcrypt.compare(password,user?.password)   
    
    if(!isPasswordCorrect){
        return res
        .status(400)
        .json({success:false,msg:"incorrect  password or  email"})
    }
  
   
    
    await generateToken(res , user?._id ,`welcome back ${user?.username}` )
    

  } catch (error) {
        // console.log("error from  login ", error.message )
        return res
        .status(500)
        .json({success:false , msg:"failed to login from server side "})
  }
};


export const logOut = async(_,res)=>{
    try {
        // console.log("coming req for logut")
        return res.status(200).cookie("token","" , {maxAge:0}).json({
            success:true,
            msg:"logout successfully"
        })
    } catch (error) {
        // console.log(error.message || " error from logout controller" + error)
        return res
        .status(500)
        .json({ success:false , msg:"Failed to logout"})
    }
}

export const profile= async(req,res)=>{
    try {
        
        const user = await User.findById(req.id).populate({path:"enrolledCourses"}).select("-password -__v")
        // console.log("profile = ", user)
        if(!user){
            return res.
            status(404)
            .json({
                sucess:false,
                msg:"User not found"
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        // console.log( error.msg || "error from profle controller " + error);
        return res
        .status(500)
        .json({
            success:false,
            msg:"Failed to fetch user"
        })
    }
}

export const updateProfile = async(req,res)=>{
    try {
        // console.log("Request is coming");
        // console.log(req.body)

        const { username } = req.body;
        const userId = req.id;

        

        if (!username) {
            return res.status(400).json({ success: false, msg: "Name is required" });
        }
        
        const photoFile = req.file;
        if (!photoFile) {
            return res.status(400).json({ success: false, msg: "Profile photo is required" });
        }

        const user = await User.findById(userId)
        if(!user){
            return res
            .status(400)
            .json({
                success:false,
                msg:"user not found"
            })
        }
        // extract the public id of the already existing photo
        // console.log("user = " , user)
        if(user?.photoUrl){
            // console.log("photoUrl = " , photoUrl)
            const photoId = user.photoUrl.split("/").pop(".")[0] // it will give public id of image 
            // console.log("delete photo id = " , photoId)
            deletePhotoFromCloudinary(photoId)
        }
        // now upload new photo
        const cloudinaryResponse = await uploadMedia(photoFile?.path);
        // console.log("Cloudinary response = ", cloudinaryResponse)
        const photoUrl = cloudinaryResponse?.secure_url;

        const updatedData = {username, photoUrl};

        const updatedUer = await User.findByIdAndUpdate(userId,updatedData,{new : true}).select("-password")

        return res
        .status(200)
        .json({
            success:true,
            msg:"User updated successfully",
            updatedUer,
        })


    } catch (error) {
        return res
        .status(500)
        .json({success:false , msg:"failed to update profile from backend"+error.message})
    }
}
