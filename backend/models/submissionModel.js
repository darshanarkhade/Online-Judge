import mongoose from "mongoose";
import { Schema } from "mongoose";

const submissionSchema = new Schema({
  submissionId: {
    type: Number,
    required: [true, "Please enter the submission ID"],
    unique: true,
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: [true, "Please enter the corresponding problem ID"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter the corresponding user ID"],
  },
  submissionCode: {
    type: String,
    required: [true, "Please enter the submission code"],
  },
  verdict: {
    type: String,
    required: [true, "Please enter the submission status"],
    enum: {
      values: [
        "Accepted",
        "Wrong Answer",
        "Time Limit Exceeded",
        "Runtime Error",
        "Compilation Error",
      ],
      message:
        "Status should be either Accepted, Wrong Answer, Time Limit Exceeded, Runtime Error, or Compilation Error",
    },
  },
  language: {
    type: String,
    required: [true, "Please enter the submission language"],
    enum: {
      values: ["C", "C++", "Java", "Python"],
      message: "Language should be either C, C++, Java, or Python",
    },
  },
  submissionTime: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Submission", submissionSchema);
