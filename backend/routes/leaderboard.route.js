import express from "express";
import { getLeaderboard } from "../controllers/leaderboard.controller.js";

const router = express.Router();

/**
 * GET /api/leaderboard
 * Fetch the leaderboard
 */

router.get("/leaderboard", getLeaderboard);

export default router;
