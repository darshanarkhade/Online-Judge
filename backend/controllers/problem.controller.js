import Problem from "../models/problem.model.js";
import createError from "../utils/createError.js";
import TestCases from "../models/testcases.model.js";

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

export const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            throw createError(404, "Problem not found");
        }
        res.status(200).json(problem);
    } catch (error) {
        console.log(error);
    }
}

export const addProblem = async (req, res) => {
    try {
        // console.log("in addProblem");
        // console.log(req.body);
        const newProblem = new Problem(req.body);
        await newProblem.save();
        // console.log(newProblem.problemId);
        res.status(201).send(newProblem._id);
    } catch (error) {
        console.log(error);
    }
}

export const deleteProblem = async (req, res) => {
  //do not use findByIdAndDelete as it does not trigger the pre remove middleware
  //instead use findOneAndDelete
  try{
    const {id}=req.params;
    const problem = await Problem.findOneAndDelete({problemId:id});
    if(!problem){
      throw createError(404,"Problem not found");
    }
    res.status(200).send("Problem deleted successfully");
  }catch(error){
    console.log(error);
  }
} 

export const updateProblem = async (req, res) => {
    try {
      const { id } = req.params; // Get the problemId from request parameters
      const updatedData = req.body; // New data to update
  
    //   console.log(updatedData);

      // Find the document by problemId and update it
      const updatedProblem = await Problem.findOneAndUpdate(
        { problemId: id }, // Find by problemId
        updatedData, // New data to update
        { new: true } // Return the updated document
      );
      
        // console.log(updatedProblem);
      // Check if the problem was found and updated successfully
      if (!updatedProblem) {
        return res.status(404).send("Problem not found");
      }
  
      // Send a success response
      res.status(200).send(id);
    } catch (error) {
      // Handle errors
      console.log(error);
    }
};

export const addTestCases = async (req, res) => {
  try {
      const { id } = req.params; // Extract problemId from URL parameters
      // console.log(id);
      const testCasesData = req.body; // Test cases data from request body
      // console.log(testCasesData);
      // Loop through test cases data and associate them with the corresponding problemId
      const testCases = testCasesData.map(testCase => ({ ...testCase, problemId: id }));

      // Insert test cases into the database
      await TestCases.insertMany(testCases);
      // console.log("Test cases have been added successfully");
      res.status(201).send("Test cases have been added successfully");
  } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
  }
};


export const getTestCases = async (req, res) => {
    try {
      const { id } = req.params;
      const testCases = await TestCases.find({ problemId: id});
    //   console.log(testCases);
      res.status(200).json(testCases);
    } catch (err) {
      console.error('Error fetching test cases:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// export const updateTestCases = async (req, res) => {
//   const { id } = req.params;
//   const { testCases } = req.body;

//   try {
//     // Remove existing test cases for the problem
//     await TestCases.deleteMany({ problemId : id});

//     // Insert the updated test cases
//     const updatedTestCases = await TestCases.insertMany(testCases.map(testCase => ({ ...testCase, problemId: id})));

//     res.status(200).json(updatedTestCases);
//   } catch (err) {
//     console.error('Error updating test cases:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

export const updateTestCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { input, output } = req.body;
  
    const updatedTestCase = await TestCases.findOneAndUpdate(
      { _id: id },
      { input, output },
      { new: true }
    );

    if (!updatedTestCase) {
      return res.status(404).json({ message: 'Test case not found' });
    }

    res.status(200).json(updatedTestCase);
  } catch (err) {
    console.error('Error updating test case:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
 
export const addTestCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { input, output } = req.body;
  
    const newTestCase = new TestCases({ input, output, problemId: id });
    await newTestCase.save();

    res.status(201).json(newTestCase);
  } catch (err) {
    console.error('Error adding test case:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
 
export const deleteTestCase = async (req, res) => {
  try{
    const {id}=req.params;
    const testCase = await TestCases.findOneAndDelete({_id:id});
    if(!testCase){
      throw createError(404,"Test case not found");
    }
    res.status(200).send("Test case deleted successfully");
  }catch(error){
    console.log(error);
  }
}
  
export const deleteTestCasesOfProblem = async (req, res) => {
  try {
    const { id } = req.params;
    await TestCases.deleteMany({ problemId: id });
    res.status(200).send("Test cases deleted successfully");
  } catch (err) {
    console.error('Error deleting test cases:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
