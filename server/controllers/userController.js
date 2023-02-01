const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// get user list
const getUserList = async (req, res) => {
    try {
        const user = await User.find({}, "name profilePicture")
            .sort({ name: 1 })
            .limit(100);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get one user
const getUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({ error: "Invalid ID" });

        const user = await User.findById(req.params.id, "name profilePicture");

        if (!user) return res.status(404).json({ error: "Invalid ID" });

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// signup user
const signupUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const user = await User.signup(email, password, name);
        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getUserList, getUser, loginUser, signupUser };
