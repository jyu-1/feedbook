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
});

postSchema.virtual("commentCount", {
    ref: "Comment",
    localField: "_id",
    foreignField: "postId",
    count: true,
});

module.exports = mongoose.model("Post", postSchema);
