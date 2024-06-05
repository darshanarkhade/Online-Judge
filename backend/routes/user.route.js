import express from 'express';
import {getProfile, getUserById } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.get('/profile',verifyToken, getProfile);

router.get('/users/:id', getUserById);

export default router;