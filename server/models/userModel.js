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
});

userSchema.statics.signup = async function (email, password) {
    const exists = await this.findOne({ email });

    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is too weak");
    }

    if (exists) {
        throw Error("Email already in use");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await this.create({ email, password: hash });

    return user;
};

module.exports = mongoose.model("User", userSchema);
