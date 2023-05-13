import mongoose from "mongoose";
const {Schema} = mongoose;
const {ObjectId} = Schema;

const subscribersSchema = new mongoose.Schema({
    user: {
        type: ObjectId, 
        required: true,
        ref: "Profile"
    },
    email: {
        type: String, 
        required: true,
    },
    channelId: {
        type: String, 
        trim: true,
        required: true
    },
},
{timestamps: true}
);

const profileSchema = new Schema(
    {
        name: {
            type: String, 
            trim: true,
            required: true
        },
        email: {
            type: String, 
            trim: true,
            required: true,
            unique: true
        },
        image: {
            type: String,
            default: '/avatar.svg'
        },
        role: {
            type: [String],
            default: ["Subscriber"],
            enum: ["Subscriber", "Instructor", "Admin"],
        },
        channelId: {
            type: String, 
            trim: true,
        },
        information: {},
        sessions: [
            {type: ObjectId, ref: "Session"}
        ],
        watching_balance: 0,
        subscribers: [subscribersSchema],
        token: {
            type: String, 
            required: true,
        },
    },
    {timestamps: true}
);

export default mongoose.model('Profile', profileSchema);