const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        uploadImage: {
            type: String,
        },
        likeCount: {
            type: Number,
            required: true,
        },
        commentCount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
