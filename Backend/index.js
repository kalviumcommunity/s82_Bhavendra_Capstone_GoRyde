const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3004;

const app = express();
app.use(express.json());


const cookieParser = require("cookie-parser");
app.use(cookieParser());



// CORS configuration
app.use(cors({
  origin: "http://localhost:5173", // Change this to match your frontend's URL if needed
  credentials: true
}));

// Routes
const authRoutes = require("./routes/authRoutes");
const userroutes = require("./routes/userRoutes")
// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/user",userroutes)

// Global Error Handler (keep at the end)
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Connected Successfully at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
  });
