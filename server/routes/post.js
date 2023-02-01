const express = require("express");
const {
    getPost,
    getAllPost,
    createPost,
    deletePost,
    updatePost,
} = require("../controllers/postController");
const { addLike } = require("../controllers/likeController");
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

router.use(checkAuth);

router.get("/", getAllPost);

router.get("/:id", getPost);

router.post("/", createPost);

router.delete("/:id", deletePost);

router.patch("/:id", updatePost);

router.post("/like", addLike);

module.exports = router;
