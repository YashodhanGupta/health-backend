const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const mongoose = require("mongoose");

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get doctor by ID
router.get("/", async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctors" });
    }
  });

  // ✅ Get doctor details by ID (from users collection)
  router.get("/:id", async (req, res) => {
    try {
        const doctorId = req.params.id;
        console.log("Fetching doctor with ID:", doctorId); // Debugging log

        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            console.error("Invalid Doctor ID format:", doctorId);
            return res.status(400).json({ message: "Invalid Doctor ID format" });
        }

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            console.error("Doctor not found in DB");
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json(doctor);
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
// ✅ Update doctor profile
router.put("/:id", async (req, res) => {
  try {
      const { name, email, password } = req.body;
      console.log(`Updating doctor ID: ${req.params.id}`);

      const updatedDoctor = await User.findByIdAndUpdate(
          req.params.id,
          { name, email, password },
          { new: true }
      );

      if (!updatedDoctor) {
          return res.status(404).json({ message: "Doctor not found" });
      }

      console.log("Updated Doctor Data:", updatedDoctor);
      res.json(updatedDoctor);
  } catch (error) {
      console.error("Error updating doctor:", error);
      res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
