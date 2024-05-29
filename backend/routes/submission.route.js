import express from "express";
import { getAllSubmission,  submitSolution, runCode} from "../controllers/submission.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/submissions", verifyToken, getAllSubmission);
router.post("/submit", verifyToken, submitSolution);

router.post("/run", verifyToken, runCode);

export default router;
