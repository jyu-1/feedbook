const Comment = require("../models/commentModel");

// create comment
const createComment = async (req, res) => {
    const { postId, message } = req.body;

    try {
        const comment = await Comment.create({
            postId,
            message,
            createdBy: req.user._id,
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
