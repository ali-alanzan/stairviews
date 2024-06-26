const AWS = require('aws-sdk');
import {nanoid} from 'nanoid';
import Course from '../models/course';
import slugify from 'slugify';
import {readFileSync} from 'fs';
import User from '../models/user';
import Completed from '../models/completed';



const stripe = require('stripe')(process.env.STRIPE_SECRET);



const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION
};
 
const S3 = new AWS.S3(awsConfig);

export const uploadImage = async (req, res) => {
    // console.log(req.body);
    try {
        const {image} = req.body;
        if(!image) return res.status(400).send('No Image');

        // prepare the image
        const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), "base64");
        const type = image.split(';')[0].split('/')[1];

        // image params
        const params = {
            Bucket: "eduflix-bucket",
            Key: `${nanoid()}.${type}`,
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: "base64",
            ContentType: `image/${type}`,
        };

        // upload to S3
        S3.upload(params, (err, data) => {
            if(err) {
          //      console.log(err); 
                return res.sendStatus(400);
            }

      //      console.log(data);
            res.send(data);
        });

    } catch(err) {
  //      console.log(err);
    }
};


export const removeImage = async (req, res) => {
    // console.log(req.params);
    // console.log(req.user);
    // return;
    if( req.params.instructorId != req.user._id ) return res.status(400).send('Unauthorized');

    try {
        const {image} = req.body;
        if(!image) return res.status(400).send('No image');
        const params = {
            Bucket: image.Bucket,
            Key: image.Key,

        };

        // send remove request to s3
        S3.deleteObject(params, (err, data) => {
            if(err) {
          //      console.log(err);
                res.sendStatus(400);
            }
            res.send({ ok:true });
        });
    } catch(err) {
  //      console.log(err);
    }
};



export const create = async (req, res) => {
    // console.log("CREATE COURSE", req.body);
    // return;
    try {
        const alreadyExist = await Course.findOne({
            slug: slugify(req.body.title.toLowerCase()),
        });
        if(alreadyExist) return res.status(400).send("Title is taken");

        const course = await new Course({
            slug: slugify(req.body.title),
            instructor: req.user._id,
            ...req.body,
        }).save();
        res.json(course);

    } catch(err) {
  //      console.log(err);
        return res.status(400).send("Course create failed. Try again.")
    }
};


export const read = async (req, res) => {
    try {
        let course = await Course.findOne({slug: req.params.slug })
            // .select('-lessons.video -lessons.content')
            .populate("instructor", "_id name").exec();
        const allLessons = [];
        allLessons.map((lesson) => {
            if(lesson.free_preview) {
                allLessons.push(lesson);
            } else {
                allLessons.push({...lesson, video: {}})
            }
        });
        
        res.json(course);

    } catch(err) {
  //      console.log(err);
    }
};

export const readEnrolledCourse = async (req, res) => {
    try {
        let course = await Course.findOne({slug: req.params.slug })
            // .select('-lessons.video -lessons.content')
            .populate("instructor", "_id name").exec();
        
        res.json(course);

    } catch(err) {
  //      console.log(err);
    }
};


export const uploadVideo = async (req, res) => {
    // console.log('req.user._id', req.user._id);;
    // console.log('req.params.instructorId', req.params.instructorId);;
    if( req.params.instructorId != req.user._id ) return res.status(400).send('Unauthorized');
    try {
        const {video} = req.files;
        // console.log(video);

        if(!video) return res.status(400).send('No video');

        // video params
        const params = {
            Bucket: "eduflix-video-lessons",
            Key: `${nanoid()}.${video.type.split('/')[1]}`, // 
            Body: readFileSync(video.path),
            ACL: 'public-read',
            ContentEncoding: "base64",
            ContentType: video.type,
        };

        // upload to S3
        S3.upload(params, (err, data) => {
            if(err) {
          //      console.log(err);
                res.sendStatus(400);
            }

      //      console.log(data);
            return res.send(data);
        });

    } catch(err) {
  //      console.log(err);
    }
};



export const removeVideo = async (req, res) => {
    console.log(req);
    if( req.params.instructorId != req.user._id ) return res.status(400).send('Unauthorized');
    try {
        const {video} = req.body;
        if(!video) return res.status(400).send('No video');
        const params = {
            Bucket: video.Bucket,
            Key: video.Key,

        };

        // send remove request to s3
        S3.deleteObject(params, (err, data) => {
            if(err) {
          //      console.log(err);
                res.sendStatus(400);
            }
            res.send({ ok:true });
        });
    } catch(err) {
  //      console.log(err);
        return res.status(400).send("Remove video failed");
    }
};


//  AUDIO

export const uploadAudio = async (req, res) => {
    // console.log('req.user._id', req.user._id);;
    // console.log('req.params.instructorId', req.params.instructorId);;
    if( req.params.instructorId != req.user._id ) return res.status(400).send('Unauthorized');
    try {
        const {audio} = req.files;
        // console.log(video);

        if(!audio) return res.status(400).send('No Audio');

        // video params
        const params = {
            Bucket: "eduflix-audio-lessons",
            Key: `${nanoid()}.${audio.type.split('/')[1]}`, // 
            Body: readFileSync(audio.path),
            ACL: 'public-read',
            ContentEncoding: "base64",
            ContentType: audio.type,
        };

        // upload to S3
        S3.upload(params, (err, data) => {
            if(err) {
          //      console.log(err);
                res.sendStatus(400);
            }

      //      console.log(data);
            return res.send(data);
        });
  //      console.log('After S3 Audio');
  //      console.log('After S3 Audio');
        // return res.sendStatus(400);
    } catch(err) {
  //      console.log(err);
    }
};



export const removeAudio = async (req, res) => {
    console.log(req);
    if( req.params.instructorId != req.user._id ) return res.status(400).send('Unauthorized');
    try {
        const {audio} = req.body;
        if(!audio) return res.status(400).send('No video');
        const params = {
            Bucket: audio.Bucket,
            Key: audio.Key,

        };

        // send remove request to s3
        S3.deleteObject(params, (err, data) => {
            if(err) {
          //      console.log(err);
                res.sendStatus(400);
            }
            res.send({ ok:true });
        });
    } catch(err) {
  //      console.log(err);
        return res.status(400).send("Remove video failed");
    }
};









export const addLesson = async (req, res) => {
    try {
        const { slug, instructorId } = req.params;
        const { title, content, video } = req.body;

        if(req.user._id != instructorId) {
            return res.status(400).send('Unauthorized');
        }

        const updated = await Course.findOneAndUpdate(
            {slug}, 
            {
            $push: {lessons: {title, content, video, slug: slugify(title)}}
            }, 
            {new: true}
        ).populate('instructor', "_id name").exec();
        
        res.json({...updated, ok: true});

    } catch(err) {
  //      console.log(err);
        return res.status(400).send("Add Lesson failed");
    };
};

export const update = async (req, res) => {
    try {
        const { slug } = req.params;
        const course = await Course.findOne({ slug }).exec();

        if(req.user._id != course.instructor) return res.status(400).send('Unauthorized');

        const updated = await Course.findOneAndUpdate(
            {slug},
            req.body,
            {
                new: true
            }

        ).exec();

        res.json({...updated, ok: true});

    } catch(err) {
  //      console.log(err);
        return res.status(400).send("Course update failed. Try again.")
    }
};


export const removeLesson = async (req, res) => {
    const { slug, lessonId } = req.params;

    const course = await Course.findOne({ slug }).exec();
    if(req.user._id != course.instructor._id) return res.status(400).send('Unauthorized');
    console.log(course);
    const deletedCourse = await Course.findOneAndUpdate({_id: course._id},{
            $pull: { lessons: { _id: lessonId } },
        }).exec();

    res.json({ ok: true });
};

export const updateLesson = async (req, res) => {
   try {
    const { slug} = req.params;
    const { title, content, video, audio, free_preview, _id } = req.body;
    const course = await Course.findOne({slug}).select("instructor").exec();
    if(req.user._id != course.instructor._id) return res.status(400).send('Unauthorized');

    const updated = await Course.updateOne(
        {"lessons._id": _id},
        {
            $set: {
                "lessons.$.title": title,
                "lessons.$.content": content,
                "lessons.$.video": video,
                "lessons.$.audio": audio,
                "lessons.$.free_preview": free_preview,
            }
        },
        { new: true }
    ).exec();
    // console.log('updated', updated);
    
    res.json({ok: true});
   } catch(err) {
 //      console.log(err);
       return res.status(400).send("Update lesson failed");
   }
    
};

export const publishCourse = async (req, res) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId).select("instructor").exec();
        if( req.user._id != course.instructor._id) {
            return res.status(400).send('Unauthorized');
        }

        const updated = await Course.findByIdAndUpdate(courseId, {published: true}, {new: true}).exec();

        res.json({published: updated.published, ok: true});        

    } catch (err) {
  //      console.log(err);
        return res.status(400).send('Publish course failed')
    }
};

export const unPublishCourse = async (req, res) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId).select("instructor").exec();
        if( req.user._id != course.instructor._id) {
            return res.status(400).send('Unauthorized');
        }

        const updated = await Course.findByIdAndUpdate(courseId, {published: false}, {new: true}).exec();
        res.json({published: updated.published, ok: true});

        // res.json(updated);
    } catch (err) {
  //      console.log(err);
        return res.status(400).send('UnPublish course failed')
    }
};


export const courses = async (req, res) => {
    const all = await Course.find({published: true}).populate('instructor', '_id name')
    .exec();
    res.json(all);
};



export const checkEnrollment = async (req, res) => {
    const {courseId} = req.params;

    // find courses of the currently logged in user
    const user = await User.findById(req.user._id).exec();

    // check if the course id in the user's courses

    let ids = [];
    let length = user.courses && user.courses.length;
    for (let i = 0; i < length; i++) {
        ids.push(user.courses[i].toString());
    }
    res.json({
        status: ids.includes(courseId),
        course: await Course.findById(courseId).exec()
    });
};

export const freeEnrollment = async (req, res) => {
    try {
        // check if course is free or paid
        const course = await Course.findById(req.params.courseId).exec();

        if(course.paid) return;

        const result = await User.findByIdAndUpdate( req.user._id, {
            $addToSet: {
                courses: course._id
            }
        },
        {new: true}
        );
        res.json({
            message: "Congratulations! You have successfully enrolled",
            course,
            status: true
        });
    } catch(err) {
  //      console.log('free enrollment err', err);
    }
};

export const paidEnrollment = async (req, res) => {
   

    try {
    // check if course is free or paid
    const course = await Course.findById(req.params.courseId)
    .populate('instructor')
    .exec();
    if(!course || !course.paid) return res.sendStatus(400);

    // application fee 30% - 3%

    const fee = (course.price * 30) / 100;

    // create stripe session
    const checkoutSessionData = {
        payment_method_types: ['card'],

        // purshase details
        line_items: [
            {
                name: course.title,
                amount: Math.round(course.price.toFixed(2) * 100),
                currency: 'usd',
                quantity: 1,
            },
        ],
        // change buyer and transfer reamining balance to seller (after fee),
        payment_intent_data: {
            application_fee_amount: Math.round(fee.toFixed(2) * 100),
            transfer_data: {
                destination: course.instructor.stripe_account_id,

            },
            on_behalf_of: course.instructor.stripe_account_id
        },
        // redirect url after successful payment
        success_url: `${process.env.STRIPE_SUCCESS_URL}/${course._id}`,
        cancel_url: `${process.env.STRIPE_CANCEL_URL}/${course.slug}`,

    };
    const session = await stripe.checkout.sessions.create(checkoutSessionData);


    // console.log('SESSION ID => ', session);

    await User.findByIdAndUpdate(req.user._id, {stripeSession: session}).exec();

    res.send(session.id);

    } catch(err) {
  //      console.log('PAID ENROLLMENT ERR');
        // console.log(err);
        return res.status(400).send('Enrollment create failed.');

    }
};

export const stripeSuccess = async (req, res) => {
    try {
        // find course
        const course = await Course.findById(req.params.courseId).exec();
        // get user from db to get stripe session id
        const user = await User.findById(req.user._id).exec();

        // if no stripe session return

        if(!user.stripeSession.id) return res.sendStatus(400);

        // retrieve stripe session

        const session = await  stripe.checkout.sessions.retrieve(user.stripeSession.id);
        // console.log('STRIPE SUCCESS', session)

        // if session payment status is paid. push course to user's course []

        if(session.payment_status === 'paid') {
            await User.findByIdAndUpdate(user._id, {
                $addToSet: {
                    courses: course._id,
                    coursePays: session
                },
                $set: {
                    stripeSession: {}
                }
            }).exec();
            res.json({ success: true, course });
        } 

    } catch(err) {
  //      console.log('STRIPE SUCCESS ERR', err);
        res.json({ success: false });
    }
};

export const userCourses = async (req, res) => {
    const user = await User.findById(req.user._id).exec();
    const courses = await Course.find({_id: {$in: user.courses}})
    .populate('instructor', '_id name')
    .exec();

    res.json(courses);

};

export const markCompleted = async (req, res) => {
    const {courseId, lessonId} = req.body;
    // console.log(courseId, lessonId);
    
    // find if user with that course already created
    const existing = await Completed.findOne({
        user: req.user._id,
        course: courseId
    }).exec();

    if(existing) {
        // update
        const updated = await Completed.findOneAndUpdate({user: req.user._id, course: courseId},
            {
                $addToSet: {lessons: lessonId},
            },
            ).exec();
        res.json({ok: true});
    } else {
        // create 
        const created = await new Completed({
            user: req.user._id,
            course: courseId,
            lessons: lessonId
        }).save();
        res.json({ok: true});
    }
};


export const markInCompleted = async (req, res) => {
   try {
    const {courseId, lessonId} = req.body;
    // console.log(courseId, lessonId);
    
    const updated = await Completed.findOneAndUpdate({user: req.user._id, course: courseId},
        {
            $pull: {lessons: lessonId},
        },
        ).exec();
    res.json({ok: true});
   } catch(err) {
    console.log(err);
   }
};


export const listCompleted = async (req, res) => {
    try {
        const list = await Completed.findOne({user: req.user._id, 
            course: req.body.courseId}).exec();
        list && list.lessons && res.json(list.lessons);
    } catch(err) {
  //      console.log(err);
    }
};

