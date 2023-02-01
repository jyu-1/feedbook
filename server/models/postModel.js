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
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

postSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "postId",
    options: { sort: { createdAt: -1 } },
});

postSchema.virtual("commentCount", {
    ref: "Comment",
    localField: "_id",
    foreignField: "postId",
    count: true,
});

postSchema.virtual("likeCount", {
    ref: "Like",
    localField: "_id",
    foreignField: "postId",
    count: true,
});

postSchema.virtual("userLiked", {
    ref: "Like",
    localField: "_id",
    foreignField: "postId",
    count: true,
});

module.exports = mongoose.model("Post", postSchema);
