import Problem from "../models/problem.model.js";
import createError from "../utils/createError.js";
import TestCases from "../models/testcases.model.js";
import Submission from "../models/submission.model.js";

export const getAllProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find();
    if (!problems || problems.length === 0) {
        return next(createError(404, "No problems found")); 
    }
    res.status(200).json(problems);
  } catch (error) {
    next(createError(500, 'Internal Server Error'));
  }
}

export const getProblemDetails = async (req, res, next) => {
  try {
    const problem = await Problem.findOne({ problemId: req.params.id });
    if (!problem) {
        return next(createError(404, "Problem not found")); 
    }
    res.status(200).send(problem);
  } catch (error) {
    next(createError(500, 'Internal Server Error'));
  }
}

export const getProblemById = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
        return next(createError(404, "Problem not found")); 
    }
    res.status(200).json(problem);
  } catch (error) {
    next(createError(500, 'Internal Server Error'));
  }
}

export const addProblem = async (req, res, next) => {
  try {
    const {problemTitle, difficulty, problemStatement, sampleInput, sampleOutput, timeLimit, solution} = req.body;
    if(!problemTitle || !difficulty || !problemStatement || !sampleInput || !sampleOutput || !timeLimit || !solution){
      return next(createError(400, "All fields are required"));
    }
    const newProblem = new Problem(req.body);
    await newProblem.save();
    res.status(201).send(newProblem._id);
  } catch (error) {
    next(createError(500, error.message));
  }
}

export const deleteProblem = async (req, res, next) => {
try{
  const {id}=req.params;
  const currentProblem = await Problem.findOne({problemId:id});
  await Problem.findOneAndDelete({problemId:id});
  const probId = currentProblem._id;
  await TestCases.deleteMany({problemId:probId});
  await Submission.deleteMany({problemId:probId});
  res.status(200).send("Problem deleted successfully");
}catch(error){
  next(createError(500, 'Internal Server Error'));
}
} 

export const updateProblem = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the problemId from request parameters
    const updatedData = req.body; // New data to update
    const { problemTitle, difficulty, problemStatement, sampleInput, sampleOutput, timeLimit, solution } = updatedData;
    if (!problemTitle || !difficulty || !problemStatement || !sampleInput || !sampleOutput || !timeLimit || !solution) {
      return next(createError(400, "All fields are required"));
    }

    const updatedProblem = await Problem.findOneAndUpdate(
      { problemId: id }, // Find by problemId
      updatedData, // New data to update
      { new: true } // Return the updated document
    );
    
    if (!updatedProblem) {
      return next(createError(404, "Problem not found")); 
    }
    res.status(200).send(id);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const addTestCases = async (req, res, next) => {
  try {
      const { id } = req.params; // Extract problemId from URL parameters
      const testCasesData = req.body; // Test cases data from request body

      // Loop through test cases data and associate them with the corresponding problemId
      const testCases = testCasesData.map(testCase => ({ ...testCase, problemId: id }));

      // Insert test cases into the database
      await TestCases.insertMany(testCases);
      res.status(201).send("Test cases have been added successfully");
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const getTestCases = async (req, res, next) => {
    try {
      const { id } = req.params;
      const testCases = await TestCases.find({ problemId: id });
      res.status(200).json(testCases);
    } catch (error) {
      next(createError(500, 'Internal Server Error'));
    }
};

export const updateTestCase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { input, output } = req.body;
    if (!input || !output) {
      return next(createError(400, 'All fields are required'));
    }
    const updatedTestCase = await TestCases.findOneAndUpdate(
      { _id: id },
      { input, output },
      { new: true }
    );

    if (!updatedTestCase) {
      return next(createError(404, 'Test case not found'));
    }

    res.status(200).json(updatedTestCase);
  } catch (error) {
    next(createError(500, error.message));
  }
};
 
export const addTestCase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { input, output } = req.body;
    if (!input || !output) {
      return next(createError(400, 'All fields are required'));
    }
    const newTestCase = new TestCases({ input, output, problemId: id });
    await newTestCase.save();

    res.status(201).json(newTestCase);
  } catch (error) {
    next(createError(500, error.message));
  }
};
 
export const deleteTestCase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testCase = await TestCases.findOneAndDelete({ _id: id });
    if (!testCase) {
      return next(createError(404, "Test case not found")); 
    }
    res.status(200).send("Test case deleted successfully");
  } catch (error) {
    next(createError(500, 'Internal Server Error'));
  }
};
  
export const deleteTestCasesOfProblem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await TestCases.deleteMany({ problemId: id });
    res.status(200).send("Test cases deleted successfully");
  } catch (error) {
    next(createError(500, 'Internal Server Error'));
  }
};

