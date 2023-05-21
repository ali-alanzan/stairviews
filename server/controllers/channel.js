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

export const addChannel = async (req, res) => {
    console.log(req);
    try {


        const { account, channelId, preview, review} = req.body;
        const { title, customUrl, tuhmbnails } = review.snippet;
        const {viewCount, subscriberCount } = review.statistics;
        const channelExist = await Channel.findOne({
            channelId
        });
        // console.log(videoId, alreadyExist);
        if(channelExist != null) return res.status(400).send("Channel is Exist");


        const channel = await new Channel({
            title, customUrl, tuhmbnails,
            channelId, preview, review,
            viewCount, subscriberCount,
            user: account.user
        }).save();
        res.json({ok:true});

    } catch(err) {
        console.log(err);
    }
}

export const myChannel = async(req, res) => {
    
    const account = JSON.parse(req.query.account);
    console.log(req.query, account)
    const channel = await Channel.findOne({user: account.user})
    .exec();

    res.json(channel);
}