import express from "express";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken"
import User from "../models/user.model.js";
import {generateToken} from "../utils/generateToken.js";




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
        console.log("error in register" , error.message);
        return res.status(500).json({ success: false, msg: "failed to register" });
    }
};

export const loginUser = async (req, res) => {
  try {
        const { email, password } = req.body;
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
    console.log("sending data of login " , );;


  } catch (error) {
        console.log("error from  login ", error.message )
        return res
        .status(500)
        .json({success:false , msg:"failed to login from server side "})
  }
};
