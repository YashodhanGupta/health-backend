const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/doctors", require("./routes/doctorRoutes")); // Added doctor routes
app.use("/api/appointments", require("./routes/appointmentRoutes")); // Added appointment routes

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Healthcare Booking API!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));