const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  email: { type: String, required: true },
  availability: { type: [String], required: true }, // Added availability
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
