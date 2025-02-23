const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Full Name is required"],
        trim: true,
        minlength: [3, "Full Name must be at least 3 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    profileImageUrl: {
        type: String,
        default: "/images/default.png",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, { timestamps: true });

// ✅ Hash password before saving
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    const salt = randomBytes(16).toString("hex"); // ✅ Corrected
    this.salt = salt;
    this.password = createHmac("sha256", salt).update(this.password).digest("hex");

    next();
});
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");
    const salt = user.salt;
    const hp = user.password;

    const up = createHmac("sha256", salt).update(password).digest("hex");

    if (up !== hp) throw new Error("Password do not match");
    const token = createTokenForUser(user);

    return token;

})

const User = model("User", userSchema);

module.exports = User;
