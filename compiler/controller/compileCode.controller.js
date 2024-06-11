// controllers/solutionController.js
import createError from "../utils/createError.js";
import { generateFile } from "../codeExecuter/generateFile.js";
import { executeCpp } from "../codeExecuter/executeCpp.js";
import { executeJava } from "../codeExecuter/executeJava.js";
import { executePython } from "../codeExecuter/executePython.js";
import { generateInputFile } from "../codeExecuter/generateInputFile.js";
import TestCases from "../models/testCases.model.js";
import Submission from "../models/submission.model.js";
import User from "../models/user.model.js";

export const submitSolution = async (req, res, next) => {
    try {
        const { code, language = 'cpp', problemId, timeLimit, userId } = req.body; 
        if (!code || code.trim() === '') {
            return next(createError(400, "Code is required"));
        }
        const supportedLanguages = ["cpp", "py", "java"];
        if (!supportedLanguages.includes(language)) {
            return next(createError(400, "Unsupported code language"));
        }

        const filePath = generateFile(code, language);
        let verdict = "Accepted";
        const testCases = await TestCases.find({ problemId: problemId });
        let index=0;
        for (const testCase of testCases) {
            const inputFilePath = generateInputFile(testCase.input);
            let output;
            index++;
            try {
                if (language === 'cpp') {
                    output = await executeCpp(filePath, inputFilePath, timeLimit);
                } else if (language === 'java') {
                    output = await executeJava(filePath, inputFilePath, timeLimit);
                } else if (language === 'py') {
                    output = await executePython(filePath, inputFilePath, timeLimit);
                }
            } catch (error) {
                if (error.message === 'Time Limit Exceeded') {
                    verdict = 'Time Limit Exceeded';
                } else {
                    verdict = 'Compilation Error';
                }
                break;
            }
            output = output.replace(/\r\n/g, '\n');
            testCase.output = testCase.output.replace(/\r\n/g, '\n');

            if (output !== testCase.output) {
                verdict = "Wrong Answer";
                break;
            }
        }

        const currUser = await User.findById(userId);

        if (verdict === 'Accepted') {
            const isAlreadySubmitted = await Submission.findOne({ problemId: problemId, userId: req.username });
            if (!isAlreadySubmitted) { 
                currUser.noOfProblemSolved = currUser.noOfProblemSolved + 1;
                await currUser.save();
            }
        }
        const newSubmission = new Submission({
            problemId: problemId,
            userId: currUser._id,
            submissionCode: code,
            verdict: verdict,
            language: language,
            submissionTime: Date.now(),
        });
        await newSubmission.save();
        res.status(200).json({ verdict , index});
    } catch (error) {
        next(createError(500, error.message));
    }
};

export const runCode = async (req, res, next) => {
    const { code, input, language = 'cpp', timeLimit } = req.body;
    if (!code || code.trim() === '') {
        return next(createError(400, "Code is required"));
    }
    const supportedLanguages = ["cpp", "py", "java"];
    if (!supportedLanguages.includes(language)) {
        return next(createError(400, "Unsupported code language"));
    }

    try {
        const filePath = generateFile(code, language);
        const inputFilePath = generateInputFile(input);
        let output;

        try {
            if (language === 'cpp') {
                output = await executeCpp(filePath, inputFilePath, timeLimit);
            } else if (language === 'java') {
                output = await executeJava(filePath, inputFilePath, timeLimit);
            } else if (language === 'py') {
                output = await executePython(filePath, inputFilePath, timeLimit);
            }
            res.status(200).json({ filePath, output });
        } catch (error) {
            if (error.message === 'Time Limit Exceeded') {
                output = 'Time Limit Exceeded';
            } else {
                output = error.message;
            }
            res.json({ filePath, output });
        }
    } catch (error) {
        next(createError(500, error.message));
    }
};
