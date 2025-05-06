const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3004;

const app = express();
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: "http://localhost:3004", // Change this to match your frontend's URL if needed
  credentials: true
}));

// Routes
const authRoutes = require("./routes/authRoutes");

// Mount routes
app.use("/api/auth", authRoutes);

// Global Error Handler (keep at the end)
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Connected Successfully at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
  });
