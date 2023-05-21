import { fetchJSON, randomString } from '../../client/components/utills/helpers';
// import axios from 'axios';
import Video from '../models/video';
import User from '../models/user';
import Channel from '../models/channel';

import { hashPassword, comparePassword } from '../utills/auth';
import slugify from 'slugify';




const client_id = process.env.CLIENT_ID;
const scope = "openid";


if (!client_id) {
  throw new Error("Must setup CLIENT_ID environment");
}

export const addYTVideo = async (req, res) => {
    try {


        const {addedVideoId, addedVideoURL, videoTitle, duration, account} = req.body;
        const videoId  = addedVideoId;
        const alreadyExist = await Video.findOne({
            videoId
        });
        // console.log(videoId, alreadyExist);
        if(alreadyExist != null) return res.status(400).send("Video is Exist");


        const video = await new Video({
            videoId: addedVideoId,
            url: addedVideoURL,
            title: videoTitle,
            slug: slugify(videoTitle),
            user: account.id,
            duration
        }).save();
        res.json(video);

    } catch(err) {
         console.log(err);
        return res.status(400).send("Course create failed. Try again.")
    }
}

export const allMyVideos = async (req, res) => {
    // const user = await Video.findById(req.account.id).exec();
    const account = JSON.parse(req.query.account);
    
    // console.log("req.query.account", req.query.account);
    const videos = await Video.find({user: account.user})
    .exec();

    res.json(videos);
}
