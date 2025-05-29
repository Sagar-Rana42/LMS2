import express from "express"
import { uploadMedia } from "../utils/uploadOnCloudinary.js"
import { upload } from "../utils/multer.js"
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();
router.post(
  "/upload-video",
  isAuthenticated,
  upload.single("file"),
  async (req, res) => {
    try {
      const result = await uploadMedia(req.file.path);
      return res.status(200).json({
        success: true,
        message: "Video uploaded successfully",
        data: result,
      });
    } catch (error) {
      console.log("error from video upload", error);
      return res.status(500).json({ msg: "Error in uploading file" });
    }
  }
);

export default router;
