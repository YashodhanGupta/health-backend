const express = require("express");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Approve/Reject Doctor Registration
router.put("/doctors/:id/status", async (req, res) => {
    try {
        const { status } = req.body; // "approved" or "rejected"
        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json({ message: `Doctor ${status} successfully`, doctor });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Get All Users (Doctors & Patients)
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete a User (Doctor/Patient)
router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Get all appointments with doctor's name
router.get("/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find().populate("doctorId", "name email");
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});


module.exports = router;
