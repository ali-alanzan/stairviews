import expressJwt from 'express-jwt';
import Course from '../models/course';
import User from '../models/user';
import Profile from '../models/profile';
import Session from '../models/session';
import { comparePassword } from '../utills/auth';

export const requireSignIn = expressJwt({
    getToken: (req, res) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
});


export const requireGoogleAuthClientToServer = async (req, res, next) => {

    try {

        const account = req.query.account != undefined  ? JSON.parse(req.query.account) : req.body.account;
        const {session, token, user} = account;
        let sessionExist = await Session.findOne({
            session,
            token,
            user
        });
        console.log(session, token, user);
        if(!sessionExist) return res.sendStatus(403);
        next();
    } catch(err) {
       console.log(err);
    }
    
    
}

export const isInstructor = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).exec();
        if(user == null || !user.role.includes("Instructor")) {
            return res.sendStatus(403);
        } else {
            next();
        }

    } catch(err) {
  //      console.log(err);
    }
};

export const isEnrolled = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).exec();
        if(user == null) return res.sendStatus(403);

        const course = await Course.findOne({ slug: req.params.slug }).exec();

        // check if course id in the user array
        let ids = [];
        if(user.courses == null) return res.sendStatus(403);

        for ( let i = 0; i < user.courses.length; i++) {
            ids.push(user.courses[i].toString());
        }
        if( !ids.includes(course._id.toString()) ) {
            res.sendStatus(403);
        } else {
            next();
        }

    } catch(err) {
  //      console.log(err);
    }
}