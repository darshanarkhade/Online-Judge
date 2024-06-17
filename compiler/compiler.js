import express from 'express';
import dotenv from 'dotenv'; 
import cors from 'cors';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { verifyToken } from "./middleware/jwt.js";
import { submitSolution, runCode } from "./controller/compileCode.controller.js";

const app = express();

dotenv.config();
const CLIENT_URL = process.env.CLIENT_URL;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true })); 
app.use(cookieParser()); // Parse cookies

 
const PORT= process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
    res.send("Hello from compiler!");
});

app.post("/submit",verifyToken, submitSolution);
app.post("/run", runCode);


// Error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500; 
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({ message: errorMessage });
  });

// Connect to MongoDB
const connect = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("Connected to mongoDB!");
    } catch (error) {
      console.log(error);
    }
  };
  

// Start server
app.listen(PORT, () => {
    connect();
    console.log(`Server is running on port ${PORT}`);
  });
  