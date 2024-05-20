import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter your username."],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email address."],
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address."],
  },
  password: {
    type: String,
    required: [true, "Please enter your password."],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  fullName: {
    type: String,
    required: [true, "Please enter your full name."],
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
