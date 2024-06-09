import Submission from "../models/submission.model.js";
import createError from "../utils/createError.js";
import { generateFile } from "../codeExecuter/generateFile.js";
import { executeCpp } from "../codeExecuter/executeCpp.js";
import { executeJava } from "../codeExecuter/executeJava.js";
import { executePython } from "../codeExecuter/executePython.js";
import { generateInputFile } from "../codeExecuter/generateInputFile.js";
import TestCases from "../models/testcases.model.js";

export const submitSolution = async (req, res, next) => {
    try {
        const { code, language = 'cpp', problemId, timeLimit } = req.body; // Assuming timeLimit is passed in req.body
        if (code === undefined || code === '') {
            return res.status(400).json({ message: "Code is required" });
        };
        if (
            language !== "cpp" &&
            language !== "py" &&
            language !== "java"
        ) {
            return res.status(400).json({ error: "Unsupported code language" });
        }
        console.log('problemId', problemId);

        const filePath = generateFile(code, language);
        let verdict = "Accepted";
        const testCases = await TestCases.find({ problemId: problemId });
        let index = 0;
        for (const testCase of testCases) {
            const inputFilePath = generateInputFile(testCase.input);
            let output = '';
            index++;
            try {
                if (language === 'cpp') {
                    output = await executeCpp(filePath, inputFilePath, timeLimit); // Pass time limit to executeCpp
                } else if (language === 'java') {
                    output = await executeJava(filePath, inputFilePath, timeLimit); // Pass time limit to executeJava
                } else if (language === 'py') {
                    output = await executePython(filePath, inputFilePath, timeLimit); // Pass time limit to executePython
                }
            } catch (error) {
                if (error.message === 'Time Limit Exceeded') {
                    verdict = 'Time Limit Exceeded';
                    break; 

                } else {
                    verdict = 'Compilation Error';
                    break; 
                }
            }
            if (output !== testCase.output) {
                verdict = "Wrong Answer";
                break;
            }
        }
        // console.log('verdict', verdict);

        const newSubmission = new Submission({
            problemId: problemId,
            userId: req.username,
            submissionCode: code,
            verdict: verdict,
            language: language,
            submissionTime: Date.now(),
        });
        await newSubmission.save();
        res.status(200).json({verdict, index});
    } catch (error) {
        next(error);
    }
}


 
export const runCode = async (req, res, next) => {
    const { code, input, language = 'cpp', timeLimit } = req.body;
    if (code === undefined || code === '') {
        return res.status(400).json({ message: "Code is required" });
    }
    
    if (
        language !== "cpp" &&
        language !== "py" &&
        language !== "java"
    ){
        return res.status(400).json({ error: "Unsupported code language" });
    }

    try {
        const filePath = generateFile(code, language);
        const inputFilePath = generateInputFile(input); 
        let output;

        switch (language) {
            case 'cpp':
                try {
                    output = await executeCpp(filePath, inputFilePath, timeLimit);
                    res.status(200).json({ filePath, output });
                } catch (error) {
                    if (error.message === 'Time Limit Exceeded') {
                        output = 'Time Limit Exceeded';                        
                    } else {
                        output = error.message;
                    }
                    res.json({ filePath, output});
                }
                break;
            case 'java':
                try {
                    output = await executeJava(filePath, inputFilePath, timeLimit);
                    res.status(200).json({ filePath, output });
                } catch (error) {
                    if (error.message === 'Time Limit Exceeded') {
                        output = 'Time Limit Exceeded';                        
                    } else {
                        output = error.message;
                    }
                    res.json({ filePath, output});
                }
                break;
            case 'py':
                try {
                    output = await executePython(filePath, inputFilePath, timeLimit);
                    res.status(200).json({ filePath, output });
                } catch (error) {
                    if (error.message === 'Time Limit Exceeded') {
                        output = 'Time Limit Exceeded';                        
                    } else {
                        output = error.message;
                    }
                    res.json({ filePath, output});
                }
                break;
            default:
                res.status(400).json({ error: "Unsupported code language" });
        }
    } catch (error) { 
        next(error);
    }
}
 
export const getAllSubmission = async (req, res, next) => {
    try{
        const submissions = await Submission.find().sort({ submissionTime: -1 });
        if (!submissions || submissions.length === 0) {
            throw createError(404, "No problems found");
        }
        res.status(200).json(submissions);
    }
    catch(error){
        next(error);
    }
}

export const getSubmissionsByProblemId = async (req, res, next) => {
    try {
      const { problemId } = req.body;
      if (!problemId) {
        throw createError(400, "Problem ID is required");
      }
      const submissions = await Submission.find({ problemId: problemId }).sort({ submissionTime: -1 }).limit(10);
      if (!submissions || submissions.length === 0) {
        throw createError(404, "No submissions found");
      }
      res.status(200).json(submissions);
    } catch (error) {
      next(error);
    }
  };
  

export const getSubmissionByUserId = async (req, res, next) => {
    try{
        const { userId } = req.body;
        const submissions = await Submission.find({ userId: userId }).sort({ submissionTime: -1 });
        if (!submissions || submissions.length === 0) {
            throw createError(404, "No submissions found");
        }
        res.status(200).json(submissions);
    }
    catch(error){
        next(error);
    }
}

