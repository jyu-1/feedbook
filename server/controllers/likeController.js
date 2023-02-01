const Like = require("../models/likeModel");

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

module.exports = { addLike };
