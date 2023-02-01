const express = require("express");
const {
    getUserList,
    loginUser,
    signupUser,
    getUser,
    loginGuest,
} = require("../controllers/userController");
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

// user list
router.get("/list", checkAuth, getUserList);
router.get("/list/:id", checkAuth, getUser);

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// guest account
router.post("/guest", loginGuest);

module.exports = router;
