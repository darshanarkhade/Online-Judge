import mongoose from "mongoose";
import {Schema} from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter your name"],
    unique: true,
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  fullName: {
    type: String,
    required: [true, "Please enter your full name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  noOfProblemSolved: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("User", userSchema);