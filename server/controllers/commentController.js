const Comment = require("../models/commentModel");
const mongoose = require("mongoose");

// create comment
const createComment = async (req, res) => {
    const { postId, message, createdBy } = req.body;

    try {
        const comment = await Comment.create({
            postId,
            message,
            createdBy,
        });
        res.status(200).json({
            _id: comment._id,
            message: comment.message,
            updatedAt: comment.updatedAt,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createComment };
