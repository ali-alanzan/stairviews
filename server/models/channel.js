import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema;


const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "Profile",
        required: true
    },
},
{timestamps: true}
);


const channelSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 1, 
        maxlength: 320, 
        required: true, 
    },
    customUrl: {
        type: String,
    },
    publishedAt: {
        type: String,
    },
    tuhmbnails: {},
    channelId: {
        type: String,
        required: true, 
    },
    category: {
        type: String
    },
    published: {
        type: Boolean,
        default: false
    },
    preview: {
        type: String,
    },
    subscriberCount: {
        type: Number,
        default: 0,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    subscribedCount: {
        type: Number,
        default: 0,
    },
    user: {
        type: ObjectId,
        ref: "Profile",
        required: true
    },
    review: {},
    subscribers: [subscriberSchema]
},
{timestamps: true}
);

export default mongoose.model('Channel', channelSchema);