import Profile from '../models/profile';
import Session from '../models/session';
import { hashPassword, comparePassword } from '../utills/auth';
import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';
import { nanoid } from 'nanoid'

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION
};

const SES = new AWS.SES(awsConfig); 


export const addUserSession = async (req, res) => {
    const ip = req.socket.remoteAddress ? req.socket.remoteAddress : req.ip;

    try {  
        const { name, email, image, information, userAgent } = req.body;
        if (!name || !email || Object.keys(information).length <= 0) return res.status(400).send("Sessin is required")
        // check if our db has user with that email
        let profile = await Profile.findOne({email}).exec();

        // create signed jwt
        const token = jwt.sign(
            {
                _id: profile._id
            },
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );
        
        if(!profile) {
            // register 
            profile = new Profile({
                name, email, image, information, token
            });
            await profile.save();
        }

        console.log(profile);
        // Profile
        // name, email, image, information, date, time

        const session_data = {
            user: profile._id,
            email,
            token,
            information,
            userAgent,
            ip
        };
        const session = new Session({
            ...session_data
        });
        session.save();
        
        const userSessions = profile.sessions;
        userSessions.push([session._id]);
        const profileUpdate = Profile.findOneAndUpdate({
            email,
        }, {
            userSessions,
            token
        }).exec();


        return res.json({ok: true, session: session._id, token: token, user: profile._id});
    } catch(err) {
        console.log(err);
    }
}




export const register = async (req, res) => {

    try {

  //      console.log(req.body);
        const { name, email, password } = req.body;
        // validation 
        if (!name) return res.status(400).send("Name is required")
        if (!password || password.length < 6) return res.status(400).send("Password should be min 6 characters long")


        let userExist = await User.findOne({email}).exec();
        if(userExist) return res.status(400).send("E-mail is taken");


        // hash password

        const hashedPassword = await hashPassword(password)

        // register 
        const user = new User({
            name, email, password: hashedPassword
        });
        await user.save();

        // console.log('saved user', user);

        return res.json({ok: true})

    } catch(err) {
  //      console.log(err);
        return res.status(400).send('Error. Try againg')
    }

};

export const login = async (req, res) => {
    try {

        // console.log(req.body);
        const {email, password} = req.body;

        // check if our db has user with that email
        const user = await User.findOne({email}).exec();

        if(!user) return res.status(400).send('No user found');

        // check password
        const match = await comparePassword(password, user.password);

        if(!match) return res.status(400).send('Wrong Login data');

  //      console.log(match);
        // create signed jwt
        const token = jwt.sign(
            {
                _id: user._id
            },
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        // return user and token to client, execlude hashed password
        user.password = undefined;

        // send token and cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true, // only works on HTTPS
        });

        // send the user as json response
        res.json(user);
    } catch (err) {
  //      console.log(err);
        res.status(400).send('Error. Try again');
    }
};


export const logout = async (req, res) => {
    try {

        res.clearCookie("token");
        return res.json({message: "Signout success"})
    } catch (err) {
  //      console.log(err);
        res.status(400).send('Error. Try again');
    }
};



export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password').exec();
        // console.log('CURRENT USER', user);
        return res.json({ok:true});
    } catch (err) {
  //      console.log(err);
    }
};


export const forgetPassword = async (req, res) => {
    // console.log('Send email using ses');
    // res.json({ok: true });

    try {
        const {email} = req.body;
        // console.log(email);

        const shortCode = nanoid(6).toUpperCase();
        const user = await User.findOneAndUpdate({email}, {passwordResetCode: shortCode});
        
        if(!user) return res.status(400).send('Email not found');
        
        // prepare for email


        const params = {
            Source: process.env.EMAIL_FROM,
            Destination: {
                ToAddresses: [email], //['alialanzan.online@gmail.com']
            },
            // ReplyToAddresses: [process.env.EMAIL_FROM],
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: `
                            <html>
                                <h1>Reset Password Link</h1>
                                <p> Please use the following link to reset your password</p>
                                <h2 style="color: red;"> ${shortCode} </h2>
                                <i>Stairviews</i>
                            </html>
                        `
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: "Reset Password"
                }
            }
        };

        const emailSent = SES.sendEmail(params).promise();
        emailSent.then((data) => {
      //      console.log(data);
            res.json({ ok: true  } );
        }).catch((err) => {
           console.log(err);
        });
    } catch(err) {
  //      console.log(err);
    }



}


export const resetPassword = async (req, res) => {
    try {
        const {email, code, password} = req.body;
        // console.table({email, code, password});
        const hashedPassword = await hashPassword(password);
        const user = User.findOneAndUpdate({
            email,
            passwordResetCode: code,
        }, {
            password: hashedPassword,
            passwordResetCode: ""
        }).exec();
        return res.json({ ok: true });
    } catch(err) {
  //      console.log(err);
        return res.status(400).send('Error! Try again.');
    }
}