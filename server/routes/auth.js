import express from 'express';


const router = express.Router();


// controllers
// import {register, login, logout, currentUser, forgetPassword, resetPassword}  from "../controllers/auth";
// import {loginGoogle, loginGoogleinfo, joinGoogle, subscriptionInsert}  from "../controllers/logg";
// import {login, logout}  from "../controllers/auth";

// middleware
// import {requireSignIn} from '../middleware';

import {addUserSession} from '../controllers/auth';



router.post("/user-session", addUserSession);


// router.post('/register', register);
// router.post('/logingoogle', loginGoogle);
// router.get('/joingoogle', joinGoogle);
// router.get('/logingoogle', loginGoogleinfo);
// router.post("/subscription-insert", subscriptionInsert);
// router

// router.post('/login', login);
// router.get('/logout', logout);

// router.get('/logout', logout);
// router.get('/current-user', requireSignIn, currentUser);
// router.post('/forget-password', forgetPassword);
// router.post('/reset-password', resetPassword);






module.exports = router;