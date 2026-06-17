import express from "express";
import {googleAuth, logoutUser} from "../controllers/authController.js";
import { authLimiter } from "../middleware/ratelimiter.js";
const router=express.Router();

router.post("/google", authLimiter, googleAuth);
router.get("/logout", logoutUser);

export default router;