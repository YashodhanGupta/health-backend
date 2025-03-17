const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
require("dotenv").config(); // Load environment variables

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, password, role, specialization, experience, age, medicalHistory } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      doctorInfo: role === "doctor" ? { specialization, experience } : undefined,
      patientInfo: role === "patient" ? { age, medicalHistory } : undefined
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ message: "User not found" });
      }

      // Check if the role matches
      if (user.role !== role) {
          return res.status(403).json({ message: "Incorrect role selected" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, role: user.role, userId: user._id });

  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
