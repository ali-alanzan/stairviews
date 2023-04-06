import mongoose from 'mongoose';

const {ObjectId} = mongoose.Schema;



const historySchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    duration: {
        type: Number,
        required: true,
    },
    progress: {
        type: Number,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
},
{timestamps: true}
);


const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3, 
        maxlength: 320, 
        required: true, 
    },
    slug: {
        type: String,
        lowercase: true,
    },
    videoId: {
        type: String,
        trim: true,
        minlength: 3, 
        maxlength: 320, 
        required: true
    },
    url: {
        type: String,
        trim: true,
        minlength: 3, 
        maxlength: 320, 
        required: true
    },
    duration: {
        type: Number,
        required: true,
    },
    views: {
        type: Number
    },
    watched: {
        type: Number
    },
    watchers: [
        {type: ObjectId, ref: "User"}
    ],
    history: [historySchema],
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    published: {
        type: Boolean,
        default: false
    }
},
{timestamps: true}
);


export default mongoose.model('Video', videoSchema);