const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  email: { type: String, required: true },
  availability: { type: [String], required: true }, // Added availability
  status: { type: String, default: "pending" } 
});
const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
// const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
