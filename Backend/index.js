const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3004;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://goryde.netlify.app/",
  credentials: true,
}));

// Routes
const authRoutes = require("./routes/authRoutes");
const userroutes = require("./routes/userRoutes");
const rideRoutes = require('./routes/rideRoutes');

app.use("/api/auth", authRoutes);
app.use("/api/user", userroutes);
app.use("/api/ride", rideRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Create HTTP server and attach socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("driverLocation", ({ rideId, coords }) => {
    // Send location to all users tracking this ride
    io.emit(`rideLocation:${rideId}`, coords)
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
  });
