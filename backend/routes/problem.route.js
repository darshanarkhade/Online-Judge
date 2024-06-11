import express from "express";
import { getAllProblems, getProblemDetails,getProblemById, addProblem ,addTestCases,deleteProblem,deleteTestCase, updateProblem, getTestCases, updateTestCase, addTestCase, deleteTestCasesOfProblem } from '../controllers/problem.controller.js';
import {isAdmin} from '../middleware/isAdmin.js';

const router = express.Router();

router.get('/problems', getAllProblems);
router.get('/problems/:id', getProblemDetails);
router.get('/eachProblem/:id', getProblemById);
 
// Admin route
router.post('/addProblem', isAdmin, addProblem);
router.post('/addTestCases/:id', isAdmin, addTestCases);
router.put('/updateProblem/:id', isAdmin, updateProblem);
router.delete('/deleteProblem/:id', isAdmin, deleteProblem);
// router.put('/updateTestCases/:id', isAdmin, updateTestCases);
router.get('/testCases/:id', isAdmin, getTestCases);
router.put('/updateTestCase/:id', isAdmin, updateTestCase);
router.post('/addTestCase/:id', isAdmin, addTestCase);
router.delete('/deleteTestCase/:id', isAdmin, deleteTestCase);
//to delete all testcases of a problem
router.delete('/deleteTestCasesOfProblem/:id', isAdmin, deleteTestCasesOfProblem);
// router.delete('/deleteProblem/:id', isAdmin, deleteProblem);
export default router;
