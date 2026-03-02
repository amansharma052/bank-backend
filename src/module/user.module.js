const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
{
    email: {
        type: String,
        required: [true, "Email is required for creating a user"],
        trim: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email address"
        ],
        unique: [true, "Email already exists"]
    },

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        minlength: [8, "Password should contain at least 8 characters"],
        select: false
    }
},
{
    timestamps: true
}
);

// Password hash before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;