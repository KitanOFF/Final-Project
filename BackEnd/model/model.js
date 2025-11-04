const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, `You must enter your email`],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, `Your email is not valid`]
    },
    password: {
        type: String,
        required: [true, `You must enter your password`]
    },
    role: {
        type: String,
        required: true,
        enum: [`startup`, `mentor`],
    },
    phone: {
        type: Number,
    },
    skills: {
        type: [String],
        default: []
    },
    desc: String,
    representative: String,
    address: String,
    acceptedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }],
    jobsPosted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }],
    photo: String,
}, { timestamps: true });

userSchema.pre(`save`, async function (next) {
    if (!this.isModified(`password`)) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
