import {v2 as cloudinary} from 'cloudinary'
import dotenv from "dotenv"
dotenv.config({})


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUDINARY_NAME)
console.log(process.env.CLOUDINARY_API_SECRET)
export const uploadMedia = async(file)=>{
    try {
        const upLoadResponse = await cloudinary.uploader.upload(file,{
            resource_type:"auto"
        })
        return upLoadResponse
    } catch (error) {
        
        console.log("error from uploadmedia " , error.message)
        return res
        .status(500)
        .json({
            success:false,
            msg:"Faild to connect file "
        })
    }
}

export const deletePhotoFromCloudinary = async(id)=>{
    try {
        await cloudinary.uploader.destroy(id)
        // console.log("delete sucessfully ");
        
    } catch (error) {
        console.log("failed to delelte photo " , error.message)
    }
}
export const deleteVideoFromClouinary = async(id)=>{
    try {
        await cloudinary.uploader.destroy(id,{
            resource_type:"video"
        })
    } catch (error) {
        console.log("Failed to delete video " + error.message)
    }
}