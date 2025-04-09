import User from "../models/user.model.js"
import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const  generateToken = async(res , id , msg)=>{
    const user = await User.findById(id)
    if(!user){
        return res
        .status(400)
        .json({success:false , msg: "user not found  "})
    }

    const token = jwt.sign({id} ,process.env.SECRET_TOKEN, {
        expiresIn : process.env.EXPIRY
    } )
    // console.log("user = ",user)


    return res
    .status(200)
    .cookie("token", token , {
        httpOnly:true,
        secure:true,
        sameSite:'strict' 
    })
    .json({success:true , msg , user})

}