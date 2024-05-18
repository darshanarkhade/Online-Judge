import mongoose from "mongoose";
import { Schema } from "mongoose";

const testCasesSchema = new Schema({
    testCaseId: {
        type: Number,
        required: [true, "Please enter the test case ID"],
        unique: true,
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: [true, "Please enter the corresponding problem ID"],
    },
    input: {
        type: String,
        required: [true, "Please enter the input"],
    },
    output: {
        type: String,
        required: [true, "Please enter the output"],
    },
});

export default mongoose.model("TestCases", testCasesSchema);