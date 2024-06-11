import mongoose from "mongoose";
import { Schema } from "mongoose";
import shortid from "shortid";

const submissionSchema = new Schema({
  submissionId: {
    type: String,
    default: shortid.generate,
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
        "Compilation Error",
      ],
      message:
        "Status should be either Accepted, Wrong Answer, Time Limit Exceeded or Compilation Error",
    },
  },
  language: {
    type: String,
    required: [true, "Please enter the submission language"],
    enum: {
      values: ["cpp", "java", "py"],
      message: "Language should be either C, C++, Java, or Python",
    },
  },
  submissionTime: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Submission", submissionSchema);
