import express from "express";
import { getAllSubmissions,  submitSolution, runCode, getSubmissionsByProblemId,verdictCounts, getSubmissionsByUserId} from "../controllers/submission.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/submissions", getAllSubmissions);
router.post("/submit", verifyToken, submitSolution);
router.post("/getSubmissionsByProblemId", getSubmissionsByProblemId);
router.post("/getSubmissionsByUserId", getSubmissionsByUserId);
router.get("/verdictCounts", verdictCounts);
 
router.post("/run", runCode);

export default router;
