import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastname: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 5,
            max: 50
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: [],
        },
        communities: {
            type: Array,
            default: [],
        },
        location: String, 
        year: Number,
        college: String,
        branch: String,
        viewedProfile: Number,
        impressions: Number, 
    }, 
    { timestamps: true } 
)

const User = mongoose.model('User', userSchema);
export default User;