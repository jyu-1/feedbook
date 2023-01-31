const express = require("express");
const {
    getPost,
    getAllPost,
    createPost,
    deletePost,
    updatePost,
} = require("../controllers/post.Controller");

const router = express.Router();

router.get("/", getAllPost);

router.get("/:id", getPost);

router.post("/", createPost);

router.delete("/:id", deletePost);

router.patch("/:id", updatePost);

module.exports = router;
