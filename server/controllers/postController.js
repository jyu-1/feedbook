const Post = require("../models/postModel");
require("../models/commentModel");
const mongoose = require("mongoose");

// get post
const getAllPost = async (req, res) => {
    try {
        const post = await Post.find({}, "message updatedAt")
            .sort({ updatedAt: -1 })
            .limit(10)
            .populate({
                path: "createdBy",
                select: "name profilePicture",
            })
            .populate({
                path: "comments",
                select: "createdBy updatedAt message -postId",
                perDocumentLimit: 5,
                populate: { path: "createdBy", select: "name profilePicture" },
            })
            .populate({ path: "commentCount" })
            .populate({ path: "likeCount" })
            .populate({
                path: "userLiked",
                match: { createdBy: req.user._id },
            });

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get one post
const getPost = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({ error: "Invalid ID" });

        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ error: "Invalid ID" });

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// create post
const createPost = async (req, res) => {
    const { message } = req.body;

    try {
        const post = await Post.create({
            message,
            createdBy: req.user._id,
        });
        res.status(200).json({
            _id: post._id,
            message: post.message,
            likeCount: 0,
            commentCount: 0,
            updatedAt: post.updatedAt,
            userLiked: 0,
            comments: [],
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete post
const deletePost = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({ error: "Invalid ID" });

        const post = await Post.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id,
        });

        if (!post) return res.status(404).json({ error: "Invalid Operation" });

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// update post
const updatePost = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({ error: "Invalid ID" });

        const post = await Post.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            { message: req.body.message }
        );

        if (!post) return res.status(404).json({ error: "Invalid Operation" });

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getPost, getAllPost, createPost, deletePost, updatePost };
