const Post = require("../models/postModel");
const mongoose = require("mongoose");

// get post
const getAllPost = async (req, res) => {
    try {
        const post = await Post.find({}).sort({ createdAt: -1 }).limit(10);

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
    const { name, message } = req.body;

    try {
        const post = await Post.create({
            name,
            message,
            likeCount: 0,
            commentCount: 0,
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete post
const deletePost = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({ error: "Invalid ID" });

        const post = await Post.findOneAndDelete({ _id: req.params.id });

        if (!post) return res.status(404).json({ error: "Invalid ID" });

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
            { _id: req.params.id },
            { message: req.body.message }
        );

        if (!post) return res.status(404).json({ error: "Invalid ID" });

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getPost, getAllPost, createPost, deletePost, updatePost };
