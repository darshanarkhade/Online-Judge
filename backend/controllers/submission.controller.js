import Submission from "../models/submission.model.js";
import createError from "../utils/createError.js";

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