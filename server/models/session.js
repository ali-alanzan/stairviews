import mongoose from "mongoose";
const {Schema} = mongoose;
const {ObjectId} = Schema;

const sessionsSchema = new mongoose.Schema({
        user: {
            type: ObjectId, 
            required: true,
            ref: "Profile"
        },
        email: {
            type: String, 
            required: true,
        },
        token: {
            type: String, 
            required: true,
        },
        userAgents: {
            type: String
        },
        ip: {
            type: String
        },
        information: {},
    },
    {timestamps: true}
);


export default mongoose.model('Session', sessionsSchema);