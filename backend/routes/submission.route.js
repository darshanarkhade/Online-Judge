import express from "express";
import { getUserSubmission,  submitSolution} from "../controllers/submission.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/submissions/:problemId", verifyToken, getUserSubmission);
router.post("/submit", verifyToken, submitSolution);

export default router;
