import express from "express";
import { getAllProblems, getProblemDetails, createProblem } from '../controllers/problem.controller.js';
import {isAdmin} from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/problems', getAllProblems);
router.get('/problems/:id', getProblemDetails);

// Admin route
router.post('/problems', isAdmin, createProblem);

export default router;
