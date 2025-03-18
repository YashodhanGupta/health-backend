const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "doctor", "patient"], required: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
