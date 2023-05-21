import express from 'express';


const router = express.Router();


// controllers
// import {register, login, logout, currentUser, forgetPassword, resetPassword}  from "../controllers/auth";
// import {loginGoogle, loginGoogleinfo, joinGoogle}  from "../controllers/logg";
import {addYTVideo, allMyVideos }  from "../controllers/video";
import {addChannel, myChannel}  from "../controllers/channel";

// middleware
import {requireGoogleAuthClientToServer} from '../middleware';


// router.post('/register', register);
router.post('/add-video', requireGoogleAuthClientToServer, addYTVideo);
router.get("/myvideos", requireGoogleAuthClientToServer, allMyVideos);
router.post("/add-channel", requireGoogleAuthClientToServer, addChannel);
router.get("/my-channel", requireGoogleAuthClientToServer, myChannel);

module.exports = router;