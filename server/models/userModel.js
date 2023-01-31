const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
});

userSchema.statics.signup = async function (email, password, name) {
    if (!email || !password || !name) {
        throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is too weak");
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("Email already in use");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await this.create({
        email,
        password: hash,
        name,
        profilePicture: "https://cdn-icons-png.flaticon.com/512/428/428933.png",
    });

    return user;
};

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Account doesn't exist");
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
        throw Error("Incorrect Password");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);
