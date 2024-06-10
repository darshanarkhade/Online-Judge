import Submission from "../models/submission.model.js";
import User from "../models/user.model.js";
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
        if (code === undefined || code.trim() === '') {
            return next(createError(400, "Code is required"));
        }
        const supportedLanguages = ["cpp", "py", "java"];
        if (!supportedLanguages.includes(language)) {
            return next(createError(400, "Unsupported code language"));
        }

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

        const currUser= await User.findById(req.username);

        // console.log('verdict', verdict);
        if(verdict === 'Accepted'){
            const isAlreadySubmitted = await Submission.findOne({ problemId: problemId, userId: req.username });
            if(!isAlreadySubmitted){ 
                currUser.noOfProblemSolved = currUser.noOfProblemSolved + 1;
                await currUser.save();
            }
        }

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
        next(createError(500, error.message));
    }
}


 
export const runCode = async (req, res, next) => {
    const { code, input, language = 'cpp', timeLimit } = req.body;
    if (code === undefined || code.trim() === '') {
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
                next(createError(400, "Unsupported code language" ));
        }
    } catch (error) { 
        next(createError(500, error.message));
    }
}
 
export const getAllSubmissions = async (req, res, next) => {
    try {
      const submissions = await Submission.find().sort({ submissionTime: -1 });
      res.status(200).json(submissions);
    } catch (error) {
      next(createError(500, 'Internal Server Error'));
    }
};
  
export const getSubmissionsByProblemId = async (req, res, next) => {
    try {
      const { problemId } = req.body;
      if (!problemId) {
        return next(createError(400, "Problem ID is required"));
      }
      const submissions = await Submission.find({ problemId }).sort({ submissionTime: -1 }).limit(10);
      res.status(200).json(submissions);
    } catch (error) {
      next(createError(500, 'Internal Server Error'));
    }
};
  
export const getSubmissionsByUserId = async (req, res, next) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return next(createError(400, "User ID is required"));
      }
      const submissions = await Submission.find({ userId }).sort({ submissionTime: -1 }).limit(10);
      res.status(200).json(submissions);
    } catch (error) {
      next(createError(500, 'Internal Server Error'));
    }
};
  
export const verdictCounts = async (req, res, next) => {
    try {
      const verdicts = await Submission.aggregate([
        {
          $group: {
            _id: '$verdict',
            count: { $sum: 1 }
          }
        }
      ]);
  
      const result = verdicts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {});
  
      res.status(200).json(result);
    } catch (error) {
      next(createError(500, 'Internal Server Error'));
    }
};