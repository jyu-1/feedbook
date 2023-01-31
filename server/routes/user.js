const express = require("express");
const {
    getUserList,
    loginUser,
    signupUser,
} = require("../controllers/userController");
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

// user list
router.get("/list", checkAuth, getUserList);

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

module.exports = router;
