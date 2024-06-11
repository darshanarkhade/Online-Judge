import mongoose from "mongoose";
import { Schema } from "mongoose";
import shortid from "shortid";

const problemSchema = new Schema({
  problemId: {
    type: String,
    default: shortid.generate,
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
      values: ['easy', 'medium', 'hard'],
      message: 'Difficulty should be either Easy, Medium, or Hard',
    },
  },
  sampleInput: {
    type: String,
    required: [true, "Please enter the input"],
  },
  sampleOutput: {
    type: String,
    required: [true, "Please enter the output"],
  },
  timeLimit: {
    type: Number,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  

//   if time permits, add tags to the problem schema
//   tags: {
//     type: [String],
//     required: [true, "Please enter the tags"],
//   },

});

export default mongoose.model("Problem", problemSchema);