import { Router } from "express";
import { loginUser, logOut, profile, registerUser, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { upload } from "../utils/multer.js";

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(isAuthenticated , logOut)
router.route('/profile').get(isAuthenticated,profile)
router.route('/profile/update').put(isAuthenticated,upload.single("photoUrl"),updateProfile)


export default router