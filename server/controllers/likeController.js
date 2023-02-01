const Like = require("../models/likeModel");
const mongoose = require("mongoose");

// add like
const addLike = async (req, res) => {
    const { postId } = req.body;

    try {
        const exist = await Like.findOne({
            postId: postId,
            createdBy: req.user._id,
        });

        if (exist) {
            throw Error("You already liked this post");
        }

        const like = await Like.create({
            postId,
            createdBy: req.user._id,
        });
        res.status(200).json({
            _id: like._id,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete like
const deleteLike = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({ error: "Invalid ID" });

        const like = await Like.findOneAndDelete({
            postId: req.params.id,
            createdBy: req.user._id,
        });

        if (!like) return res.status(404).json({ error: "Invalid Operation" });

        res.status(200).json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { addLike, deleteLike };
