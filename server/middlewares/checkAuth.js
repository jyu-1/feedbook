const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const checkAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).json({ error: "No Token Found" });

    const token = authorization.split(" ")[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({ _id }, "_id");
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ error: "Not Authorized" });
    }
};

module.exports = checkAuth;
