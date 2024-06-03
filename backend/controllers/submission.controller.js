import Submission from "../models/submission.model.js";
import createError from "../utils/createError.js";
import { generateFile } from "../generateFile.js";
import { executeCpp } from "../executeCpp.js";
import { executeJava } from "../executeJava.js";
import { executePython } from "../executePython.js";
import { generateInputFile } from "../generateInputFile.js";
 
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
    const { code , input,  language='cpp' } = req.body;
    if(code === undefined || code === '') {
        res.status(400).json({ message: "Code is required" });
    };
    
    if (
        language !== "cpp" &&
        language !== "py" &&
        language !== "java"
    ){
        return res.status(400).json({ error: "Unsupported code language" });
    }

    try{
        const filePath = generateFile(code, language);
        const inputFilePath = generateInputFile(input); 
        if(language === 'cpp'){
            // console.log('cpp');
            const output = await executeCpp( filePath , inputFilePath );
            res.status(200).json({ filePath, output });

        }else if(language === 'java'){
            // console.log('java');
            const output = await executeJava( filePath, inputFilePath );
            res.status(200).json({ filePath, output });

        }else if(language === 'py'){
            // console.log('py');
            const output = await executePython( filePath , inputFilePath );
            res.status(200).json({ filePath, output });
        }
    }
    catch(error){ 
        next(error);
    }
}