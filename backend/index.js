import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import authRoute from "./routes/auth.route.js";
 
dotenv.config();
const app = express();

const PORT = process.env.PORT;
const MONGO_URI =process.env.MONGO_URI;

app.use(express.json());
app.use(cookieParser());

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  } 
};

app.use("/api/auth", authRoute);



app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
