import mongoose from "mongoose";
const {Schema} = mongoose;
const {ObjectId} = Schema;

const userSchema = new Schema(
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
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64
        },
        picture: {
            type: String,
            default: '/avatar.svg'
        },
        role: {
            type: [String],
            default: ["Subscriber"],
            enum: ["Subscriber", "Instructor", "Admin"],
        },
        stripe_account_id: '',
        stripe_seller: {},
        stripeSession: {},
        userinfo: {},
        passwordResetCode: {
            date: String,
            default: "",
        },
        courses: [
            {type: ObjectId, ref: "Course"}
        ],
        coursePays: [
            {type: Object}
        ]
        
    },
    
    {timestamps: true}
);

export default mongoose.model('User', userSchema);