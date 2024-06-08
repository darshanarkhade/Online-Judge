import express from "express";
import { getAllSubmission,  submitSolution, runCode, getSubmissionsByProblemId, getSubmissionByUserId} from "../controllers/submission.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/submissions", getAllSubmission);
router.post("/submit", verifyToken, submitSolution);
router.post("/getSubmissionsByProblemId", getSubmissionsByProblemId)
router.get("/getSubmissionsByUserId", getSubmissionByUserId)

 
router.post("/run", runCode);

export default router;
