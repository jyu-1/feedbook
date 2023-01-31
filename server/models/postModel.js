const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
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
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
