import express from "express";
import { getAllProblems, getProblemDetails, addProblem } from '../controllers/problem.controller.js';
import {isAdmin} from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/problems', getAllProblems);
router.get('/problems/:id', getProblemDetails);

// Admin route
router.post('/addProblem', isAdmin, addProblem);

export default router;
