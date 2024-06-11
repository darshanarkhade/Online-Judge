import Submission from "../models/submission.model.js";
import createError from "../utils/createError.js";

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