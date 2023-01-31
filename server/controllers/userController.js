const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" });
};

// get user list
const getUserList = async (req, res) => {
    try {
        const user = await User.find({}, "_id name")
            .sort({ createdAt: -1 })
            .limit(100);

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

        res.status(200).json({ email, token });
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

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getUserList, loginUser, signupUser };
