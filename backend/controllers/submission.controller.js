import Submission from "../models/submission.model.js";
import createError from "../utils/createError.js";
import { generateFile } from "../generateFile.js";
import { executeCpp } from "../executeCpp.js";

export const getAllSubmission = async (req, res, next) => {
    try{
        const submissions = await Submission.find();
        if (!submissions || submissions.length === 0) {
            throw createError(404, "No problems found");
        }
        res.status(200).json(submissions);
    }
    catch(error){
        next(error);
    }
}

export const submitSolution = async (req, res, next) => {
    try{

    }
    catch(error){
        next(error);
    }
}
 
export const runCode = async (req, res, next) => {
    const { code, language='cpp' } = req.body;
    if(code === undefined || code === '') {
        res.status(400).json({ message: "Code is required" });
    };

    try{
        const filePath= generateFile(code, language);
        const output = await executeCpp( filePath );
        res.status(200).json({ filePath, output });
    }
    catch(error){
        next(error);
    }
}