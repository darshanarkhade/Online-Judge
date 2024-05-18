import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URI =process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
