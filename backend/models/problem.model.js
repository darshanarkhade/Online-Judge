import mongoose from "mongoose";
import { Schema } from "mongoose";

const problemSchema = new Schema({
  problemId: {
    type: Number,
    required: [true, "Please enter the problem ID"],
    unique: true,
  },
  problemTitle: {
    type: String,
    required: [true, "Please enter the problem title"],
  },
  problemStatement: {
    type: String,
    required: [true, "Please enter the problem statement"],
  },
  difficulty: {
    type: String,
    required: [true, "Please enter the difficulty level"],
    enum: {
      values: ['Easy', 'Medium', 'Hard'],
      message: 'Difficulty should be either Easy, Medium, or Hard',
    },
  },

//   if time permits, add tags to the problem schema
//   tags: {
//     type: [String],
//     required: [true, "Please enter the tags"],
//   },

});

export default mongoose.model("Problem", problemSchema);