import express from "express";
import { getAllSubmissions, getSubmissionsByProblemId, verdictCounts, getSubmissionsByUserId} from "../controllers/submission.controller.js";

const router = express.Router();

router.get("/submissions", getAllSubmissions);
router.post("/getSubmissionsByProblemId", getSubmissionsByProblemId);
router.post("/getSubmissionsByUserId", getSubmissionsByUserId);
router.get("/verdictCounts", verdictCounts);
 
export default router;
