import express from "express";
import { getProblems, getProblemDetails, createProblem } from '../controllers/problem.controller.js';
import {isAdmin} from '../middlewares/isAdmin.js';

const router = express.Router();

router.get('/problems', getProblems);
router.get('/problems/:id', getProblemDetails);

// Admin route
router.post('/problems',isAdmin, createProblem);

export default router;
