import Problem from "../models/problem.model.js";
import createError from "../utils/createError.js";

export const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        if (!problems || problems.length === 0) {
            throw createError(404, "No problems found");
        }
        res.status(200).json(problems);
    } catch (error) {
        console.log(error);
    }
}

export const getProblemDetails = async (req, res) => {
    try {
        const problem = await Problem.findOne({ problemId: req.params.id });
        if (!problem) {
            throw createError(404, "Problem not found");
        }
        res.status(200).send(problem);
    } catch (error) {
        console.log(error);
    }
}

export const createProblem = async (req, res) => {
    try {
        // console.log(req.body);
        const newProblem = new Problem(req.body);
        await newProblem.save();
        res.status(201).send("Problem has been created");
    } catch (error) {
        console.log(error);
    }
}

