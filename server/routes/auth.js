import express from 'express';


const router = express.Router();


// controllers
// import {register, login, logout, currentUser, forgetPassword, resetPassword}  from "../controllers/auth";
import {loginGoogle, loginGoogleinfo, joinGoogle}  from "../controllers/logg";
import {login, logout}  from "../controllers/auth";

// middleware
import {requireSignIn} from '../middleware';


// router.post('/register', register);
router.post('/logingoogle', loginGoogle);
router.get('/joingoogle', joinGoogle);
router.get('/logingoogle', loginGoogleinfo);

router.post('/login', login);
router.get('/logout', logout);

// router.get('/logout', logout);
// router.get('/current-user', requireSignIn, currentUser);
// router.post('/forget-password', forgetPassword);
// router.post('/reset-password', resetPassword);






module.exports = router;