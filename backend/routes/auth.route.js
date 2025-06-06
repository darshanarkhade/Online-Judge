import express from "express";
import { register,logout, login, isAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
// router.get('/isAuth', isAuth);

export default router;
