const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { doctorId, time, name, email, contact, age } = req.body;

        if (!doctorId || !time || !name || !email || !contact || !age) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const appointment = new Appointment({ doctorId, time, name, email, contact, age });
        await appointment.save();

        res.status(201).json({ message: "Appointment booked successfully" });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ message: "Server error while booking appointment" });
    }
});
router.get("/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const appointments = await Appointment.find({ email }).populate("doctorId", "name specialization");

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found" });
        }

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error });
    }
});
  

router.delete("/:id", async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting appointment", error });
    }
});
module.exports = router;