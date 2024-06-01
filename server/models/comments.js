import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    }
)
