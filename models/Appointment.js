const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    time: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    age: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
