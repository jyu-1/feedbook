const express = require("express");
const checkAuth = require("../middlewares/checkAuth");
const { createComment } = require("../controllers/commentController");

const router = express.Router();

router.use(checkAuth);

router.post("/", createComment);

module.exports = router;
