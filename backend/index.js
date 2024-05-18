import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import authRoute from "./routes/auth.route.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Constants
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  } 
};

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});  

// Routes
app.use("/api/auth", authRoute);

// Start server
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
